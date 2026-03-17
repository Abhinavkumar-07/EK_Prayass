import React, { useState, useEffect } from 'react';

import kitabi1 from '../assets/kitabiudan1.jpeg';
import kitabi2 from '../assets/kitabi2.jpeg';
import kitabi3 from '../assets/kitabi3.jpeg';
import clean1 from '../assets/clean1.jpeg';
import clean2 from '../assets/clean2.jpeg'; 

import laborVideo from '../assets/labor.mp4';
import cleanlinessVideo from '../assets/vi.mp4';
import menstrualVideo from '../assets/mesntrual.mp4';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

// Hardcoded fallback data (original content)
const fallbackProjects = [
  {
    _id: 'kitabi',
    title: 'Kitabi Udan',
    tagline: '"हर पन्ना नई उड़ान"',
    description: 'Kitabi Udaan is a heartfelt initiative by Ek-Prayass that embodies the spirit of giving and sustainability. The project collects old and partially used notebooks, carefully selects the unused pages, and creates new notebooks for children in need. With every page, we aim to provide not just paper, but the wings to dream, learn, and grow. True to its motto—"हर पन्ना नई उड़ान"—every page becomes a fresh start and a step towards a brighter future.',
    images: [kitabi1, kitabi2, kitabi3],
    colorScheme: 'cyan'
  },
  {
    _id: 'labor',
    title: "Labour's Day",
    tagline: '',
    description: 'Labour Day is a tribute to the hard work, dedication, and resilience of workers across all walks of life. It is a day to recognize and celebrate the invaluable contributions of the workforce that forms the backbone of every society. On this day, we honor the dignity of labor and express gratitude to those whose tireless efforts shape our communities, build our dreams, and drive progress. Let us continue to stand for the rights, respect, and well-being of every worker—today and every day.',
    video: laborVideo,
    colorScheme: 'teal'
  },
  {
    _id: 'cleanliness',
    title: 'Cleanliness Drive',
    tagline: '"One step towards cleanliness, every step towards a better tomorrow."',
    description: "Let's come together to build a cleaner, healthier, and brighter future. Every small action counts, and every hand makes a difference. Join the cleanliness drive and be the change you wish to see!",
    images: [clean1, clean2],
    video: cleanlinessVideo,
    colorScheme: 'green'
  },
  {
    _id: 'menstrual',
    title: 'Menstrual Health Awareness',
    tagline: '',
    description: "Let's break the silence and end the stigma around periods. Menstrual health is not a taboo—it's a natural and essential part of life. Through education, open conversations, and access to proper hygiene, we can empower individuals, especially young girls, to manage their menstrual health with dignity and confidence. Together, let's create a world where every period is met with understanding, respect, and care.",
    video: menstrualVideo,
    colorScheme: 'pink'
  }
];

const colorSchemes = {
  cyan: {
    bg: 'from-white to-cyan-50',
    border: 'border-cyan-200 hover:border-teal-400',
    heading: 'from-teal-600 via-cyan-600 to-sky-600',
    tagBg: 'from-cyan-100 to-teal-100',
    tagPillBg: 'from-cyan-200 to-teal-200',
    tagText: 'text-teal-900',
    cardBg: 'from-cyan-100 to-teal-100',
    imgBorder: 'border-cyan-300 hover:border-teal-400',
    imgGlow: 'from-teal-400 to-cyan-400',
    blob: 'from-cyan-200 to-teal-200',
    videoBg: 'from-teal-900 to-cyan-900',
    videoBorder: 'border-teal-300'
  },
  teal: {
    bg: 'from-white to-teal-50',
    border: 'border-teal-200 hover:border-teal-400',
    heading: 'from-teal-600 via-cyan-600 to-sky-600',
    tagBg: 'from-teal-100 to-cyan-100',
    tagPillBg: 'from-teal-200 to-cyan-200',
    tagText: 'text-teal-900',
    cardBg: 'from-teal-100 to-cyan-100',
    imgBorder: 'border-teal-300 hover:border-teal-400',
    imgGlow: 'from-teal-400 to-cyan-400',
    blob: 'from-teal-200 to-cyan-200',
    videoBg: 'from-teal-900 to-cyan-900',
    videoBorder: 'border-teal-300'
  },
  green: {
    bg: 'from-white to-green-50',
    border: 'border-green-200 hover:border-green-400',
    heading: 'from-green-600 via-emerald-600 to-teal-600',
    tagBg: 'from-green-100 to-emerald-100',
    tagPillBg: 'from-green-200 to-emerald-200',
    tagText: 'text-green-900',
    cardBg: 'from-green-100 to-emerald-100',
    imgBorder: 'border-green-300 hover:border-green-400',
    imgGlow: 'from-green-400 to-emerald-400',
    blob: 'from-green-200 to-emerald-200',
    videoBg: 'from-green-900 to-emerald-900',
    videoBorder: 'border-green-300'
  },
  pink: {
    bg: 'from-white to-pink-50',
    border: 'border-pink-200 hover:border-pink-400',
    heading: 'from-pink-600 via-rose-600 to-purple-600',
    tagBg: 'from-pink-100 to-rose-100',
    tagPillBg: 'from-pink-200 to-rose-200',
    tagText: 'text-pink-900',
    cardBg: 'from-pink-100 to-rose-100',
    imgBorder: 'border-pink-300 hover:border-pink-400',
    imgGlow: 'from-pink-400 to-rose-400',
    blob: 'from-pink-200 to-rose-200',
    videoBg: 'from-pink-900 to-rose-900',
    videoBorder: 'border-pink-300'
  }
};

const Project = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    document.title = 'Our Projects | Ek-Prayass';
    fetchProjects();
    return () => { document.title = 'Ek Prayass'; };
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
      // If empty, keep hardcoded fallback
    } catch (err) {
      console.error('Error fetching projects:', err);
      // Keep fallback on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      
      {/* Header Section */}
      <div className='text-center py-10 sm:py-16 md:py-20 px-4 relative overflow-hidden'>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-teal-100/20 backdrop-blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-block mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl bg-clip-text font-black text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 drop-shadow-2xl mb-4 sm:mb-6 animate-pulse">
              Our Projects
            </h1>
            <div className="w-full h-2 sm:h-3 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 rounded-full shadow-xl animate-pulse"></div>
          </div>
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-cyan-200">
            <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed">
              Ek-Prayass is a youth-led initiative dedicated to creating positive change in society through collective action and compassion. Our mission is to empower communities, support the underprivileged, and drive impactful projects in areas like education, environment, health, and social welfare. Every step we take is a small yet meaningful effort towards building a better, more inclusive world.
            </p>
          </div>
          <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4 sm:space-x-6">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-teal-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-sky-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 sm:pb-16 md:pb-20 space-y-12 sm:space-y-16 md:space-y-20">
        {projects.map((project) => {
          const scheme = colorSchemes[project.colorScheme] || colorSchemes.cyan;
          return (
            <div key={project._id} className={`group bg-gradient-to-br ${scheme.bg} rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 ${scheme.border} hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2`}>
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 relative">
                
                {/* Title */}
                <div className="text-center mb-6 sm:mb-8 md:mb-10 relative z-10">
                  <div className={`inline-block p-3 sm:p-4 md:p-6 bg-gradient-to-r ${scheme.tagBg} rounded-2xl sm:rounded-3xl shadow-lg mb-4 sm:mb-6`}>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${scheme.heading} mb-2 sm:mb-4`}>
                      {project.title}
                    </h2>
                    {project.tagline && (
                      <div className={`inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r ${scheme.tagPillBg} rounded-full shadow-md`}>
                        <p className={`text-lg sm:text-xl md:text-2xl font-bold ${scheme.tagText} italic`}>
                          {project.tagline}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className={`bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border ${scheme.border.split(' ')[0]} mb-6 sm:mb-8`}>
                  <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed text-center">
                    {project.description}
                  </p>
                </div>

                {/* Video */}
                {(project.video || project.videoUrl) && (
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className={`relative w-full max-w-xs sm:max-w-lg md:max-w-2xl bg-gradient-to-r ${scheme.videoBg} rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-4 ${scheme.videoBorder}`}>
                      <div className="aspect-video">
                        <video
                          src={project.video || project.videoUrl}
                          className="w-full h-full object-cover"
                          controls
                          muted
                          playsInline
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Images */}
                {project.images && project.images.length > 0 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
                    {project.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${scheme.imgGlow} rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                        <img
                          src={img}
                          alt={`${project.title} - photo ${idx + 1}`}
                          className={`relative w-56 sm:w-60 md:w-64 h-40 sm:h-44 md:h-48 object-cover rounded-xl sm:rounded-2xl shadow-xl border-4 ${scheme.imgBorder} transition-all duration-300 transform hover:scale-105`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;