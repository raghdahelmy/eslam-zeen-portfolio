
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, User, Loader2, Sparkles, Zap, ExternalLink } from 'lucide-react';
import { PROFILE } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: `مرحباً بك في عالم EK Original! ✨\n\nأنا مساعدك الذكي المتطور.\n\nكيف يمكنني مساعدتك بخصوص فروعنا في الإسماعيلية أو أحدث أجهزة الآيفون والأندرويد اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Hide tooltip after 8 seconds if not opened
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, [messages]);

const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage = input.trim();
  setInput('');
  setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
  setIsLoading(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      {
        role: 'bot',
        text: data.text || 'تابعي الأسعار من المتجر: https://www.ek-original.com',
      },
    ]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        role: 'bot',
        text: 'حدث خطأ تقني. يرجى زيارة المتجر: https://www.ek-original.com',
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};


  // Helper function to render text with clickable links
  const renderMessageText = (text: string, isBot: boolean) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-all break-all ${isBot ? 'text-white' : 'text-amber-400'}`}
          >
            {part}
            <ExternalLink size={12} className="shrink-0" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip Message */}
      {showTooltip && !isOpen && (
        <div className="mb-3 mr-2 bg-white text-zinc-900 text-[11px] font-bold px-4 py-2 rounded-2xl rounded-br-none shadow-xl animate-bounce border border-amber-500/20">
          كيف يمكنني مساعدتك؟ ✨
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[90vw] h-[550px] max-h-[75vh] glass-card rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-amber-500/30 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                  <Bot size={22} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">روبوت EK الذكي</h3>
                <p className="text-[10px] text-amber-500/80 font-medium">الذكاء الاصطناعي نشط</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all p-2 rounded-xl border border-white/5"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#0a0a0c] scrollbar-hide text-right" dir="rtl">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-400`}>
                <div className={`max-w-[90%] p-4 rounded-3xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800/80 text-zinc-100 rounded-tl-none border border-white/5 shadow-md' 
                    : 'bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-tr-none shadow-[0_8px_25px_-5px_rgba(217,119,6,0.4)]'
                }`}>
                  {renderMessageText(msg.text, msg.role === 'bot')}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-amber-600/10 p-4 rounded-3xl rounded-tr-none border border-amber-500/20 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-duration:0.6s]"></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.1s]"></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 bg-zinc-900/50 backdrop-blur-xl border-t border-white/5 flex gap-3">
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-50 text-white rounded-2xl transition-all active:scale-90 flex items-center justify-center shrink-0"
            >
              <Send size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل عن الفروع أو الأسعار..."
              className="flex-1 bg-zinc-800/40 border border-white/10 rounded-2xl px-5 text-[13px] text-white focus:ring-2 focus:ring-amber-500/30 outline-none text-right transition-all placeholder:text-zinc-600"
              dir="rtl"
            />
          </div>
        </div>
      )}

      {/* Trendy & Chic Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`relative w-18 h-18 group transition-all duration-500 transform ${
          isOpen ? 'rotate-90' : 'hover:scale-110 active:scale-95'
        }`}
      >
        {/* Glow Ring */}
        {!isOpen && (
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
        )}
        
        {/* Rotating border effect */}
        {!isOpen && (
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600 via-orange-400 to-amber-300 rounded-full opacity-40 group-hover:opacity-70 blur-[1px] animate-[spin_4s_linear_infinite]"></div>
        )}

        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 overflow-hidden ${
          isOpen 
            ? 'bg-zinc-900 border-zinc-700 shadow-none' 
            : 'bg-zinc-900 border-amber-500/50 shadow-[0_15px_35px_-5px_rgba(245,158,11,0.5)]'
        }`}>
          {/* Inner content */}
          {isOpen ? (
            <X size={28} className="text-zinc-400" />
          ) : (
            <div className="relative">
              <Bot size={32} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-transform duration-500 group-hover:scale-110" />
              {/* AI Badge */}
              <div className="absolute -top-3 -right-3 bg-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded-md text-zinc-900 uppercase tracking-tighter shadow-sm border border-zinc-900/20">
                AI
              </div>
            </div>
          )}

          {/* Animated glass shine */}
          {!isOpen && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatBot;
