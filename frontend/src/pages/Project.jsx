import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowUpRight, Sparkles, CheckCircle, Video } from 'lucide-react';
import kitabi1 from '../assets/kitabiudan1.jpeg';
import kitabi2 from '../assets/kitabi2.jpeg';
import kitabi3 from '../assets/kitabi3.jpeg';
import clean1 from '../assets/clean1.jpeg';
import clean2 from '../assets/clean2.jpeg';
import laborVideo from '../assets/labor.mp4';
import cleanlinessVideo from '../assets/vi.mp4';
import menstrualVideo from '../assets/mesntrual.mp4';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const fallbackProjects = [
  {
    _id: 'kitabi',
    title: 'Kitabi Udaan',
    tagline: 'हर पन्ना नई उड़ान',
    category: 'Education & Sustainability',
    description: 'Kitabi Udaan is a heartfelt initiative by Ek-Prayass that embodies the spirit of giving and environmental sustainability. The project collects used and partially filled notebooks, carefully separates and extracts unused pages, and binds brand-new notebooks for underprivileged children. With every page, we aim to provide not just paper, but the wings to dream, learn, and grow.',
    images: [kitabi1, kitabi2, kitabi3],
    impact: '1,200+ Recycled Notebooks Distributed'
  },
  {
    _id: 'cleanliness',
    title: 'Cleanliness & Sanitation Campaign',
    tagline: 'One Step Towards Cleanliness, Every Step Towards a Better Tomorrow',
    category: 'Environmental Health',
    description: "Our cleanliness drives mobilize youth volunteers to clean community areas, educate locals on waste segregation, and promote sustainable neighborhood hygiene. Every small action counts, and every pair of willing hands makes a tangible difference in transforming public health.",
    images: [clean1, clean2],
    video: cleanlinessVideo,
    impact: '15+ Public Areas Cleaned & Maintained'
  },
  {
    _id: 'menstrual',
    title: 'Menstrual Health & Dignity Awareness',
    tagline: 'Breaking Taboos, Educating Generations',
    category: 'Women Health Awareness',
    description: "Breaking the silence and ending the stigma around periods. Menstrual health is a fundamental healthcare right. Through education, open conversations, and providing sanitary kits, we empower young girls in local schools to manage their hygiene with confidence, privacy, and dignity.",
    video: menstrualVideo,
    impact: '800+ Young Women Sensitized with Kits'
  },
  {
    _id: 'labor',
    title: "Labour's Day & Dignity of Work",
    tagline: 'Honoring the Backbone of Our Society',
    category: 'Social Welfare & Equity',
    description: "A heartfelt tribute to the tireless efforts of workers and campus support staff across our community. We conduct health check-ups, distribute essential care packs, and honor the dignity of labor, ensuring workers feel celebrated, respected, and heard.",
    video: laborVideo,
    impact: '500+ Daily-Wage Workers Celebrated'
  }
];

const Project = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Real Causes · Tangible Change</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Our Projects & <br />
            <span className="italic font-normal">Grassroots Campaigns.</span>
          </h1>

          <p className="text-[#666666] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            From recycling thousands of notebook pages for young learners to breaking menstrual taboos and organizing public sanitation drives, explore our active initiatives.
          </p>
        </div>

        {/* Projects List with Orenda Card Aesthetics */}
        <div className="space-y-16">
          {projects.map((proj, idx) => (
            <div 
              key={proj._id || idx}
              className="card-orenda p-8 sm:p-12 lg:p-14 border border-black/8 space-y-8"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/6">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#4a1c00] tracking-wider bg-[#f8f4ec] px-3 py-1 rounded-full inline-block mb-2">
                    {proj.category || 'Initiative'}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
                    {proj.title}
                  </h2>
                  {proj.tagline && (
                    <p className="text-sm text-[#8b6a2a] italic font-serif mt-1">
                      "{proj.tagline}"
                    </p>
                  )}
                </div>

                {proj.impact && (
                  <div className="inline-flex items-center gap-2 bg-[#f8f4ec] px-4 py-2 rounded-2xl border border-black/5 text-xs sm:text-sm font-semibold text-[#1c1917]">
                    <CheckCircle className="w-4 h-4 text-[#4a1c00]" />
                    <span>{proj.impact}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-[#666666] text-base sm:text-lg font-light leading-relaxed max-w-5xl">
                {proj.description}
              </p>

              {/* Media Display (Video or Images) */}
              <div className="space-y-6">
                {/* Video if present */}
                {(proj.video || proj.videoUrl) && (
                  <div className="rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-video max-w-4xl">
                    <video
                      src={proj.video || proj.videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Images Grid */}
                {proj.images && proj.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {proj.images.map((img, imgIdx) => (
                      <div 
                        key={imgIdx}
                        className="rounded-[1.75rem] overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm border border-black/5 group"
                      >
                        <img 
                          src={img} 
                          alt={`${proj.title} - photo ${imgIdx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Project;
