import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import team1 from '../assets/team1.jpeg';
import team2 from '../assets/team2.jpeg';
import team3 from '../assets/team3.jpeg';
import team4 from '../assets/team4.jpeg';
import team5 from '../assets/team5.jpeg';
import team6 from '../assets/team6.jpeg';
import abhinavImg from '../assets/new.jpeg';
import swasti_maam from '../assets/swasti_maam.jpeg';
import Avi_sir from '../assets/Avi_sir.jpeg';
import prabhat from '../assets/prabhatsir.jpeg';
import khushi from '../assets/khushimam.jpeg';
import akshama from '../assets/akshma.jpg';
import shorya from '../assets/shorya_sir.jpeg';
import chirag from '../assets/chirag_sir.jpeg';
import shreya from '../assets/shreya.jpeg';
import vanshika from '../assets/vanshika.jpeg';
import pushpanjali from '../assets/pushpanjali.jpeg';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const images = [team3, team1, team2, team4, team5, team6];

const fallbackMembers = [
  {
    _id: 'prabhat',
    name: "Swasti Mitaal",
    position: "President",
    imageUrl: swasti_maam,
    quote: [
      "As the President of our social club, I feel deeply honored to lead a team of passionate individuals committed to making a difference.",
      "For me, this club is more than just a group — it's a community built on compassion, inclusivity, and the belief that small actions can create meaningful change.",
      "My vision is to empower people, uplift voices that often go unheard, and work hand in hand with those striving for a better tomorrow. Together, we can build a society that is not only more just, but more kind.",
      "Let's keep moving forward, one step at a time — with heart, with purpose, and with unity."
    ]
  },
  {
    _id: 'khushi',
    name: "Avi Gupta",
    position: "Vice-President",
    imageUrl: Avi_sir,
    quote: [
      "Being the Vice President of this club is not just a role, it's a भावना (emotion) close to my heart.",
      "I believe true समाज सेवा (social service) starts with listening — to each other, to our communities, and to the बदलाव (change) we want to see.",
      "With every step, I aim to support our टीम (team) in creating meaningful projects that bring people together and uplift those in need.",
      "मेहनत (hard work), सहानुभूति (empathy), and निरंतर प्रयास (consistent effort) — these are the values I stand by.",
      "Let's continue to grow, support, and inspire — as one strong and united परिवार (family)."
    ]
  },
  {
    _id: 'abhinav',
    name: "Abhinav kumar",
    position: "Tech Domain",
    imageUrl: abhinavImg,
    quote: [
      "Supporting an NGO is not charity, it's an investment in dignity, hope, and a better tomorrow."
    ]
  }
];

const otherMembers = [
  {
    _id: 'shreya',
    name: "Shreya Sharma",
    position: "Secretary",
    imageUrl: shreya,
    quote: ["Dedicated to organizing and structuring our efforts to ensure smooth operations and maximum impact."]
  },
  {
    _id: 'chirag',
    name: "Chirag Goswami",
    position: "Operation Head",
    imageUrl: chirag,
    quote: ["Execution is everything. I strive to turn our ideas into reality through precise planning and operational excellence."]
  },
  {
    _id: 'pushpanjali',
    name: "Pushpanjali Srivastava",
    position: "Graphics Head",
    imageUrl: pushpanjali,
    quote: ["Visual storytelling is a powerful tool for change. I aim to create designs that inspire and resonate with our community."]
  },
  {
    _id: 'vanshika',
    name: "Vanshika Mittal",
    position: "Social Media Head",
    imageUrl: vanshika,
    quote: ["Connecting hearts through the digital world. I focus on spreading our message far and wide to build a stronger community."]
  },
  {
    _id: 'shorya',
    name: "Shorya Mittal",
    position: "Content Head",
    imageUrl: shorya,
    quote: ["Words have the power to heal, inspire, and drive action. My goal is to craft stories that leave a lasting impact."]
  }
];

const Team = ({ isHome = false }) => {
  const [index, setIndex] = useState(0);
  const [teamMembers, setTeamMembers] = useState(fallbackMembers);

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    fetchTeam();

    return () => {
      clearInterval(interval);

    };
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE}/team`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // The DB contains members added via Admin (like Abhinav).
        // The static leadership members (Prabhat, Khushi, etc.) are in fallbackMembers.
        const staticLeadership = fallbackMembers.filter(m => m._id !== 'abhinav');
        setTeamMembers([...staticLeadership, ...data]);
      }
      // If empty, keep fallback
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <div className="relative inline-block animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 mb-6 drop-shadow-sm tracking-tight">
              Meet Our Team
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
          </div>
          <p className="text-slate-600 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The passionate individuals driving positive change in our community through compassion and action.
          </p>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        <div className="mt-20 mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] rounded-tl-[4rem] rounded-br-[4rem] shadow-xl shadow-cyan-900/5 overflow-hidden border border-white/80 ring-1 ring-slate-900/5">
            <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white relative z-10 tracking-tight">
                Together We Can
              </h2>
            </div>

            <div className="p-6 md:p-10">
              <div className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={images[index]}
                  alt={`Ek-Prayas team group photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-10 text-center max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-700 italic font-light leading-relaxed">
                  "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved."
                </p>
                <div className="flex justify-center mt-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {teamMembers.filter(member => {
            const name = member.name ? member.name.toLowerCase() : '';
            if (name.includes('akshama') || name.includes('anubha')) {
              return false;
            }
            if (isHome) {
              return !name.includes('abhinav');
            }
            return true;
          }).map((member, idx) => (
            <div key={member._id || idx} className="group h-full transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-[1deg]">
              <div className="h-full bg-white/70 backdrop-blur-md rounded-[2.5rem] rounded-tr-[4rem] rounded-bl-[4rem] shadow-lg shadow-cyan-900/5 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-500 overflow-hidden border border-white/80 ring-1 ring-slate-900/5 flex flex-col">
                <div className="p-8 pb-6 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden ring-4 ring-cyan-50 shadow-xl shadow-cyan-900/5 group-hover:ring-cyan-200 transition-all duration-500 rotate-[-4deg] group-hover:rotate-0">
                        <img
                          src={member.imageUrl || member.image}
                          alt={`${member.name} - ${member.position}`}
                          className="w-full h-full object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="text-center sm:text-left flex-1 pt-2">
                      <h2 className="text-2xl font-display font-bold text-slate-800 mb-3 truncate tracking-tight">
                        {member.name}
                      </h2>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-800 rounded-[1rem] rounded-br-sm rounded-tl-sm text-sm font-semibold border border-cyan-100 shadow-sm shadow-cyan-900/5 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        {member.position}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center bg-slate-50/50 relative overflow-hidden">
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-4 right-6 text-8xl text-slate-100 font-serif leading-none select-none pointer-events-none group-hover:text-cyan-50 transition-colors duration-500">"</div>

                  <div className="relative z-10 space-y-4">
                    {(member.quote || []).map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-slate-600 leading-relaxed text-sm lg:text-base font-light">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center -mx-3 lg:-mx-4">
          {otherMembers.map((member, idx) => (
            <div key={idx} className="w-full md:w-1/2 lg:w-1/3 px-3 lg:px-4 mb-6 lg:mb-8 flex">
              <div className="w-full group h-full transform transition-transform duration-500 hover:-translate-y-1">
                <div className="h-full bg-white/70 backdrop-blur-md rounded-[1.5rem] shadow-md shadow-cyan-900/5 hover:shadow-xl hover:shadow-cyan-500/15 transition-all duration-500 overflow-hidden border border-white/80 ring-1 ring-slate-900/5 flex flex-col">
                  <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-cyan-50 shadow-md shadow-cyan-900/5 group-hover:ring-cyan-200 transition-all duration-500">
                        <img
                          src={member.imageUrl || team1}
                          alt={`${member.name} - ${member.position}`}
                          className="w-full h-full object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="text-center sm:text-left flex-1 pt-1">
                        <h2 className="text-xl font-display font-bold text-slate-800 mb-1 truncate tracking-tight">
                          {member.name}
                        </h2>
                        <div className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-800 rounded-lg text-xs font-semibold border border-cyan-100 shadow-sm">
                          {member.position}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 bg-slate-50/50 relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                      <p className="text-slate-600 leading-relaxed text-sm font-light">
                        {member.quote[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 rounded-[4rem] rounded-tr-[2rem] rounded-bl-[2rem] transform rotate-1 opacity-20 blur-xl"></div>
          <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[4rem] rounded-tr-[2rem] rounded-bl-[2rem] shadow-2xl shadow-cyan-500/20 p-12 lg:p-16 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-white/20 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Join Our Mission
              </h3>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-teal-50 font-light">
                Together, we can create meaningful change in our community. Every voice matters, every action counts. Become part of our family today.
              </p>
              <Link to="/volunteer">
                <button className="bg-white text-teal-700 px-10 py-4 rounded-[2rem] rounded-tl-xl rounded-br-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-900/30 transform hover:-translate-y-1 hover:rotate-1 transition-all duration-300 group-hover:bg-cyan-50">
                  Become a Volunteer
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
