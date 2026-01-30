
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] cursor-pointer flex flex-col h-full"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[2rem]">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[4px]">
          <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl transform translate-y-12 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="absolute top-4 left-4">
           <span className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/5 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-7 pt-4 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
          {game.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1 font-medium">
          {game.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900"></div>
                ))}
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                {Math.floor(Math.random() * 50) + 10}k Playing
            </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
