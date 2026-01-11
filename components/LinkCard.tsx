
import React from 'react';
import { SocialLink } from '../types';
import { ChevronLeft } from 'lucide-react';

interface LinkCardProps {
  link: SocialLink;
  index: number;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, index }) => {
  const isClickable = !!link.url;
  const isLocation = link.id.startsWith('branch');

  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className={`relative p-3 rounded-xl bg-gradient-to-br ${link.color} text-white shadow-lg transition-transform duration-300 ${isClickable ? 'group-hover:scale-110' : ''}`}>
          {isLocation && (
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm animate-pulse"></div>
          )}
          <div className="relative z-10">
            {link.icon}
          </div>
        </div>
        <div className="text-right">
          <h3 className={`text-sm font-bold text-zinc-100 transition-colors ${isClickable ? 'group-hover:text-amber-400' : ''}`}>
            {link.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5 font-medium">
            {link.description}
          </p>
        </div>
      </div>
      {isClickable && (
        <div className="text-zinc-700 group-hover:text-amber-500 transition-all duration-300 transform group-hover:-translate-x-1">
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}
    </>
  );

  const cardClasses = `glass-card flex items-center justify-between p-4 mb-4 rounded-2xl w-full group animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${
    isLocation ? 'border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]' : ''
  }`;

  if (isClickable) {
    return (
      <a 
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        style={{ animationDelay: `${(index + 1) * 100}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <div 
      className={`${cardClasses} opacity-90 cursor-default`}
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      {content}
    </div>
  );
};

export default LinkCard;