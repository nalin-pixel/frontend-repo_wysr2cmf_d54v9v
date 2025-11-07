import React from 'react';
import { Menu, LogOut, User, Film, Gamepad2, Folder, Home, Settings } from 'lucide-react';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'movies', label: 'Movies', icon: Film },
  { key: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { key: 'files', label: 'Files', icon: Folder },
  { key: 'about', label: 'About', icon: Settings },
];

export default function Navbar({ user, onLogout, currentTab, onTabChange, onMenuToggle }) {
  return (
    <header className="w-full sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-100"
          onClick={() => onTabChange('dashboard')}
          aria-label="Go to dashboard"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-rose-600 text-white font-bold">FB</span>
          <span className="hidden sm:inline">Projek Pribadi / FlamesBlue</span>
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                currentTab === key
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden sm:flex items-center gap-2 pr-2 text-sm text-gray-700 dark:text-gray-200">
              <User size={16} />
              <span className="truncate max-w-[120px]" title={user?.username}>{user?.username}</span>
            </div>
          )}
          {user && (
            <button
              onClick={onLogout}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
          <button
            onClick={onMenuToggle}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
