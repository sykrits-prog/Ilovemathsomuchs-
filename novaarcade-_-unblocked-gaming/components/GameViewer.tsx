
import React from 'react';

const GameViewer = ({ game, onBack }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-slate-950 border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all border border-white/5 shadow-xl active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-black text-xs uppercase tracking-widest hidden sm:inline">Exit Hub</span>
          </button>
          <div className="h-8 w-[1px] bg-white/5 hidden sm:block"></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white leading-none uppercase tracking-widest">{game.title}</h1>
            <div className="flex items-center gap-2 mt-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{game.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all border border-white/5"
            title="Reload Game"
            onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) iframe.src = iframe.src;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
            title="Toggle Fullscreen"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe?.requestFullscreen) iframe.requestFullscreen();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 w-full bg-[#000] relative overflow-hidden">
        <iframe 
          src={game.iframeUrl}
          className="w-full h-full border-0 shadow-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={game.title}
        ></iframe>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="bg-slate-950 px-6 py-2.5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Active Session
            </div>
          </div>
          <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
              NovaArcade Pro-Play Environment v2.4
          </div>
      </div>
    </div>
  );
};

export default GameViewer;
