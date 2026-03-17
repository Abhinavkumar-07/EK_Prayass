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
    <section className="flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left text-gray-900">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-teal-50 px-4 py-2 rounded-full text-sm font-medium text-teal-700 border border-cyan-200">
              <Sparkles className="w-4 h-4" />
              Youth-Led Initiative
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
              Changing Lives Through
              <span className="block bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent animate-pulse">
                Awareness
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Ek-Prayass empowers communities through innovative social and health awareness campaigns, creating lasting impact one person at a time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-3 items-center justify-center lg:justify-start">
            <Link to="/about">
              <button
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition-all duration-300 rounded-xl p-3 text-white font-semibold flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg"
              >
                Know more
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
            <button
              onClick={openVideo}
              className="bg-white text-teal-600 border-2 border-teal-400 hover:scale-105 transition-all duration-300 rounded-xl font-medium p-3 flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-teal-50"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
              </div>
              Play Video
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-sm mx-auto lg:max-w-md">
          <img src={heroImage} alt="Main" className="w-full rounded-3xl rounded-tl-[60px] shadow-md" />
          <img
            src={circleImage}
            alt="Circle"
            className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 sm:border-4 border-white shadow-lg object-cover"
          />
          {/* bottom right part */}
          <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-16 h-12 sm:w-20 sm:h-16 rounded-s-2xl border-2 sm:border-4 border-white bg-white" />
        </div>
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">Our Journey of Impact</h3>
              <p className="text-gray-300 text-sm">
                Discover how Ek-Pryass is transforming communities through awareness and action
              </p>
            </div>
          </div>

          <div className="absolute inset-0 -z-10" onClick={closeVideo} />
        </div>
      )}
    </section>
  );
};

export default Home;
