import React, { useState, useEffect } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import assets properly so Vite handles them
import heroImage from '../assets/new.jpeg';
import circleImage from '../assets/O.jpeg';
import videoSrc from '../assets/vi.mp4';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 pt-16 pb-24">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-300/20 blur-[100px] rounded-full mix-blend-multiply animate-float pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-300/20 blur-[100px] rounded-full mix-blend-multiply animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 lg:px-12 gap-16">
        
        {/* Left Content Area (Text & CTA) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-[2rem] rounded-tr-xl rounded-bl-xl text-sm font-semibold text-teal-700 border border-teal-100 shadow-sm shadow-teal-500/10 hover:shadow-md hover:bg-white/80 transition-all cursor-default transform hover:-translate-y-1">
             <Sparkles className="w-4 h-4 text-cyan-500" />
             <span className="tracking-wide uppercase text-xs">Youth-Led Initiative</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tighter text-slate-800">
            Changing Lives <br className="hidden lg:block" /> Through
            <span className="block mt-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent pb-2">
              Awareness.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
            Ek-Prayass empowers communities through innovative social and health awareness campaigns, creating lasting positive impact one person at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-4 items-center justify-center lg:justify-start">
             <Link to="/about" className="w-full sm:w-auto">
              <button className="group relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-[2rem] rounded-tr-xl rounded-bl-xl px-8 py-4 w-full flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 hover:rotate-1 transition-all duration-300">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Know More
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
             </Link>
             
             <button
               onClick={openVideo}
               className="group relative bg-white border border-slate-200 text-slate-700 hover:text-teal-700 font-semibold rounded-[2rem] rounded-tl-xl rounded-br-xl px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-3 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:-rotate-1"
             >
                <div className="w-10 h-10 bg-gradient-to-tr from-teal-100 to-cyan-50 rounded-[1rem] rounded-bl-md rounded-tr-md flex items-center justify-center group-hover:scale-110 group-hover:from-teal-500 group-hover:to-cyan-500 transition-all duration-300">
                  <Play className="w-4 h-4 text-teal-600 group-hover:text-white ml-1 transition-colors" fill="currentColor" />
                </div>
                <span>Watch Story</span>
             </button>
          </div>
        </div>

        {/* Right Content Area (Images & Graphics) */}
        <div className="w-full lg:w-1/2 relative animate-fade-in pl-4 sm:pl-8 lg:pl-0 mt-10 lg:mt-0" style={{ animationDelay: '0.2s' }}>
          <div className="relative max-w-md mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 transition-transform duration-500 hover:scale-[1.02] group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img src={heroImage} alt="Volunteer making an impact" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          
          {/* Floating Avatar Graph */}
          <div className="absolute -top-6 -left-4 sm:-left-8 lg:-left-12 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white p-2 shadow-xl shadow-slate-900/5 rotate-[-6deg] animate-float glass pointer-events-none" style={{ animationDelay: '1s' }}>
            <img src={circleImage} alt="Community Circle" className="w-full h-full object-cover rounded-xl" />
          </div>

          {/* Floating Stat Card */}
           <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl shadow-slate-900/10 border border-white/50 animate-float" style={{ animationDelay: '2.5s' }}>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-600" />
                 </div>
                 <div>
                    <p className="text-3xl font-display font-bold text-slate-800">5k+</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lives Impacted</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 animate-fade-in-up">
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video bg-black">
              <video src={videoSrc} controls autoPlay className="w-full h-full" />
            </div>

            <div className="bg-slate-900 border-t border-slate-800 p-6 text-center">
              <h3 className="text-2xl font-display font-semibold text-white mb-2">Our Journey of Impact</h3>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                Discover how Ek-Prayass is transforming communities through awareness and action.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={closeVideo} />
        </div>
      )}
    </>
  );
};

export default Home;
