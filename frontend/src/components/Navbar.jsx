import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../assets/780221923.jpg';
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

  return (
    <nav className="py-4 bg-gradient-to-r from-teal-500 via-cyan-400 to-sky-300 px-8 md:sticky md:top-0 shadow-md z-50 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5 font-bold text-2xl text-white">
          <img src={logo} alt="Ek-Prayass club logo" height="50px" width="50px" className="rounded-full" />
          <div className="border-b-4 border-white">Ek-Prayass</div>
        </div>

        
        <div className="hidden md:block">
          <ul className="flex gap-5 text-white font-medium items-center">
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/about">About</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/project">Projects</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/notice">Notice</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/volunteer">Volunteer</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/team">Our Team</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className="p-2 hover:text-white/80 transition-colors">
              <Link to="/partners">Partners</Link>
            </li>
            
            <li className="p-2">
              <button
                onClick={handleDonateClick}
                className="text-teal-700 hover:scale-105 transition-all duration-300 font-semibold bg-white rounded-lg p-3 shadow-md"
              >
                Donate
                <HeartHandshake className="inline-block ml-2" size={20} />
              </button>
            </li>

          </ul>
        </div>

        
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-white/30">
          <ul className="flex flex-col gap-2 text-white font-medium">
            <li className="p-2">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="p-2">
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li className="p-2">
              <Link to="/project" onClick={toggleMenu}>
                Projects
              </Link>
            </li>
            <li className="p-2">
              <Link to="/notice" onClick={toggleMenu}>
                Notice
              </Link>
            </li>
            <li className="p-2">
              <Link to="/volunteer" onClick={toggleMenu}>
                Volunteer
              </Link>
            </li>
            <li className="p-2">
              <Link to="/team" onClick={toggleMenu}>
                Team
              </Link>
            </li>
            <li className="p-2">
              <Link to="/gallery" onClick={toggleMenu}>
                Gallery
              </Link>
            </li>
            <li className="p-2">
              <Link to="/partners" onClick={toggleMenu}>
                Partners
              </Link>
            </li>

           
            <li className="p-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleDonateClick();
                }}
                className="text-teal-700 font-semibold bg-white rounded-lg p-3 w-full shadow-md"
              >
                Donate
                <HeartHandshake className="inline-block ml-2" size={20} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
