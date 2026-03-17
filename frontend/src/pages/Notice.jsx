import React, { useState, useEffect } from 'react';
import { Bell, User, Calendar } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Notices | Ek-Prayass';
    fetchNotices();
    return () => { document.title = 'Ek Prayass'; };
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-2xl shadow-lg mb-4">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Notice Board</h1>
          <p className="text-gray-500">Stay updated with the latest announcements from Ek-Prayass</p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Notice Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">All Notices</h2>
            <span className="bg-cyan-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
              {notices.length}
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Loading notices...</p>
          </div>
        )}

        {/* Notices List */}
        {!loading && notices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-cyan-200">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No notices yet</p>
            <p className="text-gray-400">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white rounded-xl shadow-lg border border-cyan-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{notice.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{notice.message}</p>

                  <div className="flex items-center text-sm text-gray-500 bg-cyan-50 p-3 rounded-lg">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">Posted by {notice.postedBy}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(notice.date).toLocaleString()}</span>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
