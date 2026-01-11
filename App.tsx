
import React from 'react';
import Header from './components/Header';
import LinkCard from './components/LinkCard';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  return (
    <main className="flex flex-col min-h-full pb-20">
      <CustomCursor />
      <Header />
      
      <div className="flex flex-col w-full">
        {SOCIAL_LINKS.map((link, index) => (
          <LinkCard key={link.id} link={link} index={index} />
        ))}
      </div>

      <div className="mt-8 mb-4 px-8 py-6 glass-card rounded-2xl text-center border border-amber-500/10 shadow-lg">
        <p className="text-sm text-zinc-300 font-medium leading-relaxed italic">
          "في EK Original، لا نبيع هواتف فحسب، بل نبني جسوراً من الثقة والتطور لعملائنا في كل مكان."
        </p>
        <div className="mt-3 text-[10px] text-amber-500 font-bold tracking-widest uppercase bg-amber-500/5 py-1 px-3 rounded-full inline-block">
          EK Original • الجودة أولاً
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default App;
