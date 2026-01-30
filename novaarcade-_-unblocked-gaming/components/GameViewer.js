
import React from 'react';

const GameViewer = ({ game, onBack }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col">
      {/* Header bar for game controls */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium hidden sm:inline">Back to Hub</span>
          </button>
          <div className="h-6 w-[1px] bg-slate-700 hidden sm:block"></div>
          <h1 className="text-xl font-bold text-white">{game.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
            title="Refresh Game"
            onClick={() => window.location.reload()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
            title="Full Screen"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe?.requestFullscreen) iframe.requestFullscreen();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* The actual Game Iframe */}
      <div className="flex-1 w-full bg-black relative">
        <iframe 
          src={game.iframeUrl}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={game.title}
        ></iframe>
      </div>

      {/* Footer bar with game info */}
      <div className="bg-slate-900 border-t border-slate-800 p-3 flex items-center justify-center text-xs text-slate-500 font-medium">
        Playing {game.title} • {game.category} • NovaArcade Engine v1.0
      </div>
    </div>
  );
};

export default GameViewer;
