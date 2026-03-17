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
  { src: heroImage, alt: 'Ek-Prayass community awareness campaign', category: 'Events', type: 'image' },
  // Team
  { src: team1, alt: 'Ek-Prayass core team group photo', category: 'Team', type: 'image' },
  { src: team2, alt: 'Team members during an outdoor event', category: 'Team', type: 'image' },
  { src: team3, alt: 'Team collaboration meeting', category: 'Team', type: 'image' },
  { src: team4, alt: 'Volunteers at campus event', category: 'Team', type: 'image' },
  { src: team5, alt: 'Team photo at awareness session', category: 'Team', type: 'image' },
  { src: team6, alt: 'Full team celebration photo', category: 'Team', type: 'image' },
  // Members
  { src: prabhat, alt: 'Prabhat Kumar Rai - President of Ek-Prayass', category: 'Members', type: 'image' },
  { src: khushi, alt: 'Khushi - Vice-President of Ek-Prayass', category: 'Members', type: 'image' },
  { src: akshma, alt: 'Akshama - Event Management Head', category: 'Members', type: 'image' },
  // Videos
  { src: mainVideo, alt: 'Ek-Prayass journey and impact video', category: 'Videos', type: 'video' },
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
    document.title = 'Gallery | Ek-Prayass';
    return () => { document.title = 'Ek Prayass'; };
  }, []);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-teal-50 px-4 py-2 rounded-full text-sm font-medium text-teal-700 border border-cyan-200 mb-4">
            <Camera className="w-4 h-4" />
            Our Memories
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent mb-4">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore moments of impact, community engagement, and the journeys that define Ek-Prayass
          </p>
          <div className="w-24 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 border-2 border-cyan-200 hover:border-teal-400 hover:text-teal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border-2 border-transparent hover:border-teal-300"
              onClick={() => setLightboxItem(item)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="relative aspect-video bg-gray-900">
                  <video src={item.src} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 bg-teal-500/90 text-white text-xs font-semibold rounded-full mb-2">
                    {item.category}
                  </span>
                  <p className="text-white text-sm">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setLightboxItem(null)}>
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {lightboxItem.type === 'image' ? (
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video src={lightboxItem.src} className="w-full h-full" controls autoPlay />
              </div>
            )}
            <p className="text-white/80 text-center mt-4 text-sm">{lightboxItem.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
