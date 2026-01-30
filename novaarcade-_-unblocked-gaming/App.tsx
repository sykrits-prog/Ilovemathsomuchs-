
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import Sidebar from './components/Sidebar.tsx';
import GameCard from './components/GameCard.tsx';
import GameViewer from './components/GameViewer.tsx';
import { GAMES_DATA } from './data/games.ts';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

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
            <div className="flex flex-col lg:flex-row gap-8">
              <Sidebar 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />

              <div className="flex-1">
                {/* Mobile Categories */}
                <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar">
                  {['All', 'Action', 'Puzzle', 'Arcade', 'Strategy', 'Sports'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-white">
                    {selectedCategory === 'All' ? 'Discover Games' : `${selectedCategory} Collection`}
                  </h2>
                </div>

                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map(game => (
                      <GameCard 
                        key={game.id} 
                        game={game} 
                        onClick={setActiveGame} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 bg-slate-900/20 rounded-[2.5rem] border border-dashed border-slate-800">
                    <p className="text-slate-400 text-lg font-bold">No games found</p>
                    <button 
                      onClick={handleLogoClick}
                      className="mt-4 text-indigo-400 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>

          <footer className="mt-auto border-t border-white/5 bg-slate-900/30 py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                   <i className="fas fa-bolt text-white"></i>
                </div>
                <span className="font-black text-white text-lg tracking-tight">NovaArcade</span>
              </div>
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} NovaArcade. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
