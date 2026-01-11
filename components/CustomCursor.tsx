
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    let requestRef: number;
    const animateTrail = () => {
      setTrail(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      requestRef = requestAnimationFrame(animateTrail);
    };
    requestRef = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(requestRef);
  }, [position]);

  return (
    <>
      {/* Main Dot */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block shadow-[0_0_10px_rgba(245,158,11,0.8)]"
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})` 
        }}
      />
      {/* Outer Ring */}
      <div 
        className="fixed top-0 left-0 w-10 h-10 border border-amber-500/40 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out hidden md:block"
        style={{ 
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          backgroundColor: isHovering ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
          opacity: isClicking ? 0.3 : 1
        }}
      />
      {/* Background Spotlight - Dark Version */}
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0 transition-opacity duration-1000 hidden md:block"
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;