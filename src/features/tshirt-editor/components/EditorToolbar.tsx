import React from 'react';
import { Palette, Image as ImageIcon, Type, Layers } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';

export const EditorToolbar: React.FC = () => {
  const activeTab = useUIStore((state) => state.activeTab);
  const setActiveTab = useUIStore((state) => state.setActiveTab);

  const tools = [
    { id: 'color' as const, label: 'Color', icon: Palette },
    { id: 'upload' as const, label: 'Artwork', icon: ImageIcon },
    { id: 'text' as const, label: 'Text', icon: Type },
    { id: 'layers' as const, label: 'Layers', icon: Layers },
  ];

  return (
    <aside className="w-16 md:w-20 bg-white dark:bg-slate-900 border-r border-neutral-200/80 dark:border-slate-800 flex flex-col items-center py-4 gap-2 select-none shrink-0 transition-colors duration-200">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTab === tool.id;

        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActiveTab(tool.id)}
            className={`relative flex flex-col items-center justify-center w-12 md:w-14 h-13 md:h-14 rounded-xl transition-all duration-150 ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
            title={tool.label}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">{tool.label}</span>
          </button>
        );
      })}
    </aside>
  );
};
