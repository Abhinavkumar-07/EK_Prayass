import React, { useState, useEffect } from 'react';
import { Bell, User, Calendar } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchNotices();
    return () => {  };
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API_BASE}/notices`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotices(data);
      } else {
        setNotices([]);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
      setNotices([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-200/20 blur-[100px] rounded-full mix-blend-multiply pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 py-20 max-w-4xl relative z-10 animate-fade-in-up">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-white/70 backdrop-blur-md p-4 rounded-[1.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] shadow-lg shadow-cyan-900/5 border border-white mb-6 transform hover:scale-110 transition-transform duration-300 ring-1 ring-slate-900/5 rotate-[-2deg] hover:rotate-0">
            <Bell className="w-8 h-8 text-teal-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-slate-800 mb-4 tracking-tight">Notice <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">Board</span></h1>
          <p className="text-lg md:text-xl text-slate-600 font-light">Stay updated with the latest announcements from Ek-Prayas</p>
        </div>

        {/* Notice Count & Loading */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-[2rem] rounded-tl-xl rounded-br-xl border border-white shadow-sm w-full md:w-auto">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-[1rem] rounded-tr-md rounded-bl-md shadow-md">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 font-display">All Notices</h2>
            <span className="bg-cyan-100 text-teal-800 px-3 py-1 rounded-[1rem] rounded-bl-sm rounded-tr-sm text-sm font-bold shadow-inner">
              {notices.length}
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white shadow-xl">
            <div className="w-10 h-10 border-4 border-cyan-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Loading notices...</p>
          </div>
        )}

        {/* Notices List */}
        {!loading && notices.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-[3rem] shadow-xl border border-white ring-1 ring-slate-900/5">
            <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Bell className="w-10 h-10 text-cyan-300" />
            </div>
            <p className="text-slate-800 text-xl font-bold mb-2 font-display">No notices yet</p>
            <p className="text-slate-500 font-light">Check back soon for latest updates!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {notices.map((notice, idx) => (
              <div
                key={notice._id}
                className={`group bg-white/70 backdrop-blur-xl rounded-[2.5rem] rounded-tl-[1rem] rounded-br-[1rem] shadow-lg border border-white ring-1 ring-slate-900/5 overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up ${idx % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'} hover:rotate-0`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-100/50 to-teal-100/50 rounded-bl-[4rem] -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                    {notice.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-light text-lg">
                    {notice.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 bg-slate-50/80 p-4 rounded-2xl border border-slate-100 group-hover:bg-cyan-50/50 transition-colors duration-300">
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-teal-500" />
                        <span className="font-medium text-slate-700">Posted by {notice.postedBy}</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                        <span>{new Date(notice.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-cyan-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
