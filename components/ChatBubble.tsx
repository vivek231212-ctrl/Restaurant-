
import React from 'react';
import { Message, Role } from '../types.ts';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-5 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div
        className={`max-w-[85%] px-4 py-3.5 rounded-[22px] shadow-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-[#1A1F2E] text-slate-100 rounded-tl-none border border-white/5'
        }`}
      >
        <p className="text-[15px] leading-[1.5] whitespace-pre-wrap font-medium">
          {message.text}
        </p>
        <div
          className={`text-[10px] mt-2 opacity-40 font-bold ${
            isUser ? 'text-white' : 'text-slate-400'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
