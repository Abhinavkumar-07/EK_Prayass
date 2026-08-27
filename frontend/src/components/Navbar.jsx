import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../assets/favicon.jpg';
import { Home, User, Menu, X, HeartHandshake } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();
  const location = useLocation();

  
  const handleDonateClick = () => {
    if (location.pathname === '/') {
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/project' },
    { label: 'Notice', path: '/notice' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Our Team', path: '/team' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Partners', path: '/partners' }
  ];

  return (
    <nav className="py-4 bg-gradient-to-r from-[#17c1c8] to-[#6ed2fc] shadow-md px-8 md:sticky md:top-0 z-50 w-full transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative overflow-hidden rounded-full ring-2 ring-white/50 shadow-sm transition-all group-hover:shadow-white/80 group-hover:scale-105 duration-300">
             <img src={logo} alt="Ek-Prayas logo" height="45" width="45" className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[22px] text-white tracking-tight flex flex-col items-start gap-0.5">
              Ek-Prayas
              <span className="w-[105%] h-[3px] bg-white rounded-full"></span>
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex gap-2 text-white font-semibold items-center text-[15px]">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path}
                  className="px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            <li className="ml-4">
              <button
                onClick={handleDonateClick}
                className="group flex items-center justify-center text-teal-700 bg-white font-bold rounded-[1.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] px-5 py-2.5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:rotate-1"
              >
                Donate
                <HeartHandshake className="inline-block ml-2 text-teal-600 group-hover:scale-110 transition-transform" size={18} />
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 pb-4 border-t border-white/30 animate-fade-in-up">
          <ul className="flex flex-col gap-1 text-white font-medium px-2">
            {navLinks.map((item) => (
               <li key={`mobile-${item.label}`}>
                <Link 
                  to={item.path}
                  onClick={toggleMenu}
                  className="block p-3 rounded-xl hover:bg-white/20 transition-colors text-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
           
            <li className="mt-6 px-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleDonateClick();
                }}
                className="w-full text-teal-700 font-bold bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                Donate
                <HeartHandshake className="inline-block ml-2 text-teal-600" size={18} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
