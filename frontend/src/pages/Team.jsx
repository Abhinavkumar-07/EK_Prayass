import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import team1 from '../assets/team1.jpeg';
import team2 from '../assets/team2.jpeg';
import team3 from '../assets/team3.jpeg';
import team4 from '../assets/team4.jpeg';
import team5 from '../assets/team5.jpeg';
import team6 from '../assets/team6.jpeg';

import prabhat from '../assets/prabhatsir.jpeg';
import khushi from '../assets/khushimam.jpeg';
import akshama from '../assets/akshma.jpg';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const images = [team3, team1, team2, team4, team5, team6];

const fallbackMembers = [
  {
    _id: 'prabhat',
    name: "Prabhat Kumar Rai",
    position: "President",
    imageUrl: prabhat,
    quote: [
      "As the President of our social club, I feel deeply honored to lead a team of passionate individuals committed to making a difference.",
      "For me, this club is more than just a group — it's a community built on compassion, inclusivity, and the belief that small actions can create meaningful change.",
      "My vision is to empower people, uplift voices that often go unheard, and work hand in hand with those striving for a better tomorrow. Together, we can build a society that is not only more just, but more kind.",
      "Let's keep moving forward, one step at a time — with heart, with purpose, and with unity."
    ]
  },
  {
    _id: 'khushi',
    name: "Khushi",
    position: "Vice-President",
    imageUrl: khushi,
    quote: [
      "Being the Vice President of this club is not just a role, it's a भावना (emotion) close to my heart.",
      "I believe true समाज सेवा (social service) starts with listening — to each other, to our communities, and to the बदलाव (change) we want to see.",
      "With every step, I aim to support our टीम (team) in creating meaningful projects that bring people together and uplift those in need.",
      "मेहनत (hard work), सहानुभूति (empathy), and निरंतर प्रयास (consistent effort) — these are the values I stand by.",
      "Let's continue to grow, support, and inspire — as one strong and united परिवार (family)."
    ]
  },
  {
    _id: 'akshama',
    name: "Akshama",
    position: "Event Management Head",
    imageUrl: akshama,
    quote: [
      "As the Event Management Head, I believe that every event is an opportunity — to bring people together, to spark conversations, and to celebrate the spirit of सेवा (service) and togetherness.",
      "Behind every successful आयोजन (event) is a team that works with दिल (heart), dedication, and determination. I'm proud to lead with those values at the core.",
      "From the tiniest detail to the biggest moment, I strive to make every कार्यक्रम (program) impactful, inclusive, and full of positive energy.",
      "सपने (dreams) take shape when passion meets planning — and that's exactly what I bring to the table, every single time."
    ]
  },
  {
    _id: 'anubha',
    name: "Anubha",
    position: "Social Media Head",
    imageUrl: khushi,
    quote: [
      "As the Social Media Head, I see every post, story, and caption as a chance to connect, inspire, and spread our सोच (vision) to a wider audience.",
      "Social media isn't just about content — it's about भावना (emotion), impact, and community. My goal is to ensure that our काम (work), events, and ideas reach लोगों तक (people far and wide) with authenticity and creativity.",
      "Through visuals, words, and reels, I strive to highlight the जुनून (passion) and efforts behind everything we do.",
      "In this digital age, our mission deserves a digital heartbeat — and I'm proud to be the one keeping it alive."
    ]
  }
];

const Team = () => {
  const [index, setIndex] = useState(0);
  const [teamMembers, setTeamMembers] = useState(fallbackMembers);

  useEffect(() => {
    document.title = 'Our Team | Ek-Prayass';
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    fetchTeam();

    return () => {
      clearInterval(interval);
      document.title = 'Ek Prayass';
    };
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE}/team`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setTeamMembers(data);
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
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black text-teal-500 mb-6 drop-shadow-lg">
              OUR TEAM
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-lg"></div>
          </div>
          <p className="text-gray-600 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate individuals driving positive change in our community
          </p>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        <div className="mt-20 mb-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-cyan-100">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <h2 className="text-4xl font-bold text-center text-white drop-shadow-lg">
                Our Team Together
              </h2>
            </div>

            <div className="p-8">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-100 to-teal-100 aspect-video shadow-inner">
                <img 
                  src={images[index]} 
                  alt={`Ek-Prayass team group photo ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-xl text-gray-600 italic font-medium">
                  "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved."
                </p>
                <div className="flex justify-center mt-4">
                  <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, idx) => (
            <div key={member._id || idx} className="group">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-200">
                <div className="p-8 pb-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-lg">
                        <img 
                          src={member.imageUrl || member.image} 
                          alt={`${member.name} - ${member.position} of Ek-Prayass`}
                          className="w-full h-full object-cover rounded-full bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h2>
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-100 to-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                        {member.position}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-cyan-50 rounded-2xl p-6 relative">
                    <div className="absolute top-4 left-4 text-4xl text-cyan-300 font-serif">"</div>
                    <div className="space-y-3 pt-4">
                      {(member.quote || []).map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-gray-700 leading-relaxed text-sm">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4 text-4xl text-cyan-300 font-serif rotate-180">"</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 -translate-x-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-16 translate-x-16"></div>

            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6 drop-shadow-lg">
                Join Our Mission
              </h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
                Together, we can create meaningful change in our community. Every voice matters, every action counts.
              </p>
              <Link to="/volunteer">
                <button className="bg-white text-teal-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-cyan-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
                  Get Involved
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
