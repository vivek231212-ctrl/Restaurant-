
import React from 'react';
import { ArrowRightIcon, MessageIcon } from './icons.tsx';

interface HomeTabProps {
  onStartChat: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onStartChat }) => {
  const suggestions = [
    "Summarize this long article",
    "Explain quantum physics like I'm five",
    "Write a witty birthday text",
    "Help me plan a workout"
  ];

  return (
    <div className="h-full bg-slate-900 flex flex-col px-6 py-10 overflow-y-auto pb-24">
      <div className="mb-10 mt-4">
        <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
          AI Assistant v2.0
        </div>
        <h1 className="text-4xl font-extrabold text-white leading-tight">
          What will we <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            create today?
          </span>
        </h1>
      </div>

      <div className="space-y-6 flex-1">
        <section>
          <h2 className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-widest">Quick Start</h2>
          <div 
            onClick={onStartChat}
            className="group relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-2xl shadow-blue-900/40 cursor-pointer active:scale-95 transition-all overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-bold mb-1">New Chat</h3>
                <p className="text-blue-100 text-sm opacity-80">Start a fresh conversation</p>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <ArrowRightIcon className="text-white" />
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
          </div>
        </section>

        <section>
          <h2 className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-widest">Suggestions</h2>
          <div className="grid grid-cols-1 gap-3">
            {suggestions.map((text, i) => (
              <button 
                key={i}
                onClick={onStartChat}
                className="flex items-center space-x-4 bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl hover:bg-slate-800 transition-colors active:scale-[0.98] text-left"
              >
                <div className="bg-slate-700 p-2 rounded-lg">
                  <MessageIcon className="w-4 h-4 text-slate-300" />
                </div>
                <span className="text-slate-300 text-sm font-medium">{text}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 text-center px-4">
        <p className="text-slate-500 text-xs">Powered by Google Gemini 3 Flash. Built for high-performance mobile experiences.</p>
      </div>
    </div>
  );
};

export default HomeTab;
