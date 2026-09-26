import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, ArrowRight } from 'lucide-react';

import team1 from '../assets/team1.jpeg';
import team2 from '../assets/team2.jpeg';
import team3 from '../assets/team3.jpeg';
import team4 from '../assets/team4.jpeg';
import team5 from '../assets/team5.jpeg';
import team6 from '../assets/team6.jpeg';
import abhinavImg from '../assets/new.jpeg';
import swasti_maam from '../assets/swasti_maam.jpeg';
import Avi_sir from '../assets/Avi_sir.jpeg';
import shreya from '../assets/shreya.jpeg';
import chirag from '../assets/chirag_sir.jpeg';
import pushpanjali from '../assets/pushpanjali.jpeg';
import vanshika from '../assets/vanshika.jpeg';
import shorya from '../assets/shorya_sir.jpeg';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';
const images = [team3, team1, team2, team4, team5, team6];

const fallbackLeadership = [
  {
    _id: 'swasti',
    name: "Swasti Mittal",
    position: "President",
    imageUrl: swasti_maam,
    quote: "As the President of our social club, I feel deeply honored to lead a team of passionate individuals committed to making a difference. For me, this club is more than just a group — it's a community built on compassion, inclusivity, and the belief that small actions create monumental change."
  },
  {
    _id: 'avi',
    name: "Avi Gupta",
    position: "Vice-President",
    imageUrl: Avi_sir,
    quote: "Being the Vice President of this club is a भावना (emotion) close to my heart. True समाज सेवा (social service) starts with listening — to each other, to our communities, and to the बदलाव (change) we want to see."
  },
  {
    _id: 'abhinav',
    name: "Abhinav Kumar",
    position: "Tech Domain Lead",
    imageUrl: abhinavImg,
    quote: "Supporting an NGO is not just charity, it's an enduring investment in dignity, education, and a better tomorrow."
  }
];

const domainHeads = [
  {
    _id: 'shreya',
    name: "Shreya Sharma",
    position: "Secretary",
    imageUrl: shreya,
    quote: "Dedicated to organizing and structuring our efforts to ensure smooth operations and maximum ground impact."
  },
  {
    _id: 'chirag',
    name: "Chirag Goswami",
    position: "Operations Head",
    imageUrl: chirag,
    quote: "Execution is everything. I strive to turn our ideas into reality through precise planning and operational excellence."
  },
  {
    _id: 'pushpanjali',
    name: "Pushpanjali Srivastava",
    position: "Graphics Head",
    imageUrl: pushpanjali,
    quote: "Visual storytelling is a powerful tool for change. I aim to create designs that inspire and resonate with our community."
  },
  {
    _id: 'vanshika',
    name: "Vanshika Mittal",
    position: "Social Media Head",
    imageUrl: vanshika,
    quote: "Connecting hearts through the digital world. I focus on spreading our message far and wide to mobilize active youth."
  },
  {
    _id: 'shorya',
    name: "Shorya Mittal",
    position: "Content Head",
    imageUrl: shorya,
    quote: "Words have the power to heal, inspire, and drive action. My goal is to craft stories that leave a lasting impact."
  }
];

const Team = () => {
  const [index, setIndex] = useState(0);
  const [leadership, setLeadership] = useState(fallbackLeadership);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    fetchTeam();
    return () => clearInterval(interval);
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE}/team`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const staticLeaders = fallbackLeadership.filter(m => m._id !== 'abhinav');
        setLeadership([...staticLeaders, ...data]);
      }
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Passionate Changemakers</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Meet the Hearts & Minds of <br />
            <span className="italic font-normal">Ek-Prayass.</span>
          </h1>

          <p className="text-[#666666] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Meet the student leaders, coordinators, and volunteers dedicated to driving grassroots empathy and sustainable community welfare.
          </p>
        </div>

        {/* Group Photo Showcase */}
        <div className="card-orenda p-6 sm:p-10 overflow-hidden space-y-6">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] bg-black shadow-lg">
            <img 
              src={images[index]} 
              alt="Ek-Prayass team in action"
              className="w-full h-full object-cover transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs font-semibold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-md inline-block mb-2">
                Team Solidarity
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                "Together, We Can Do So Much."
              </h3>
            </div>
          </div>
        </div>

        {/* Leadership Grid */}
        <div className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold text-[#1c1917]">Core Leadership</h2>
            <p className="text-[#666666] text-sm font-light">Guiding our direction, ethics, and community impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div 
                key={member._id || i}
                className="card-orenda p-8 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 ring-2 ring-black/5">
                    <img 
                      src={member.imageUrl || member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1c1917]">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#4a1c00] uppercase tracking-wider mt-1">{member.position}</p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-black/6">
                  <p className="text-xs sm:text-sm text-[#666666] italic leading-relaxed font-light">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Heads Grid */}
        <div className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold text-[#1c1917]">Domain Leads & Coordinators</h2>
            <p className="text-[#666666] text-sm font-light">Managing logistics, graphics, media, and communication.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domainHeads.map((head, i) => (
              <div 
                key={head._id || i}
                className="card-orenda p-6 flex flex-col justify-between group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-black/5">
                    <img 
                      src={head.imageUrl} 
                      alt={head.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1c1917]">{head.name}</h4>
                    <p className="text-xs font-semibold text-[#4a1c00] uppercase">{head.position}</p>
                  </div>
                </div>
                <p className="text-xs text-[#666666] italic font-light leading-relaxed">
                  "{head.quote[0]}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="bg-[#4a1c00] text-white rounded-[2.5rem] p-10 sm:p-14 text-center space-y-4">
          <h3 className="font-serif text-3xl font-bold">Want to Join Our Team?</h3>
          <p className="text-white/80 text-base font-light max-w-xl mx-auto">
            We are always looking for passionate students to lead projects, create content, manage events, and make a real difference.
          </p>
          <div className="pt-2">
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 bg-white text-[#4a1c00] font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#f8f4ec] transition-all"
            >
              <span>Apply as a Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
