import React from 'react';
import { Link } from 'react-router-dom';
import videoSrc from '../assets/vi.mp4';
import { Heart, Users, Target, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import heroImage from '../assets/new.jpeg';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Our Origin & Purpose</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Empowering Communities <br />
            <span className="italic font-normal">Through Heartfelt Action.</span>
          </h1>

          <p className="text-[#666666] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Founded in 2021, Ek-Prayass was born from a unified belief: when enthusiastic youth channel their energy towards grassroots social causes, monumental changes unfold across lives, classrooms, and neighborhoods.
          </p>
        </div>

        {/* Video & Mission Split Card */}
        <div className="bg-white border border-black/8 rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-14 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917] leading-tight">
              A Community of Empathy, <br />
              <span className="italic font-normal">Action, and Accountability.</span>
            </h2>
            <div className="space-y-4 text-[#666666] text-base font-light leading-relaxed">
              <p>
                At the core of Ek-Prayass is a deep commitment to inspire, empower, and uplift. We unite passionate students and youth eager to learn, collaborate, and raise awareness about pressing social issues—from public health to child education.
              </p>
              <p>
                Through innovative projects like <strong>Kitabi Udaan</strong>, cleanliness drives, and menstrual hygiene campaigns, we deliver tangible, measurable help to the people who need it most.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/volunteer"
                className="btn-orenda-primary"
              >
                <span>Join Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/project"
                className="btn-orenda-secondary"
              >
                <span>Explore Projects</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[2rem] overflow-hidden aspect-video bg-black shadow-xl border border-black/8 group">
              <video
                src={videoSrc}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Inclusive Youth Community',
              desc: 'A welcoming platform where young students and professionals bring diverse talents together to serve society.'
            },
            {
              icon: Target,
              title: 'Tangible Ground Impact',
              desc: 'Moving beyond words into ground actions: binding real books, organizing genuine drives, and touching real lives.'
            },
            {
              icon: Sparkles,
              title: 'Continuous Leadership',
              desc: 'Fostering leadership, empathy, and social responsibility in the next generation of Indian citizens.'
            }
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="card-orenda p-8 sm:p-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f8f4ec] text-[#4a1c00] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1c1917]">{pillar.title}</h3>
                <p className="text-[#666666] text-sm sm:text-base font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Numbers */}
        <div className="bg-[#4a1c00] text-white rounded-[2.5rem] sm:rounded-[3.5rem] p-10 sm:p-16 shadow-xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10">Our Measurable Journey</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold">5,000+</p>
              <p className="text-sm text-white/80 mt-2 font-medium">Lives Reached</p>
            </div>
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold">100+</p>
              <p className="text-sm text-white/80 mt-2 font-medium">Active Members</p>
            </div>
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold">25+</p>
              <p className="text-sm text-white/80 mt-2 font-medium">Drives Executed</p>
            </div>
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold">15+</p>
              <p className="text-sm text-white/80 mt-2 font-medium">Communities Impacted</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
