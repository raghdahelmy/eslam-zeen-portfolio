
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
      <p>&copy; {year} Eslam Zeen. جميع الحقوق محفوظة</p>
    </footer>
  );
};

export default Footer;
