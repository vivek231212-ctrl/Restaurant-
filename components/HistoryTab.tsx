
import React from 'react';
import { HistoryIcon, MessageIcon } from './icons';

const HistoryTab: React.FC = () => {
  const sessions = [
    { id: '1', title: 'Plan my Japan trip', date: '2 hours ago', snippet: 'Suggested itinerary for 7 days...' },
    { id: '2', title: 'Python code debugging', date: 'Yesterday', snippet: 'The issue with the loop was...' },
    { id: '3', title: 'Creative writing prompt', date: 'Oct 24', snippet: 'Once upon a time in a digital...' },
    { id: '4', title: 'Recipe for pancakes', date: 'Oct 20', snippet: 'Mix 2 cups of flour with...' },
  ];

  return (
    <div className="h-full bg-slate-900 px-6 py-8 overflow-y-auto pb-24">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-600/20 p-2.5 rounded-xl">
          <HistoryIcon className="text-blue-500 w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Activity</h1>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl flex items-start space-x-4 active:scale-[0.98] transition-transform cursor-pointer hover:bg-slate-800"
          >
            <div className="bg-slate-700 p-2.5 rounded-xl">
              <MessageIcon className="text-slate-400 w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-slate-100 font-semibold truncate">{session.title}</h3>
                <span className="text-xs text-slate-500 shrink-0">{session.date}</span>
              </div>
              <p className="text-sm text-slate-400 truncate">{session.snippet}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm italic">Cloud sync is enabled</p>
      </div>
    </div>
  );
};

export default HistoryTab;
