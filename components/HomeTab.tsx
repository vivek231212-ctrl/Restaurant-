
import React from 'react';
import { SparklesIcon, MessageIcon } from './icons.tsx';

interface HomeTabProps {
  onStartChat: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onStartChat }) => {
  const categories = [
    { title: "Creative Writing", icon: "✨", color: "from-purple-500/20 to-indigo-500/20", borderColor: "border-purple-500/30" },
    { title: "Code & Logic", icon: "💻", color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/30" },
    { title: "Image Generation", icon: "🎨", color: "from-rose-500/20 to-orange-500/20", borderColor: "border-rose-500/30" },
    { title: "Personal Tasks", icon: "📅", color: "from-emerald-500/20 to-teal-500/20", borderColor: "border-emerald-500/30" }
  ];

  return (
    <div className="h-full bg-[#0B0F1A] flex flex-col px-6 pt-12 overflow-y-auto pb-28">
      {/* Header Profile */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border border-white/10 flex items-center justify-center text-sm font-bold shadow-lg">
            AJ
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium">Welcome back,</p>
            <h3 className="text-white font-bold">Alex Johnson</h3>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium tracking-tight">System Online</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-white leading-[1.1] mb-2 tracking-tight">
          How can I assist <br/> you today?
        </h1>
        <p className="text-slate-400 text-[15px] font-medium max-w-[80%]">
          Choose a task or type anything to get started with your AI.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <div 
            key={i}
            onClick={onStartChat}
            className={`p-5 rounded-[24px] bg-gradient-to-br ${cat.color} border ${cat.borderColor} flex flex-col justify-between aspect-square active:scale-95 transition-all cursor-pointer`}
          >
            <div className="text-3xl">{cat.icon}</div>
            <div className="text-white font-bold leading-tight text-[15px]">{cat.title}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Mini */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-white font-bold text-sm">Suggested Prompts</h4>
          <button className="text-blue-500 text-xs font-bold uppercase tracking-widest">See All</button>
        </div>
        <div className="space-y-3">
          {["Tell me a joke about robots", "How do I make a perfect latte?"].map((text, i) => (
            <div 
              key={i}
              onClick={onStartChat}
              className="bg-[#1A1F2E]/80 border border-white/5 p-4 rounded-2xl flex items-center space-x-3 active:bg-[#1A1F2E] transition-colors"
            >
              <SparklesIcon className="w-4 h-4 text-blue-500" />
              <span className="text-slate-300 text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
