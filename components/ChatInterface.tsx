
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Role } from '../types.ts';
import { streamGeminiResponse } from '../services/geminiService.ts';
import ChatBubble from './ChatBubble.tsx';
import { SendIcon } from './icons.tsx';

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
      console.error(error);
      setMessages(prev => 
        prev.map(m => m.id === modelMsgId ? { ...m, text: "Sorry, I encountered an error. Please check your API key." } : m)
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Scrollable Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-6 pb-24 scroll-smooth"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && messages[messages.length-1].text === "" && (
          <div className="flex justify-start mb-4">
             <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
               <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent">
        <div className="max-w-md mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="w-full bg-slate-800 border border-slate-700 text-white pl-5 pr-14 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-xl placeholder-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              input.trim() && !isTyping 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
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
