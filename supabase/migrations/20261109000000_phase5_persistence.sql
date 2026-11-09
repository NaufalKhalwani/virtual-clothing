-- ====================================================================
-- Phase 5: Virtual Clothing Designer - Persistence Migration
-- PostgreSQL Database Schema, Storage Buckets, and RLS Policies
-- ====================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Profiles Table (Extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to automatically create a profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Untitled Design',
  garment_type text not null check (garment_type in ('tshirt', 'jersey')),
  thumbnail_url text,
  design_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_projects_updated_at on public.projects(updated_at desc);
create index if not exists idx_projects_garment_type on public.projects(garment_type);

-- Trigger for auto-updating updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute procedure public.handle_updated_at();

-- 4. Row Level Security (RLS) for Projects Table
alter table public.projects enable row level security;

-- Policy: Select (Users can only read their own projects)
create policy "Users can read own projects"
  on public.projects for select
  using (auth.uid() = user_id);

-- Policy: Insert (Users can only create projects assigned to themselves)
create policy "Users can create own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

-- Policy: Update (Users can only update their own projects)
create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

-- Policy: Delete (Users can only delete their own projects)
create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- 5. Storage Buckets Setup (project-artwork and project-thumbnails)
insert into storage.buckets (id, name, public)
values ('project-artwork', 'project-artwork', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('project-thumbnails', 'project-thumbnails', true)
on conflict (id) do nothing;

-- Storage RLS Policies for project-artwork
create policy "Authenticated users can upload artwork"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-artwork' and (auth.uid())::text = (storage.foldername(name))[1]);

create policy "Users can update own artwork"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-artwork' and (auth.uid())::text = (storage.foldername(name))[1]);

create policy "Users can delete own artwork"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-artwork' and (auth.uid())::text = (storage.foldername(name))[1]);

create policy "Artwork objects are publicly readable"
  on storage.objects for select
  using (bucket_id = 'project-artwork');

-- Storage RLS Policies for project-thumbnails
create policy "Authenticated users can upload thumbnails"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-thumbnails' and (auth.uid())::text = (storage.foldername(name))[1]);

create policy "Users can update own thumbnails"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-thumbnails' and (auth.uid())::text = (storage.foldername(name))[1]);

create policy "Users can delete own thumbnails"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-thumbnails' and (auth.uid())::text = (storage.foldername(name))[1]);

create policy "Thumbnails are publicly readable"
  on storage.objects for select
  using (bucket_id = 'project-thumbnails');
