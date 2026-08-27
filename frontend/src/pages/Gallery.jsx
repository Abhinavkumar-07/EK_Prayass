import React, { useState, useEffect } from 'react';
import { X, Camera, Play } from 'lucide-react';

import team1 from '../assets/team1.jpeg';
import team2 from '../assets/team2.jpeg';
import team3 from '../assets/team3.jpeg';
import team4 from '../assets/team4.jpeg';
import team5 from '../assets/team5.jpeg';
import team6 from '../assets/team6.jpeg';
import kitabi1 from '../assets/kitabiudan1.jpeg';
import kitabi2 from '../assets/kitabi2.jpeg';
import kitabi3 from '../assets/kitabi3.jpeg';
import clean1 from '../assets/clean1.jpeg';
import clean2 from '../assets/clean2.jpeg';
import heroImage from '../assets/new.jpeg';
import akshma from '../assets/akshma.jpg';
import khushi from '../assets/khushimam.jpeg';
import prabhat from '../assets/prabhatsir.jpeg';
import laborVideo from '../assets/labor.mp4';
import menstrualVideo from '../assets/mesntrual.mp4';
import mainVideo from '../assets/vi.mp4';

const galleryItems = [
  // Events
  { src: kitabi1, alt: 'Kitabi Udan book donation drive poster', category: 'Events', type: 'image' },
  { src: kitabi2, alt: 'Kitabi Udan notebook preparation by volunteers', category: 'Events', type: 'image' },
  { src: kitabi3, alt: 'Kitabi Udan team with collected notebooks', category: 'Events', type: 'image' },
  { src: clean1, alt: 'Cleanliness drive - volunteers cleaning public area', category: 'Events', type: 'image' },
  { src: clean2, alt: 'Cleanliness drive - community participation', category: 'Events', type: 'image' },
  { src: heroImage, alt: 'Ek-Prayas community awareness campaign', category: 'Events', type: 'image' },
  // Team
  { src: team1, alt: 'Ek-Prayas core team group photo', category: 'Team', type: 'image' },
  { src: team2, alt: 'Team members during an outdoor event', category: 'Team', type: 'image' },
  { src: team3, alt: 'Team collaboration meeting', category: 'Team', type: 'image' },
  { src: team4, alt: 'Volunteers at campus event', category: 'Team', type: 'image' },
  { src: team5, alt: 'Team photo at awareness session', category: 'Team', type: 'image' },
  { src: team6, alt: 'Full team celebration photo', category: 'Team', type: 'image' },
  // Members
  { src: prabhat, alt: 'Prabhat Kumar Rai - President of Ek-Prayas', category: 'Members', type: 'image' },
  { src: khushi, alt: 'Khushi - Vice-President of Ek-Prayas', category: 'Members', type: 'image' },
  { src: akshma, alt: 'Akshama - Event Management Head', category: 'Members', type: 'image' },
  // Videos
  { src: mainVideo, alt: 'Ek-Prayas journey and impact video', category: 'Videos', type: 'video' },
  { src: laborVideo, alt: 'Labour Day celebration and tribute video', category: 'Videos', type: 'video' },
  { src: menstrualVideo, alt: 'Menstrual health awareness campaign video', category: 'Videos', type: 'video' },
];

const categories = ['All', 'Events', 'Team', 'Members', 'Videos'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    return () => {  };
  }, []);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-cyan-100 px-6 py-3 rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] text-sm font-semibold text-teal-700 shadow-sm mb-6 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default">
            <Camera className="w-4 h-4 text-cyan-500" />
            Our Memories
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-800 mb-6 drop-shadow-sm">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500">Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explore moments of impact, community engagement, and the journeys that define Ek-Prayas.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="bg-white/50 backdrop-blur-md p-2 rounded-2xl flex flex-wrap gap-2 justify-center shadow-lg shadow-cyan-900/5 border border-white">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md transform scale-105'
                    : 'bg-transparent text-slate-600 hover:bg-white/80 hover:text-teal-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className={`group relative break-inside-avoid rounded-[2rem] rounded-tl-xl rounded-br-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-white/50 ring-1 ring-slate-900/5 bg-white ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}
              onClick={() => setLightboxItem(item)}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="relative aspect-video bg-slate-900">
                  <video src={item.src} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-20">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-cyan-500 transition-all duration-300">
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold rounded-full mb-3 shadow-sm">
                  {item.category}
                </span>
                <p className="text-white text-sm md:text-base font-medium leading-snug drop-shadow-md">
                   {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-[3rem] border border-white shadow-xl mt-10">
            <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Camera className="w-10 h-10 text-cyan-300" />
            </div>
            <p className="text-slate-500 text-lg font-light">No memories found in this category yet.</p>
          </div>
        )}
      </div>

      {/* Premium Lightbox */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4 sm:p-8 animate-fade-in" 
          onClick={() => setLightboxItem(null)}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 border border-white/20 hover:scale-105"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full flex justify-center">
              {lightboxItem.type === 'image' ? (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  className="max-w-full max-h-[75vh] object-contain rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                />
              ) : (
                <div className="w-full max-w-5xl aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black">
                  <video src={lightboxItem.src} className="w-full h-full" controls autoPlay playsInline />
                </div>
              )}
            </div>
            
            <div className="mt-8 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 shadow-xl max-w-2xl text-center">
               <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
                  {lightboxItem.category}
               </span>
               <p className="text-slate-200 text-lg font-light leading-relaxed">{lightboxItem.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
