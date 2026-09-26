import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/favicon.jpg';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDonateClick = () => {
    if (location.pathname === '/') {
      document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#donate-section');
      setTimeout(() => {
        document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/project' },
    { label: 'Team', path: '/team' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Notice', path: '/notice' },
  ];

  return (
    <>
      {/* Floating Centered Pill Navbar - Luxury Liquid Glassmorphism */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-auto max-w-[calc(100vw-2rem)]">
        <div 
          className={`backdrop-blur-xl backdrop-saturate-150 border border-white/70 ring-1 ring-black/[0.06] rounded-full transition-all duration-300 px-3.5 sm:px-5 lg:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-7 ${
            isScrolled
              ? 'bg-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_12px_32px_-6px_rgba(43,20,8,0.14),0_4px_12px_rgba(0,0,0,0.04)]'
              : 'bg-white/65 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_8px_24px_-4px_rgba(43,20,8,0.08),0_2px_8px_rgba(0,0,0,0.02)]'
          }`}
        >
          
          {/* Logo & Brand Name */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-1 ring-black/10 shadow-sm flex-shrink-0">
              <img src={logo} alt="Ek-Prayass logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#1c1917] tracking-tight whitespace-nowrap">
              Ek-Prayass
            </span>
          </Link>

          {/* Desktop Nav Links with frosted micro-interaction pills */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-xs md:text-[13px] lg:text-sm font-medium text-[#444444] flex-shrink-0">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-[#1c1917] font-semibold bg-black/[0.06] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]'
                      : 'hover:text-[#1c1917] hover:bg-black/[0.04]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Donate Now Button with Circular Arrow */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={handleDonateClick}
              className="group relative inline-flex items-center h-8 sm:h-9 pl-3.5 sm:pl-4 pr-7 sm:pr-9 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
            >
              <span 
                className="absolute right-1 top-1 bottom-1 w-6 sm:w-7 group-hover:w-[calc(100%-8px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              />
              <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-xs sm:text-sm select-none whitespace-nowrap">
                Donate now
              </span>
              <span className="absolute right-1 top-1 bottom-1 w-6 sm:w-7 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-45" />
              </span>
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 text-[#1c1917] hover:bg-black/5 rounded-full flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown with matching frosted glassmorphism */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 ring-1 ring-black/10 rounded-[28px] p-3 shadow-[0_20px_40px_-12px_rgba(43,20,8,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)] animate-fade-in">
            <ul className="flex flex-col gap-1 text-sm font-medium text-[#444444]">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`block px-4 py-2.5 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-black/[0.06] text-[#1c1917] font-semibold'
                          : 'hover:bg-black/[0.04] hover:text-[#1c1917]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
