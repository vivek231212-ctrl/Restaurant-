
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Role } from '../types.ts';
import { streamGeminiResponse } from '../services/geminiService.ts';
import ChatBubble from './ChatBubble.tsx';
import { SendIcon, PlusIcon, MicIcon, ChevronLeftIcon } from './icons.tsx';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: "Hello! I'm your Gemini AI assistant. How can I help you today?",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: Message = {
      id: modelMsgId,
      role: Role.MODEL,
      text: '',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, modelMsg]);

    try {
      await streamGeminiResponse([...messages, userMsg], (fullText) => {
        setMessages(prev => 
          prev.map(m => m.id === modelMsgId ? { ...m, text: fullText } : m)
        );
      });
    } catch (error) {
      setMessages(prev => 
        prev.map(m => m.id === modelMsgId ? { ...m, text: "Sorry, I encountered an error. Please check your connection." } : m)
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0F1A]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <div className="p-2 -ml-2 text-slate-400">
            <ChevronLeftIcon />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-[10px] font-black text-white italic">G</span>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold leading-tight">Gemini AI</h4>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] text-slate-400 font-medium">Always active</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
           <span className="text-xs font-bold">...</span>
        </div>
      </header>

      {/* Scrollable Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-20 pb-28 scroll-smooth"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && messages[messages.length-1].text === "" && (
          <div className="flex justify-start mb-4">
             <div className="bg-[#1A1F2E] p-4 rounded-2xl rounded-tl-none border border-white/5">
               <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A] to-transparent z-40 max-w-md mx-auto">
        <div className="bg-[#1A1F2E] border border-white/10 rounded-[32px] p-2 flex items-center shadow-2xl">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors">
            <PlusIcon />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none text-white text-[15px] px-2 py-3 focus:outline-none placeholder-slate-500"
          />
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors">
            <MicIcon />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              input.trim() && !isTyping 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700/50 text-slate-500'
            }`}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
