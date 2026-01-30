
import React from 'react';
import { CATEGORIES } from '../types.ts';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 px-4">Categories</h2>
        <nav className="space-y-1.5">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
