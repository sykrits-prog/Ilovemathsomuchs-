
import React from 'react';

const Navbar = ({ searchQuery, setSearchQuery, onLogoClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-slate-600 bg-clip-text text-transparent hidden sm:block">
            NovaArcade
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
            <svg className="h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-white/5 rounded-[1.25rem] bg-slate-900/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-900 focus:border-indigo-500/50 sm:text-sm transition-all shadow-inner"
            placeholder="Search for a game title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Store</button>
          <button className="bg-white text-slate-950 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-200 active:scale-95">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
