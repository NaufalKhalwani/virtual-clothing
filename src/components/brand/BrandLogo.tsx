import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'horizontal' | 'symbol';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

const SIZE_MAP = {
  sm: { icon: 28, text: 'text-xs', sub: 'text-[9px]', badge: 'text-[9px] px-1 py-0.2' },
  md: { icon: 36, text: 'text-sm', sub: 'text-[10px]', badge: 'text-[10px] px-1.5 py-0.5' },
  lg: { icon: 44, text: 'text-base', sub: 'text-xs', badge: 'text-[10px] px-2 py-0.5' },
  xl: { icon: 56, text: 'text-xl', sub: 'text-xs', badge: 'text-xs px-2.5 py-1' },
};

/**
 * Geometric Vector 3D Apparel Symbol
 */
export const BrandSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vcd-sym-l" x1="18" y1="22" x2="60" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="vcd-sym-r" x1="102" y1="22" x2="60" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="vcd-sym-col" x1="48" y1="18" x2="72" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="vcd-glow" x="4" y="8" width="112" height="106" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2563EB" floodOpacity={0.3} />
        </filter>
      </defs>

      {/* Outer Squircle Container */}
      <rect width="120" height="120" rx="30" fill="#2563EB" className="dark:fill-slate-800" />
      <rect
        width="120"
        height="120"
        rx="30"
        stroke="#60A5FA"
        strokeOpacity={0.3}
        strokeWidth={2}
        className="dark:stroke-slate-700"
      />

      <g filter="url(#vcd-glow)">
        {/* Left Body & Left Sleeve */}
        <path d="M60,44 L40,54 L40,96 L60,104 L60,44 Z" fill="url(#vcd-sym-l)" />
        <path d="M60,44 L48,22 L18,40 L28,62 L40,54 L60,44 Z" fill="#1D4ED8" />

        {/* Right Body & Right Sleeve */}
        <path d="M60,44 L80,54 L80,96 L60,104 L60,44 Z" fill="url(#vcd-sym-r)" />
        <path d="M60,44 L72,22 L102,40 L92,62 L80,54 L60,44 Z" fill="#3B82F6" />

        {/* V-Neck Collar Ribbon */}
        <polygon points="48,22 60,38 72,22 60,28" fill="url(#vcd-sym-col)" />

        {/* Center Isometric Seam */}
        <line x1="60" y1="44" x2="60" y2="104" stroke="#DBEAFE" strokeWidth={2} strokeLinecap="round" />

        {/* Fine Wireframe Outline */}
        <path
          d="M18,40 L48,22 L60,28 L72,22 L102,40 L92,62 L80,54 L80,96 L60,104 L40,96 L40,54 L28,62 Z"
          stroke="#FFFFFF"
          strokeWidth={1.2}
          strokeLinejoin="round"
          strokeOpacity={0.4}
        />

        {/* Apex Anchor Pin */}
        <circle cx="60" cy="44" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  const cfg = SIZE_MAP[size];

  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center ${className}`} onClick={onClick}>
        <BrandSymbol size={cfg.icon} />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 group select-none ${className}`}
      onClick={onClick}
    >
      <BrandSymbol size={cfg.icon} />

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-tight">
          <span
            className={`font-extrabold tracking-tight text-neutral-900 dark:text-white ${cfg.text}`}
          >
            Virtual Clothing
          </span>
          <span
            className={`font-black rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800 uppercase tracking-wide ${cfg.badge}`}
          >
            3D
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase ${cfg.sub}`}
          >
            3D Apparel Studio
          </span>
        )}
      </div>
    </div>
  );
};
