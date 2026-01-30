
import React from 'react';
import { CATEGORIES } from '../types.js';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-20">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Categories</h2>
        <nav className="space-y-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <h3 className="text-sm font-semibold text-white mb-2">Want more?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            New games are added every week. Stay tuned for the latest updates.
          </p>
          <button className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
            Request Game
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
