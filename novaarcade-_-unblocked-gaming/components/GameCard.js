
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-md border border-slate-700">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
