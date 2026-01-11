
import React from 'react';
import { PROFILE } from '../constants';
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="relative mb-8 group">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl scale-150 group-hover:scale-175 transition-transform duration-700"></div>
        
        {/* Animated Ring */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-200 rounded-full opacity-40 group-hover:opacity-100 blur-[2px] animate-pulse"></div>

        {/* Profile Image Container */}
        <div className="relative w-32 h-32 rounded-full p-1 bg-zinc-900 shadow-2xl">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900">
            <img 
              src={PROFILE.avatar} 
              alt={PROFILE.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
          {PROFILE.name}
        </h1>
        <div className="inline-flex flex-col items-center gap-2">
          <div className="px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 text-xs font-bold tracking-wider">
              {PROFILE.handle}
            </span>
          </div>
          
          <a 
            href="https://wa.me/201090305065"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.3)] text-sm"
          >
            <MessageCircle size={18} />
            <span>تواصل عبر واتساب</span>
          </a>
        </div>
      </div>
      
      <div className="mt-8 mb-6 flex items-center justify-center gap-3">
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
      </div>
      
      <p className="text-zinc-400 text-sm max-w-[320px] mx-auto leading-relaxed font-medium">
        {PROFILE.bio}
      </p>
    </header>
  );
};

export default Header;