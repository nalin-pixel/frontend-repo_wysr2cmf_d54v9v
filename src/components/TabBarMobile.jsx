import React from 'react';
import { Home, Film, Gamepad2, Folder, Settings } from 'lucide-react';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'movies', label: 'Movies', icon: Film },
  { key: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { key: 'files', label: 'Files', icon: Folder },
  { key: 'about', label: 'About', icon: Settings },
];

export default function TabBarMobile({ currentTab, onTabChange }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-black/5 dark:border-white/10 bg-white/90 dark:bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl grid grid-cols-5">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`flex flex-col items-center justify-center py-2 text-[11px] ${
              currentTab === key ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'
            }`}
            aria-label={label}
          >
            <Icon size={18} />
            <span className="mt-0.5">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
