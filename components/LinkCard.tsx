import React from 'react';
import { SocialLink } from '../types';
import { ChevronLeft } from 'lucide-react';

interface LinkCardProps {
  link: SocialLink;
  index: number;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, index }) => {
  return (
    <a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card flex items-center justify-between p-4 mb-4 rounded-2xl w-full group animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          {link.icon}
        </div>
        <div className="text-right">
          <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
            {link.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {link.description}
          </p>
        </div>
      </div>
      <div className="text-zinc-700 group-hover:text-amber-500 transition-all duration-300 transform group-hover:-translate-x-1">
        <ChevronLeft className="w-5 h-5" />
      </div>
    </a>
  );
};

export default LinkCard;