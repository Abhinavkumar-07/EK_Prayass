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
    bg: 'from-cyan-50/50 to-white hover:from-cyan-50 hover:to-white',
    border: 'border-cyan-100 hover:border-cyan-300',
    heading: 'from-teal-600 via-cyan-600 to-sky-600',
    tagBg: 'bg-cyan-50 border border-cyan-100',
    tagText: 'text-cyan-700',
    glow: 'shadow-cyan-500/10 hover:shadow-cyan-500/20'
  },
  teal: {
    bg: 'from-teal-50/50 to-white hover:from-teal-50 hover:to-white',
    border: 'border-teal-100 hover:border-teal-300',
    heading: 'from-teal-700 to-emerald-600',
    tagBg: 'bg-teal-50 border border-teal-100',
    tagText: 'text-teal-700',
    glow: 'shadow-teal-500/10 hover:shadow-teal-500/20'
  },
  green: {
    bg: 'from-emerald-50/50 to-white hover:from-emerald-50 hover:to-white',
    border: 'border-emerald-100 hover:border-emerald-300',
    heading: 'from-emerald-600 to-green-600',
    tagBg: 'bg-emerald-50 border border-emerald-100',
    tagText: 'text-emerald-700',
    glow: 'shadow-emerald-500/10 hover:shadow-emerald-500/20'
  },
  pink: {
    bg: 'from-pink-50/50 to-white hover:from-pink-50 hover:to-white',
    border: 'border-pink-100 hover:border-pink-300',
    heading: 'from-rose-500 to-pink-600',
    tagBg: 'bg-pink-50 border border-pink-100',
    tagText: 'text-pink-700',
    glow: 'shadow-pink-500/10 hover:shadow-pink-500/20'
  }
};

const Project = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    
    fetchProjects();
    return () => {  };
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
    <div className="min-h-screen bg-slate-50 relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-sky-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>

      {/* Header Section */}
      <div className='text-center py-20 lg:py-28 px-4 relative flex flex-col items-center animate-fade-in-up'>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-slate-800 mb-6 drop-shadow-sm">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">Projects</span>
          </h1>
          
          <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80 ring-1 ring-slate-900/5">
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
              Ek-Prayass is a youth-led initiative dedicated to creating positive change in society through collective action and compassion. Our mission is to empower communities, support the underprivileged, and drive impactful projects in areas like education, environment, health, and social welfare. Every step we take is a small yet meaningful effort towards building a better, more inclusive world.
            </p>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-24">
        {projects.map((project, idx) => {
          const scheme = colorSchemes[project.colorScheme] || colorSchemes.cyan;
          return (
            <div key={project._id} className={`group bg-gradient-to-br ${scheme.bg} rounded-[3.5rem] rounded-tl-[1rem] rounded-br-[1rem] shadow-xl ${scheme.glow} overflow-hidden border ${scheme.border} transition-all duration-500 hover:-translate-y-2 transform ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 animate-fade-in-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="p-8 lg:p-14 relative flex flex-col gap-10">
                
                {/* Header Info */}
                <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-start gap-4 z-10">
                   <div>
                     <h2 className={`text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${scheme.heading} mb-4`}>
                       {project.title}
                     </h2>
                     {project.tagline && (
                       <span className={`inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-wide ${scheme.tagBg} ${scheme.tagText} shadow-sm`}>
                         {project.tagline}
                       </span>
                     )}
                   </div>
                   
                   {/* Optional icon or graphic here based on scheme */}
                </div>

                {/* Description */}
                <div className={`bg-white/80 backdrop-blur-md rounded-[2.5rem] rounded-tr-[1rem] rounded-bl-[1rem] p-8 shadow-sm border border-white relative z-10 w-full md:w-3/4 transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                  <p className="text-slate-600 text-lg leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Media Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                   {/* Video First if exists */}
                   {(project.video || project.videoUrl) && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative group/video">
                        <div className="absolute inset-0 bg-slate-900/10 z-10 opacity-0 group-hover/video:opacity-100 transition-opacity pointer-events-none"></div>
                        <video
                          src={project.video || project.videoUrl}
                          className="w-full h-full aspect-video object-cover"
                          controls
                          muted
                          playsInline
                        />
                      </div>
                   )}
                   
                   {/* Images */}
                   {project.images && project.images.map((img, i) => (
                      <div key={i} className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white aspect-[4/3] group/img">
                        <img
                          src={img}
                          alt={`${project.title} - photo ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                      </div>
                   ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
