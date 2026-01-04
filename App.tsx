
import React from 'react';
import Header from './components/Header';
import LinkCard from './components/LinkCard';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  return (
    <main className="flex flex-col min-h-full pb-20">
      <Header />
      
      <div className="flex flex-col w-full">
        {SOCIAL_LINKS.map((link, index) => (
          <LinkCard key={link.id} link={link} index={index} />
        ))}
      </div>

      <div className="mt-8 mb-4 px-8 py-6 glass-card rounded-2xl text-center border-t border-white/5 shadow-inner">
        <p className="text-sm text-zinc-300 font-medium leading-relaxed italic">
          "النجاح لا يأتي لمن ينتظره، بل لمن يسعى إليه بإصرار لا يلين ورؤية واضحة للمستقبل."
        </p>
        <div className="mt-2 text-[10px] text-zinc-500 font-semibold tracking-widest uppercase">
          طريق التميز
        </div>
      </div>

      <Footer />
      <ChatBot />
    </main>
  );
};

export default App;
