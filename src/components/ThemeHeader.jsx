import React from 'react';
import { Film, Gamepad2, Folder, Home } from 'lucide-react';

const themeMap = {
  dashboard: {
    title: 'Welcome to FlamesBlue',
    subtitle: 'Your personal hub — fast, modern, and mobile-first',
    colors: 'from-orange-500/30 to-rose-600/30',
    Icon: Home,
  },
  movies: {
    title: 'Movies',
    subtitle: 'Cinematic picks with elegant vibes',
    colors: 'from-gray-900/70 to-black/40',
    Icon: Film,
  },
  gaming: {
    title: 'Gaming',
    subtitle: 'Playful energy with neon accents',
    colors: 'from-blue-900/60 to-indigo-700/40',
    Icon: Gamepad2,
  },
  files: {
    title: 'Files',
    subtitle: 'Clean and professional file manager',
    colors: 'from-slate-900/70 to-slate-700/40',
    Icon: Folder,
  },
};

export default function ThemeHeader({ tab }) {
  const { title, subtitle, colors, Icon } = themeMap[tab] || themeMap.dashboard;
  return (
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${colors}`} aria-hidden="true">
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 mx-auto max-w-6xl px-4 text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
          <Icon size={16} />
          <span className="text-xs font-medium">{title}</span>
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold drop-shadow">{subtitle}</h1>
      </div>
    </div>
  );
}
