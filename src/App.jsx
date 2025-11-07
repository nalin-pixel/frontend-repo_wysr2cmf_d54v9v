import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSpline from './components/HeroSpline';
import TabBarMobile from './components/TabBarMobile';
import ThemeHeader from './components/ThemeHeader';
import { Film, Gamepad2, Folder, Play, Info, Copy, Download, LogIn, UserPlus, Moon, Sun } from 'lucide-react';

// Mock datasets (frontend seed) — replace with API later
const mockMovies = [
  { id: 1, title: 'Inception', year: 2010, poster: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg', desc: 'A mind-bending heist into dreams.' },
  { id: 2, title: 'Interstellar', year: 2014, poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', desc: 'Across space and time to save humanity.' },
  { id: 3, title: 'The Dark Knight', year: 2008, poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', desc: 'Gotham faces chaos from the Joker.' },
  { id: 4, title: 'Blade Runner 2049', year: 2017, poster: 'https://image.tmdb.org/t/p/w500/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg', desc: 'A new blade runner uncovers a secret.' },
  { id: 5, title: 'Dune', year: 2021, poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', desc: 'A mythic hero’s journey on Arrakis.' },
  { id: 6, title: 'Arrival', year: 2016, poster: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcMpC8.jpg', desc: 'Linguistics meets aliens and time.' },
  { id: 7, title: 'Whiplash', year: 2014, poster: 'https://image.tmdb.org/t/p/w500/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg', desc: 'Obsessive pursuit of greatness.' },
  { id: 8, title: 'Her', year: 2013, poster: 'https://image.tmdb.org/t/p/w500/eCO2L3g8F4uy2CtaQ3Gq4V2QYBo.jpg', desc: 'A tender sci‑fi romance with AI.' },
  { id: 9, title: 'The Social Network', year: 2010, poster: 'https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg', desc: 'The birth of a social empire.' },
  { id: 10, title: 'Mad Max: Fury Road', year: 2015, poster: 'https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg', desc: 'High‑octane chase through the wasteland.' },
];

const mockGames = [
  { id: 1, title: 'The Legend of Zelda: TOTK', platform: 'Switch', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6n9e.jpg', notes: 'Explore the skies of Hyrule.' },
  { id: 2, title: 'Elden Ring', platform: 'PC', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg', notes: 'Open world Soulsborne adventure.' },
  { id: 3, title: 'Hades', platform: 'PC', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v4v.jpg', notes: 'Fast rogue‑like with great story.' },
  { id: 4, title: 'Forza Horizon 5', platform: 'Xbox', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p4j.jpg', notes: 'Vibrant racing in Mexico.' },
  { id: 5, title: 'Ghost of Tsushima', platform: 'PS5', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mjs.jpg', notes: 'Samurai tale with stunning vistas.' },
  { id: 6, title: 'Stardew Valley', platform: 'PC', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r1r.jpg', notes: 'Relaxing farming sim classic.' },
];

const mockFiles = [
  { id: 1, name: 'Resume_FlamesBlue.pdf', size: '245 KB', modified: '2025-05-12', type: 'pdf' },
  { id: 2, name: 'Vacation_2024.jpg', size: '1.8 MB', modified: '2025-04-02', type: 'jpg' },
  { id: 3, name: 'ProjectAssets.zip', size: '82 MB', modified: '2025-03-28', type: 'zip' },
  { id: 4, name: 'Notes.md', size: '12 KB', modified: '2025-02-11', type: 'md' },
];

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);
  return [dark, setDark];
}

function AuthViews({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    // Client-side mock auth. Replace with backend calls:
    // POST {API_BASE_URL}/login or /register
    const token = 'mock-token';
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    onAuthenticated({ username });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-rose-50 dark:from-gray-950 dark:to-black px-4">
      <div className="w-full max-w-sm bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-rose-600 text-white font-bold">FB</span>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">FlamesBlue</h1>
            <p className="text-xs text-gray-600 dark:text-gray-300">Projek Pribadi</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-md text-sm ${mode==='login'?'bg-gray-900 text-white dark:bg-white dark:text-black':'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`flex-1 py-2 rounded-md text-sm ${mode==='register'?'bg-gray-900 text-white dark:bg-white dark:text-black':'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200'}`}>Register</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3" aria-label={mode==='login'?'Login form':'Register form'}>
          <label className="block">
            <span className="text-sm text-gray-700 dark:text-gray-200">Username</span>
            <input value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" placeholder="yourname" required />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700 dark:text-gray-200">Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" placeholder="••••••••" required />
          </label>
          {error && <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">{error}</p>}
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-orange-500 to-rose-600 text-white py-2.5 text-sm font-medium">
            {mode==='login'? <><LogIn size={16}/> Login</> : <><UserPlus size={16}/> Create account</>}
          </button>
          <p className="text-[11px] text-gray-600 dark:text-gray-400">
            This is a frontend-only demo. Connect backend at /register and /login later.
          </p>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ username }) {
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
      <div className="rounded-xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-white/5">
        <h3 className="font-semibold mb-2">Welcome</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">Hello {username || 'friend'} — here’s a quick look at your world.</p>
      </div>
      <div className="rounded-xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-white/5">
        <h3 className="font-semibold mb-2">Recent Movies</h3>
        <ul className="text-sm list-disc pl-5 text-gray-700 dark:text-gray-200">
          {mockMovies.slice(0,3).map(m => <li key={m.id}>{m.title} ({m.year})</li>)}
        </ul>
      </div>
      <div className="rounded-xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-white/5">
        <h3 className="font-semibold mb-2">Recent Games</h3>
        <ul className="text-sm list-disc pl-5 text-gray-700 dark:text-gray-200">
          {mockGames.slice(0,3).map(g => <li key={g.id}>{g.title} – {g.platform}</li>)}
        </ul>
      </div>
      <div className="rounded-xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-white/5 md:col-span-3">
        <h3 className="font-semibold mb-2">Recent Files</h3>
        <div className="overflow-x-auto">
          <table className="min-w-[520px] w-full text-sm">
            <thead className="text-left text-gray-600 dark:text-gray-300">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Size</th>
                <th className="py-2">Modified</th>
              </tr>
            </thead>
            <tbody>
              {mockFiles.slice(0,4).map(f => (
                <tr key={f.id} className="border-t border-black/5 dark:border-white/10">
                  <td className="py-2">{f.name}</td>
                  <td className="py-2">{f.size}</td>
                  <td className="py-2">{f.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Movies() {
  const [activeId, setActiveId] = useState(null);
  const active = useMemo(() => mockMovies.find(m => m.id === activeId), [activeId]);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {mockMovies.map(movie => (
          <article key={movie.id} className="group rounded-xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <div className="aspect-[2/3] relative overflow-hidden">
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                srcSet={`${movie.poster} 1x`}
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-1">{movie.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{movie.year} • {movie.desc}</p>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={()=>setActiveId(movie.id)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-900 text-white dark:bg-white dark:text-black text-xs"><Play size={14}/> Watch</button>
                <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white text-xs"><Info size={14}/> Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActiveId(null)} />
          <div className="relative w-full sm:max-w-md m-3 rounded-2xl bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 p-4">
            <div className="flex items-center gap-3">
              <img src={active.poster} alt="poster" className="h-16 w-12 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{active.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{active.year}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">{active.desc}</p>
            <a
              href="#"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-orange-500 to-rose-600 text-white py-2 text-sm"
            >
              <Play size={16}/> Play on Jellyfin
            </a>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Configure JELLYFIN_URL later to deep link to your server.</p>
            <button onClick={()=>setActiveId(null)} className="mt-3 w-full text-sm underline text-gray-600 dark:text-gray-300">Close</button>
          </div>
        </div>
      )}
    </>
  );
}

function Gaming() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('gameNotes')||'{}'));
  const [text, setText] = useState('');
  const saveNote = (id) => {
    const next = { ...notes, [id]: text || notes[id] || '' };
    localStorage.setItem('gameNotes', JSON.stringify(next));
    setNotes(next);
    setText('');
  };
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {mockGames.map(g => (
        <article key={g.id} className="rounded-xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
          <div className="flex gap-3 p-3">
            <img src={g.cover} alt="cover" className="h-20 w-16 object-cover rounded" />
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{g.title}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400">{g.platform}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{g.notes}</p>
            </div>
          </div>
          <div className="px-3 pb-3">
            <div className="flex gap-2">
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add quick note" className="flex-1 rounded-md border border-black/5 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" />
              <button onClick={()=>saveNote(g.id)} className="px-3 rounded-md bg-gray-900 text-white dark:bg-white dark:text-black text-xs">Save</button>
            </div>
            {notes[g.id] && <p className="mt-2 text-xs text-gray-700 dark:text-gray-200">Saved: {notes[g.id]}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

function Files() {
  const [detail, setDetail] = useState(null);
  const copyLink = (name) => {
    navigator.clipboard.writeText(`${window.location.origin}/files/${encodeURIComponent(name)}`);
    alert('Link copied');
  };
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5">
        <table className="min-w-[640px] w-full text-sm">
          <thead className="text-left text-gray-600 dark:text-gray-300">
            <tr>
              <th className="py-2 pl-4">Name</th>
              <th className="py-2">Size</th>
              <th className="py-2">Modified</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockFiles.map(f => (
              <tr key={f.id} className="border-t border-black/5 dark:border-white/10 hover:bg-gray-50/80 dark:hover:bg-white/5">
                <td className="py-2 pl-4">
                  <button className="text-left hover:underline" onClick={()=>setDetail(f)}>{f.name}</button>
                </td>
                <td className="py-2">{f.size}</td>
                <td className="py-2">{f.modified}</td>
                <td className="py-2 pr-4">
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"><Download size={14}/> Download</button>
                    <button onClick={()=>copyLink(f.name)} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"><Copy size={14}/> Copy Link</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetail(null)} />
          <div className="relative w-full sm:max-w-md m-3 rounded-2xl bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 p-4">
            <h3 className="font-semibold">{detail.name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">Size: {detail.size}</p>
            <p className="text-sm text-gray-700 dark:text-gray-200">Modified: {detail.modified}</p>
            <div className="mt-3 flex gap-2">
              <button className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-gray-900 text-white dark:bg-white dark:text-black text-sm"><Download size={16}/> Download</button>
              <button onClick={()=>{copyLink(detail.name); setDetail(null);}} className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-sm"><Copy size={16}/> Copy Link</button>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-300">
              TrueNAS config placeholders:
              <div className="mt-1 font-mono">TRUENAS_SMB_PATH, TRUENAS_WEBDAV_URL</div>
            </div>
            <button onClick={()=>setDetail(null)} className="mt-3 w-full text-sm underline text-gray-600 dark:text-gray-300">Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [dark, setDark] = useDarkMode();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return token && username ? { username } : null;
  });
  const [tab, setTab] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) setTab('dashboard');
  }, [user]);

  if (!user) {
    return <AuthViews onAuthenticated={setUser} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-gray-900 dark:text-white pb-16 md:pb-0">
      <Navbar
        user={user}
        currentTab={tab}
        onTabChange={(k)=>{setTab(k); setMenuOpen(false);}}
        onMenuToggle={()=>setMenuOpen(v=>!v)}
        onLogout={() => { localStorage.removeItem('token'); localStorage.removeItem('username'); setUser(null); }}
      />

      <HeroSpline overlay={<ThemeHeader tab={tab} />} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-1 text-xs">
            <span>Theme:</span>
            <span className="font-medium capitalize">{tab}</span>
          </div>
          <button
            onClick={() => setDark(d => !d)}
            className="inline-flex items-center gap-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 px-3 py-2 text-sm"
            aria-label="Toggle dark mode"
          >
            {dark ? <Moon size={16}/> : <Sun size={16}/>} {dark ? 'Dark' : 'Light'}
          </button>
        </div>

        {tab === 'dashboard' && <Dashboard username={user?.username} />}
        {tab === 'movies' && <Movies />}
        {tab === 'gaming' && <Gaming />}
        {tab === 'files' && <Files />}
        {tab === 'about' && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2>About / Settings</h2>
            <p>FlamesBlue personal web app demo. Mobile-first with category themes, Spline hero, and simple auth.</p>
            <h3>Backend integration</h3>
            <ul>
              <li>Auth endpoints: POST /register, POST /login, GET /user/profile</li>
              <li>Jellyfin: set JELLYFIN_URL to open Play links</li>
              <li>TrueNAS: configure SMB/WebDAV using placeholders in Files</li>
            </ul>
            <h3>API base URL</h3>
            <p>Use VITE_BACKEND_URL to point to a backend when available.</p>
          </div>
        )}
      </main>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal>
          <div className="absolute inset-0 bg-black/50" onClick={()=>setMenuOpen(false)} />
          <div className="absolute right-3 top-16 w-56 rounded-xl bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 p-2">
            {['dashboard','movies','gaming','files','about'].map(k => (
              <button key={k} onClick={()=>{setTab(k); setMenuOpen(false);}} className={`w-full text-left px-3 py-2 rounded-md text-sm capitalize ${tab===k?'bg-gray-100 dark:bg-white/10':''}`}>{k}</button>
            ))}
            <button onClick={()=>{ localStorage.removeItem('token'); localStorage.removeItem('username'); setUser(null); }} className="w-full mt-2 px-3 py-2 rounded-md text-sm bg-gray-900 text-white dark:bg-white dark:text-black">Logout</button>
          </div>
        </div>
      )}

      <TabBarMobile currentTab={tab} onTabChange={setTab} />
    </div>
  );
}
