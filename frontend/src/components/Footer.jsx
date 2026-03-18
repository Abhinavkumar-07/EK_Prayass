import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/780221923.jpg';

const Footer = () => {
    return (
        <footer className="bg-[#020617] pt-12 pb-6 border-t border-slate-800/80">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* 1st section */}
                    <div className="space-y-4 pr-4">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="Ek-Prayass logo" className="h-[46px] w-[46px] rounded-full ring-1 ring-cyan-500/30" />
                            <div className="flex flex-col">
                                <h2 className="font-display font-bold text-lg text-white tracking-tight leading-tight">Ek-Prayass</h2>
                                <p className="text-[10px] font-semibold text-[#17c1c8] tracking-[0.15em] uppercase mt-0.5">JAAGROOKTA KI ORR</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-[13px] leading-[1.6]">
                            Founded in 2021, Ek-Prayass is a group of dedicated individuals who came together to create awareness and sensitize youth about the harmful impacts of tobacco consumption and engage in various social welfare activities.
                        </p>
                    </div>

                    {/* 2nd section */}
                    <div className="lg:pl-8">
                        <h3 className="font-semibold text-[15px] text-white mb-5">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Our Work', 'Notice', 'Gallery', 'Partners', 'Volunteer'].map(item => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : item === 'Our Work' ? '/project' : `/${item.toLowerCase()}`} className="text-slate-400 text-[14px] hover:text-[#17c1c8] transition-colors duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3rd section */}
                    <div>
                        <h3 className="font-semibold text-[15px] text-white mb-5">Resources</h3>
                        <ul className="space-y-3">
                            {['FAQ', 'Privacy Policy', 'Terms of Service', 'Support', 'Contact Us'].map(item => (
                                <li key={item}>
                                    <Link to={item === 'Contact Us' ? '/form' : '#'} className="text-slate-400 text-[14px] hover:text-[#17c1c8] transition-colors duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4th section - Follow Us */}
                    <div>
                        <h3 className="font-semibold text-[15px] text-white mb-5">Follow Us</h3>
                        <div className="flex gap-3">
                            <a href="https://instagram.com/club_ekprayass?utm_medium=copy_link" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[1rem] rounded-br-[4px] rounded-tl-[4px] bg-slate-800/80 flex items-center justify-center hover:bg-[#17c1c8] hover:text-white text-slate-400 transition-all duration-300 transform hover:rotate-[-5deg]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M7.75 2C4.95 2 2.75 4.2 2.75 7v10c0 2.8 2.2 5 5 5h8.5c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7.75zm0 1.5h8.5c1.93 0 3.5 1.57 3.5 3.5v10c0 1.93-1.57 3.5-3.5 3.5h-8.5c-1.93 0-3.5-1.57-3.5-3.5V7c0-1.93 1.57-3.5 3.5-3.5zm8.75 2a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100075500094241" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[1rem] rounded-br-[4px] rounded-tl-[4px] bg-slate-800/80 flex items-center justify-center hover:bg-[#17c1c8] hover:text-white text-slate-400 transition-all duration-300 transform hover:rotate-[5deg]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.878C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800/80 pt-6 mt-6 pb-2">
                    <p className="text-slate-500 text-[13px]">
                        &copy; {new Date().getFullYear()} Ek-Prayass. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
