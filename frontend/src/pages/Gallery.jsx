import React, { useState } from 'react';
import { Camera, X, Play, ArrowUpRight } from 'lucide-react';

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
import swasti_maam from '../assets/swasti_maam.jpeg';
import Avi_sir from '../assets/Avi_sir.jpeg';
import laborVideo from '../assets/labor.mp4';
import menstrualVideo from '../assets/mesntrual.mp4';
import mainVideo from '../assets/vi.mp4';

const galleryItems = [
  { src: kitabi1, alt: 'Kitabi Udaan book collection campaign', category: 'Events', type: 'image' },
  { src: kitabi2, alt: 'Recycling unused notebook pages', category: 'Events', type: 'image' },
  { src: kitabi3, alt: 'Kitabi Udaan notebook distribution to children', category: 'Events', type: 'image' },
  { src: clean1, alt: 'Cleanliness & hygiene drive in public area', category: 'Events', type: 'image' },
  { src: clean2, alt: 'Volunteers participating in tree & clean drive', category: 'Events', type: 'image' },
  { src: heroImage, alt: 'Ek-Prayass on-ground social awareness campaign', category: 'Events', type: 'image' },
  { src: team1, alt: 'Core volunteer team group portrait', category: 'Team', type: 'image' },
  { src: team2, alt: 'Volunteers during an outdoor health workshop', category: 'Team', type: 'image' },
  { src: team3, alt: 'Planning and strategy meet', category: 'Team', type: 'image' },
  { src: team4, alt: 'Campus drive volunteers', category: 'Team', type: 'image' },
  { src: team5, alt: 'Educational seminar with local community', category: 'Team', type: 'image' },
  { src: team6, alt: 'Ek-Prayass annual community celebration', category: 'Team', type: 'image' },
  { src: swasti_maam, alt: 'Swasti Mittal - President', category: 'Members', type: 'image' },
  { src: Avi_sir, alt: 'Avi Gupta - Vice President', category: 'Members', type: 'image' },
  { src: mainVideo, alt: 'Ek-Prayass journey of impact', category: 'Videos', type: 'video' },
  { src: laborVideo, alt: 'Labour Day celebration and tribute', category: 'Videos', type: 'video' },
  { src: menstrualVideo, alt: 'Menstrual health awareness camp', category: 'Videos', type: 'video' },
];

const categories = ['All', 'Events', 'Team', 'Members', 'Videos'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Memories & Moments</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Community <br />
            <span className="italic font-normal">Impact Gallery.</span>
          </h1>

          <p className="text-[#666666] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Explore authentic moments from our donation drives, student volunteer camps, cleanups, and community outreach.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#4a1c00] text-white shadow-sm'
                    : 'bg-white border border-black/8 text-[#444444] hover:bg-[#f2f3f7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxItem(item)}
              className="card-orenda overflow-hidden group cursor-pointer aspect-[4/3] relative bg-slate-100"
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video 
                    src={item.src} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/80 group-hover:bg-[#4a1c00] group-hover:text-white text-[#4a1c00] flex items-center justify-center shadow-lg transition-colors">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-sm font-medium font-serif">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full max-h-[80vh] flex items-center justify-center">
              {lightboxItem.type === 'video' ? (
                <video src={lightboxItem.src} controls autoPlay className="w-full max-h-[80vh]" />
              ) : (
                <img src={lightboxItem.src} alt={lightboxItem.alt} className="w-full max-h-[80vh] object-contain" />
              )}
            </div>
            <div className="p-4 bg-[#1c1917] text-white text-center text-sm font-serif">
              {lightboxItem.alt}
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setLightboxItem(null)} />
        </div>
      )}

    </div>
  );
};

export default Gallery;
