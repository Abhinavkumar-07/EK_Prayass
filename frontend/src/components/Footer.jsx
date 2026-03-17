import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/780221923.jpg';

const Footer = () => {
    return (
        <footer className="bg-gray-900 shadow-inherit z-50 w-full">
            <div>
                <div className="flex flex-wrap justify-between px-6 py-4 gap-y-6">
                    
                    {/* 1st section */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
                        <div className="flex items-center gap-3 font-bold text-2xl align-middle pb-3 pt-3 text-white">
                            <img src={logo} alt="Ek-Prayass club logo" height="50px" width="50px" className="rounded-full" />
                            <div className="border-b-4 border-cyan-400">
                                Ek-Prayass
                                <p className="text-sm italic text-gray-400">JAAGROOKTA KI ORR</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400 px-1">
                            <p>Founded in 2021, Ek-Prayass is a group of dedicated individuals who came together to create awareness and sensitize youth about the harmful impacts of tobacco consumption and engage in various social welfare activities.</p>
                        </div>
                    </div>

                    {/* 2nd section */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
                        <h3 className="font-semibold text-lg mb-3 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/">Home</Link></li>
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/about">About</Link></li>
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/project">Our Work</Link></li>
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/notice">Notices</Link></li>
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/gallery">Gallery</Link></li>
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/partners">Partners</Link></li>
                            <li className="hover:text-cyan-400 transition cursor-pointer"><Link to="/volunteer">Volunteer</Link></li>
                        </ul>
                    </div>

                    {/* 3rd section */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
                        <h3 className="font-semibold text-lg mb-3 text-white">Resources</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-cyan-400 transition cursor-pointer">FAQ</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition cursor-pointer">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition cursor-pointer">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition cursor-pointer">Support</a></li>
                            <li><Link to="/form" className="hover:text-cyan-400 transition cursor-pointer">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* 4th section - Follow Us */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
                        <h3 className="font-semibold text-lg mb-3 text-white">Follow Us</h3>
                        <div className="flex flex-col gap-4">
                            <a href="https://instagram.com/club_ekprayass?utm_medium=copy_link" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-pink-500 hover:text-pink-400 cursor-pointer">
                                    <path d="M7.75 2C4.95 2 2.75 4.2 2.75 7v10c0 2.8 2.2 5 5 5h8.5c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7.75zm0 1.5h8.5c1.93 0 3.5 1.57 3.5 3.5v10c0 1.93-1.57 3.5-3.5 3.5h-8.5c-1.93 0-3.5-1.57-3.5-3.5V7c0-1.93 1.57-3.5 3.5-3.5zm8.75 2a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                                </svg>
                                <h6 className="text-gray-400 font-semibold pt-1">Instagram</h6>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100075500094241" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-blue-500 hover:text-blue-400 cursor-pointer">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.878C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                                <h6 className="text-gray-400 font-semibold pt-1">Facebook</h6>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700" />

                <div className="text-center text-lg pb-2 pt-2 text-gray-400">
                    <p>&copy; 2025 Ek-Prayass. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
