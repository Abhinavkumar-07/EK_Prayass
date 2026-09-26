import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.jpg';
import { ArrowRight, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f8f4ec] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-black/8">
      <div className="max-w-7xl mx-auto space-y-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-black/10">
                <img src={logo} alt="Ek-Prayass logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif font-bold text-xl text-[#1c1917]">Ek-Prayass</span>
            </div>
            <p className="text-sm text-[#666666] font-light leading-relaxed">
              Compassion in Action, <br />
              Hope in Every Heart.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://instagram.com/club_ekprayass?utm_medium=copy_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-black/10 text-[#1c1917] flex items-center justify-center hover:bg-[#2b1408] hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100075500094241" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-black/10 text-[#1c1917] flex items-center justify-center hover:bg-[#2b1408] hover:text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Subscribe Card (Ditto Orenda) */}
            <div className="rounded-[28px] bg-[#e9e8e4]/60 p-6 border border-black/5 space-y-4">
              <h4 className="font-serif text-lg font-normal text-[#1c1917]">
                Subscribe to our newsletter
              </h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-2xl text-xs text-[#292929] focus:outline-none focus:border-[#2b1408]"
                />
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-between w-full h-10 pl-5 pr-11 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
                >
                  <span 
                    className="absolute right-1 top-1 bottom-1 w-8 group-hover:w-[calc(100%-8px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                  />
                  <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-[14px] select-none">
                    Subscribe
                  </span>
                  <span className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-45" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="lg:col-span-2 space-y-3 text-sm">
            <p className="font-serif font-medium text-[#1c1917] mb-4">Explore</p>
            <ul className="space-y-2.5 text-[#666666]">
              <li><Link to="/about" className="hover:text-[#1c1917] transition-colors">About</Link></li>
              <li><Link to="/project" className="hover:text-[#1c1917] transition-colors">Programs</Link></li>
              <li><Link to="/volunteer" className="hover:text-[#1c1917] transition-colors">Join Community</Link></li>
              <li><Link to="/gallery" className="hover:text-[#1c1917] transition-colors">Previous events</Link></li>
              <li><Link to="/project" className="hover:text-[#1c1917] transition-colors">Success stories</Link></li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="lg:col-span-2 space-y-3 text-sm">
            <p className="font-serif font-medium text-[#1c1917] mb-4">Legal & Notice</p>
            <ul className="space-y-2.5 text-[#666666]">
              <li><Link to="/notice" className="hover:text-[#1c1917] transition-colors">Notices</Link></li>
              <li><Link to="/partners" className="hover:text-[#1c1917] transition-colors">Partners</Link></li>
              <li><Link to="/about" className="hover:text-[#1c1917] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-[#1c1917] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-3 text-sm">
            <p className="font-serif font-medium text-[#1c1917] mb-4">Contact us</p>
            <div className="space-y-3 text-[#666666]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2b1408]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2b1408]" />
                <span>contact.ekprayass@gmail.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2b1408] flex-shrink-0 mt-0.5" />
                <span>Kanpur, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] gap-4">
          <p>Copyright © {new Date().getFullYear()} Ek-Prayass. All rights reserved.</p>
          <p>Ek-Prayass Social Welfare Organization</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
