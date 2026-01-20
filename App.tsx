
import React, { useState } from 'react';
import { TabType } from './types';
import { HomeIcon, MessageIcon, HistoryIcon, UserIcon } from './components/icons';
import HomeTab from './components/HomeTab';
import ChatInterface from './components/ChatInterface';
import HistoryTab from './components/HistoryTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onStartChat={() => setActiveTab('chat')} />;
      case 'chat':
        return <ChatInterface />;
      case 'history':
        return <HistoryTab />;
      case 'profile':
        return (
          <div className="h-full bg-slate-900 flex flex-col items-center justify-center text-white px-8">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <UserIcon className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Alex Johnson</h2>
            <p className="text-slate-400 mb-8 text-center text-sm">Premium Member since 2024. Your AI interactions are private and encrypted.</p>
            
            <div className="w-full space-y-3">
              <button className="w-full bg-slate-800 p-4 rounded-2xl text-left font-medium hover:bg-slate-700 transition-colors">Account Settings</button>
              <button className="w-full bg-slate-800 p-4 rounded-2xl text-left font-medium hover:bg-slate-700 transition-colors">Usage Stats</button>
              <button className="w-full bg-slate-800 p-4 rounded-2xl text-left font-medium text-red-400 hover:bg-slate-700 transition-colors">Log Out</button>
            </div>
          </div>
        );
      default:
        return <HomeTab onStartChat={() => setActiveTab('chat')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-slate-900 shadow-2xl relative overflow-hidden ring-1 ring-slate-800">
      {/* Content Area */}
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>

      {/* Modern Bottom Navigation */}
      <nav className="h-[72px] bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 flex items-center justify-around px-4 pb-1 safe-bottom fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<HomeIcon />} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')} 
          icon={<MessageIcon />} 
          label="Chat" 
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={<HistoryIcon />} 
          label="Activity" 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<UserIcon />} 
          label="Profile" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 w-16 ${
      active ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-blue-500/10' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold tracking-wide uppercase">{label}</span>
    {active && (
      <div className="w-1 h-1 bg-blue-500 rounded-full absolute -bottom-1"></div>
    )}
  </button>
);

export default App;
