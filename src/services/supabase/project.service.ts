import { supabase, isSupabaseConfigured } from './supabase.client';
import type { Project, CreateProjectInput, UpdateProjectInput } from '@/types/project.types';

const LOCAL_PROJECTS_KEY = 'vcd_sandbox_projects';

function getLocalProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalProjects(projects: Project[]): void {
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
}

function isSchemaCacheError(errorMsg?: string | null): boolean {
  if (!errorMsg) return false;
  const lower = errorMsg.toLowerCase();
  return (
    lower.includes('schema cache') ||
    lower.includes('relation "public.projects" does not exist') ||
    lower.includes('relation "projects" does not exist') ||
    lower.includes('could not find the table') ||
    lower.includes('pgrst205')
  );
}

function filterAndSortLocalProjects(
  userId: string,
  options?: {
    search?: string;
    garmentType?: 'all' | 'tshirt' | 'jersey';
    sortBy?: 'latest' | 'oldest' | 'name';
  }
): Project[] {
  let list = getLocalProjects().filter((p) => p.user_id === userId);

  if (options?.search) {
    const query = options.search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(query));
  }

  if (options?.garmentType && options.garmentType !== 'all') {
    list = list.filter((p) => p.garment_type === options.garmentType);
  }

  if (options?.sortBy === 'oldest') {
    list.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
  } else if (options?.sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }

  return list;
}

function saveLocalProject(userId: string, input: CreateProjectInput): Project {
  const now = new Date().toISOString();
  const newProject: Project = {
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: userId,
    name: input.name || 'Untitled Design',
    garment_type: input.garment_type,
    thumbnail_url: input.thumbnail_url || null,
    design_data: input.design_data,
    created_at: now,
    updated_at: now,
  };

  const projects = getLocalProjects();
  projects.unshift(newProject);
  saveLocalProjects(projects);
  return newProject;
}

function updateLocalProject(
  projectId: string,
  input: UpdateProjectInput
): { data: Project | null; error: string | null } {
  const projects = getLocalProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  if (index === -1) {
    return { data: null, error: 'Project not found' };
  }

  const updatedProject: Project = {
    ...projects[index],
    ...input,
    updated_at: new Date().toISOString(),
  };

  projects[index] = updatedProject;
  saveLocalProjects(projects);
  return { data: updatedProject, error: null };
}

function deleteLocalProject(projectId: string): void {
  const projects = getLocalProjects();
  const filtered = projects.filter((p) => p.id !== projectId);
  saveLocalProjects(filtered);
}

export const projectService = {
  /**
   * List all projects for the current user with search, filter, and sorting
   */
  async listProjects(
    userId: string,
    options?: {
      search?: string;
      garmentType?: 'all' | 'tshirt' | 'jersey';
      sortBy?: 'latest' | 'oldest' | 'name';
    }
  ): Promise<{ data: Project[]; error: string | null; isLocalFallback?: boolean }> {
    if (!isSupabaseConfigured) {
      return { data: filterAndSortLocalProjects(userId, options), error: null, isLocalFallback: true };
    }

    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId);

      if (options?.search) {
        query = query.ilike('name', `%${options.search}%`);
      }

      if (options?.garmentType && options.garmentType !== 'all') {
        query = query.eq('garment_type', options.garmentType);
      }

      if (options?.sortBy === 'oldest') {
        query = query.order('updated_at', { ascending: true });
      } else if (options?.sortBy === 'name') {
        query = query.order('name', { ascending: true });
      } else {
        query = query.order('updated_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        if (isSchemaCacheError(error.message)) {
          console.warn('[projectService] Remote table public.projects missing. Using local storage fallback.');
          return { data: filterAndSortLocalProjects(userId, options), error: null, isLocalFallback: true };
        }
        return { data: [], error: error.message };
      }

      // Merge local sandbox projects that are not yet synced to remote
      const local = filterAndSortLocalProjects(userId, options);
      const combined = [...((data as Project[]) || [])];
      for (const lp of local) {
        if (!combined.some((p) => p.id === lp.id)) {
          combined.push(lp);
        }
      }

      return { data: combined, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch projects';
      if (isSchemaCacheError(msg)) {
        return { data: filterAndSortLocalProjects(userId, options), error: null, isLocalFallback: true };
      }
      return { data: [], error: msg };
    }
  },

  /**
   * Get a single project by ID
   */
  async getProject(projectId: string): Promise<{ data: Project | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const found = getLocalProjects().find((p) => p.id === projectId) || null;
      return { data: found, error: found ? null : 'Project not found' };
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        if (isSchemaCacheError(error.message)) {
          const found = getLocalProjects().find((p) => p.id === projectId) || null;
          return { data: found, error: found ? null : 'Project not found' };
        }
        // Check local storage before giving up
        const found = getLocalProjects().find((p) => p.id === projectId);
        if (found) {
          return { data: found, error: null };
        }
        return { data: null, error: error.message };
      }

      return { data: data as Project, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load project';
      if (isSchemaCacheError(msg)) {
        const found = getLocalProjects().find((p) => p.id === projectId) || null;
        return { data: found, error: found ? null : 'Project not found' };
      }
      return { data: null, error: msg };
    }
  },

  /**
   * Create a new project
   */
  async createProject(
    userId: string,
    input: CreateProjectInput
  ): Promise<{ data: Project | null; error: string | null; isLocalFallback?: boolean }> {
    if (!isSupabaseConfigured) {
      const newProject = saveLocalProject(userId, input);
      return { data: newProject, error: null, isLocalFallback: true };
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: userId,
          name: input.name || 'Untitled Design',
          garment_type: input.garment_type,
          thumbnail_url: input.thumbnail_url || null,
          design_data: input.design_data,
        })
        .select()
        .single();

      if (error) {
        if (isSchemaCacheError(error.message)) {
          console.warn('[projectService] Remote table public.projects missing. Saving to local storage.');
          const newProject = saveLocalProject(userId, input);
          return { data: newProject, error: null, isLocalFallback: true };
        }
        return { data: null, error: error.message };
      }

      return { data: data as Project, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create project';
      if (isSchemaCacheError(msg)) {
        const newProject = saveLocalProject(userId, input);
        return { data: newProject, error: null, isLocalFallback: true };
      }
      return { data: null, error: msg };
    }
  },

  /**
   * Update an existing project
   */
  async updateProject(
    projectId: string,
    input: UpdateProjectInput
  ): Promise<{ data: Project | null; error: string | null; isLocalFallback?: boolean }> {
    if (!isSupabaseConfigured) {
      return updateLocalProject(projectId, input);
    }

    try {
      const updates: Record<string, unknown> = {};
      if (input.name !== undefined) updates.name = input.name;
      if (input.thumbnail_url !== undefined) updates.thumbnail_url = input.thumbnail_url;
      if (input.design_data !== undefined) updates.design_data = input.design_data;

      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();

      if (error) {
        if (isSchemaCacheError(error.message)) {
          console.warn('[projectService] Remote table public.projects missing. Updating locally.');
          const localRes = updateLocalProject(projectId, input);
          return { ...localRes, isLocalFallback: true };
        }
        // Also update local if it was a local project
        updateLocalProject(projectId, input);
        return { data: null, error: error.message };
      }

      // Keep local copy in sync if exists
      updateLocalProject(projectId, input);
      return { data: data as Project, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update project';
      if (isSchemaCacheError(msg)) {
        const localRes = updateLocalProject(projectId, input);
        return { ...localRes, isLocalFallback: true };
      }
      return { data: null, error: msg };
    }
  },

  /**
   * Duplicate an existing project
   */
  async duplicateProject(projectId: string, newName?: string): Promise<{ data: Project | null; error: string | null }> {
    const { data: original, error: fetchErr } = await projectService.getProject(projectId);
    if (fetchErr || !original) {
      return { data: null, error: fetchErr || 'Project to duplicate not found' };
    }

    const duplicatedName = newName || `${original.name} (Copy)`;
    return projectService.createProject(original.user_id, {
      name: duplicatedName,
      garment_type: original.garment_type,
      thumbnail_url: original.thumbnail_url,
      design_data: JSON.parse(JSON.stringify(original.design_data)),
    });
  },

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<{ success: boolean; error: string | null }> {
    deleteLocalProject(projectId);

    if (!isSupabaseConfigured) {
      return { success: true, error: null };
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        if (isSchemaCacheError(error.message)) {
          return { success: true, error: null };
        }
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete project';
      if (isSchemaCacheError(msg)) {
        return { success: true, error: null };
      }
      return { success: false, error: msg };
    }
  },
};
