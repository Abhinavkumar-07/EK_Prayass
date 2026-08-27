import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import videoSrc from '../assets/vi.mp4';  // Import your video file

const About = () => {
  useEffect(() => {
    document.title = 'About Us | Ek-Prayas';
    return () => { document.title = 'Ek-Prayas | Together, We Can Change Lives'; };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10 pt-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content Section */}
          <div className="space-y-10">
            <div className="relative">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-16 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-lg"></div>
                <span className="text-sm font-bold text-teal-600 uppercase tracking-widest bg-teal-100 px-4 py-2 rounded-full">
                  Know About Us
                </span>
              </div>
            </div>

            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-display font-black text-slate-800 leading-[1.1] tracking-tight">
                Empowering{' '}
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                    Change
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
                </span>
                <br />
                Through Community and{' '}
                <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Collaboration
                </span>
              </h1>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                  At the core of our club is a deep commitment to inspire, empower, and uplift. 
                  We unite passionate individuals eager to learn, collaborate, and raise awareness 
                  about important social issues that impact everyday lives.
                </p>
                
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                  Through impactful projects, community outreach, and ongoing support, we help 
                  people become more informed and proactive about their well-being. Together, 
                  we foster a vibrant environment where ideas thrive and collective action 
                  sparks real, lasting change.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/volunteer">
                <button className="group px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-[2rem] rounded-tr-xl rounded-bl-xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 hover:-rotate-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Join Our Community</span>
                </button>
              </Link>
              <Link to="/team">
                <button className="group px-10 py-4 border-2 border-teal-200 text-teal-600 font-bold text-lg rounded-[2rem] rounded-tl-xl rounded-br-xl shadow-lg hover:shadow-xl hover:border-cyan-300 hover:text-cyan-700 transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 transition-all duration-300 bg-white hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-200 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center group bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="text-4xl font-display font-black bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active Members
                </div>
              </div>
              <div className="text-center group bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="text-4xl font-display font-black bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Projects Completed
                </div>
              </div>
              <div className="text-center group bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="text-4xl font-display font-black bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Communities Served
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative animate-fade-in lg:mt-0 mt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-[3rem] blur-2xl opacity-20"></div>
            <div className="relative overflow-hidden rounded-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] shadow-2xl border border-white/50 bg-white/50 backdrop-blur-xl p-2 group transform rotate-[1deg] hover:rotate-0 transition-transform duration-500">
              <div className="relative rounded-[2.5rem] rounded-tr-xl rounded-bl-xl overflow-hidden bg-slate-900 aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-32 text-center pb-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-white/70 backdrop-blur-xl rounded-[3.5rem] rounded-tl-[2rem] rounded-br-[2rem] shadow-xl p-10 md:p-16 border border-white hover:shadow-2xl transition-all duration-300 ring-1 ring-slate-900/5">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-6 tracking-tight">
              Why Choose Our{' '}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Community?
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-10 mt-14">
              <div className="group bg-slate-50/80 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-cyan-100">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 -mt-14 ring-4 ring-white">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 font-display">Inclusive Community</h4>
                <p className="text-slate-600 font-light">A welcoming space for everyone to contribute and grow together.</p>
              </div>
              <div className="group bg-slate-50/80 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-cyan-100">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 -mt-14 ring-4 ring-white">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 font-display">Impactful Action</h4>
                <p className="text-slate-600 font-light">Real projects that create meaningful change in our communities.</p>
              </div>
              <div className="group bg-slate-50/80 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-cyan-100">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 -mt-14 ring-4 ring-white">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 font-display">Continuous Growth</h4>
                <p className="text-slate-600 font-light">Opportunities to learn, develop skills, and expand your impact.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
