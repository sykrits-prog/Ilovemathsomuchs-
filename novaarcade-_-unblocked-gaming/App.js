
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import GameCard from './components/GameCard.js';
import GameViewer from './components/GameViewer.js';
import { GAMES_DATA } from './data/games.js';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  // Filter logic for games list
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleLogoClick = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Conditionally render the Game Viewer or the Dashboard */}
      {activeGame ? (
        <GameViewer game={activeGame} onBack={() => setActiveGame(null)} />
      ) : (
        <>
          <Navbar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onLogoClick={handleLogoClick}
          />
          
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <Sidebar 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />

              {/* Main Game Grid Area */}
              <div className="flex-1">
                {/* Mobile Category Scroll (Horizontal) */}
                <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-4 no-scrollbar">
                  {['All', 'Action', 'Puzzle', 'Arcade', 'Strategy', 'Sports'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {selectedCategory === 'All' ? 'Popular Games' : `${selectedCategory} Games`}
                    {searchQuery && <span className="text-slate-500 ml-2 text-lg font-normal">for "{searchQuery}"</span>}
                  </h2>
                  <span className="text-sm text-slate-500">{filteredGames.length} games available</span>
                </div>

                {/* The Grid */}
                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filteredGames.map(game => (
                      <GameCard 
                        key={game.id} 
                        game={game} 
                        onClick={setActiveGame} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-700">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-lg">No games found matches your criteria.</p>
                    <button 
                      onClick={handleLogoClick}
                      className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-800 bg-slate-900 py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-slate-200">NovaArcade</span>
              </div>
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} NovaArcade. All rights reserved. 
                <span className="mx-2">|</span>
                <a href="#" className="hover:text-indigo-400">Terms</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:text-indigo-400">Privacy</a>
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
