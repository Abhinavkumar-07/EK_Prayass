import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    // 1. Text smoothly unblurs into view
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 80);

    // 2. Start curtain slide-up exit
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = '';
    }, 1400);

    // 3. Remove completely from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2250);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
      className="fixed inset-0 z-[9999] bg-[#f8f4ec] flex items-center justify-center select-none pointer-events-auto shadow-2xl"
    >
      <div
        style={{
          opacity: isRevealed ? (isExiting ? 0 : 1) : 0,
          filter: isRevealed ? (isExiting ? 'blur(6px)' : 'blur(0px)') : 'blur(10px)',
          transform: isRevealed
            ? isExiting
              ? 'translateY(-30px) scale(0.97)'
              : 'translateY(0px) scale(1)'
            : 'translateY(14px) scale(0.96)',
          transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="text-center px-4"
      >
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1c1917] font-normal tracking-tight">
          Ek-Prayass
        </h1>
      </div>
    </div>
  );
};

export default Preloader;
