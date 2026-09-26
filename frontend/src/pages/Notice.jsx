import React, { useState, useEffect } from 'react';
import { Bell, User, Calendar } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
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
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>Announcements & Circulars</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Notice <span className="italic font-normal">Board.</span>
          </h1>

          <p className="text-[#666666] text-base sm:text-lg font-light max-w-xl mx-auto">
            Stay informed with official circulars, event dates, and volunteer announcements.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card-orenda p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#4a1c00]/20 border-t-[#4a1c00] rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-[#737373]">Loading notices...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && notices.length === 0 ? (
          <div className="card-orenda p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f8f4ec] text-[#4a1c00] flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1c1917]">No Active Notices</h3>
            <p className="text-sm text-[#737373] font-light">
              Check back soon for new announcements regarding upcoming drives.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div 
                key={notice._id}
                className="card-orenda p-8 space-y-4 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-bold text-[#1c1917] group-hover:text-[#4a1c00] transition-colors">
                    {notice.title}
                  </h3>
                  <span className="text-xs font-medium text-[#737373] bg-[#f8f4ec] px-3 py-1 rounded-full whitespace-nowrap">
                    Official Notice
                  </span>
                </div>

                <p className="text-[#666666] text-base font-light leading-relaxed">
                  {notice.message}
                </p>

                <div className="pt-4 border-t border-black/5 flex flex-wrap items-center gap-4 text-xs text-[#737373]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#4a1c00]" />
                    <span>Posted by {notice.postedBy}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#4a1c00]" />
                    <span>{new Date(notice.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Notice;
