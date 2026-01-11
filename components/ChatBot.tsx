
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, User, Loader2, Sparkles, Zap, ExternalLink, Phone } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROFILE, SOCIAL_LINKS } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: `مرحباً بك في عالم EK Original! ✨\n\nأنا مساعدك الذكي المتطور الخاص بـ ${PROFILE.name}.\n\nيمكنني إعطاؤك روابط منصاتنا، مواقع فروعنا، أو مساعدتك في اختيار هاتفك القادم. كيف يمكنني خدمتك اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, [messages, isOpen]);

  // Generate a dynamic string of all available links for the AI's context
  const linksContext = SOCIAL_LINKS.map(link => `- ${link.title}: ${link.url || 'لا يوجد رابط مباشر'} (${link.description})`).join('\n');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `أنت "روبوت EK الذكي"، المساعد الافتراضي الأكثر تطوراً لشركة EK Original وإسلام ياسين زين.
          
          مهمتك الأساسية:
          1. تقديم روابط المنصات فوراً إذا طلب المستخدم أي منها. إليك الروابط المتوفرة لديك:
          ${linksContext}
          
          2. إذا سأل عن "الأسعار" أو "شراء هاتف"، وجهه فوراً لمتجرنا الإلكتروني: https://www.ek-original.com
          
          3. معلومات الفروع في الإسماعيلية:
          - فرع شارع إسكندرية (الفرع الرئيسي - وسط البلد).
          - فرع كارفور الإسماعيلية (داخل المول).
          - فرع المرحلة السابعة (حي ثالث).
          - فرع سرابيوم (مركز فايد).
          - المواعيد: 1 ظهراً - 12 ليلاً (الجمعة من 6 مساءً).
          - رقم التواصل الموحد: 01090305065
          
          شخصيتك:
          - ذكي جداً، لبق، وفخور بكيان EK Original.
          - استخدم الرموز التعبيرية (Emojis) بشكل ممتاز.
          - إذا سألك عن رأيك في هاتف، أعطه إجابة تقنية ذكية تشجعه على الشراء من عندنا.
          - عند ذكر رقم التليفون (01090305065)، اكتبه بوضوح ليتمكن النظام من تحويله لرابط تلقائي.
          
          تذكر: أنت لست مجرد بوت، أنت واجهة ذكية لبراند فخم.`,
          temperature: 0.8,
        },
      });

      const botResponse = response.text || "عذراً، يبدو أن هناك ضغطاً على النظام. يمكنك دائماً تصفح متجرنا مباشرة: https://www.ek-original.com";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "حدث خطأ بسيط في الاتصال بالذكاء الاصطناعي. يمكنك التواصل معنا عبر واتساب مباشرة أو زيارة المتجر: https://www.ek-original.com" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageText = (text: string, isBot: boolean) => {
    const combinedRegex = /(https?:\/\/[^\s]+|01[0125]\d{8}|\+201[0125]\d{8})/g;
    const parts = text.split(combinedRegex);
    
    return parts.map((part, i) => {
      if (part.match(/https?:\/\/[^\s]+/)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-all break-all ${isBot ? 'text-amber-200' : 'text-amber-400'}`}
          >
            {part}
            <ExternalLink size={12} className="shrink-0" />
          </a>
        );
      } 
      else if (part.match(/01[0125]\d{8}|\+201[0125]\d{8}/)) {
        return (
          <a 
            key={i} 
            href={`tel:${part}`} 
            className={`inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-all ${isBot ? 'text-amber-200' : 'text-amber-400'}`}
          >
            {part}
            <Phone size={12} className="shrink-0" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {showTooltip && !isOpen && (
        <div className="mb-3 mr-2 bg-white text-zinc-900 text-[11px] font-bold px-4 py-2 rounded-2xl rounded-br-none shadow-2xl animate-bounce border border-amber-500/20">
          هل تبحث عن رابط معين؟ اسألني! ✨
        </div>
      )}

      {isOpen && (
        <div className="mb-4 w-[380px] max-w-[90vw] h-[600px] max-h-[80vh] glass-card rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-amber-500/30 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
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
                <p className="text-[10px] text-amber-500/80 font-medium tracking-widest uppercase">Expert AI System</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all p-2 rounded-xl border border-white/5"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#0a0a0c]/90 scrollbar-hide text-right" dir="rtl">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-400`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5 shadow-md' 
                    : 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white rounded-tr-none border border-amber-500/20 shadow-xl'
                }`}>
                  {renderMessageText(msg.text, msg.role === 'bot')}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-amber-500/10 p-4 rounded-3xl rounded-tr-none border border-amber-500/20">
                  <Loader2 size={18} className="text-amber-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-zinc-900 border-t border-white/5 flex gap-3">
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 hover:brightness-110 disabled:opacity-50 text-white rounded-2xl transition-all active:scale-90 flex items-center justify-center shrink-0 shadow-lg"
            >
              <Send size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اطلب رابط أي منصة أو اسأل عن الأسعار..."
              className="flex-1 bg-zinc-800/50 border border-white/10 rounded-2xl px-5 text-[13px] text-white focus:ring-2 focus:ring-amber-500/30 outline-none text-right transition-all"
              dir="rtl"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`relative w-16 h-16 group transition-all duration-500 transform ${
          isOpen ? 'rotate-90 scale-90' : 'hover:scale-110 active:scale-95'
        }`}
      >
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse opacity-50"></div>
        <div className={`relative w-full h-full rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
          isOpen 
            ? 'bg-zinc-900 border-zinc-700' 
            : 'bg-zinc-900 border-amber-500/50 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.5)]'
        }`}>
          {isOpen ? (
            <X size={24} className="text-zinc-400" />
          ) : (
            <Bot size={30} className="text-amber-500" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatBot;
