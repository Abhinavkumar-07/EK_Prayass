import React, { useState, useEffect } from 'react';
import { Calendar, Bell, LogOut, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.jpg';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const DonutChart = ({ percentage, color, label }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((percentage || 0) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="40" cy="40" />
          <circle
            className={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-black text-slate-700">{percentage || 0}%</span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center leading-tight w-20">{label}</span>
    </div>
  );
};

const ClubMemberDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('memberToken'));
  const [memberProfile, setMemberProfile] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile, events, notices

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchAllMembers();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/clubmember/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMemberProfile(data);
      } else {
        // Token invalid or expired
        handleLogout();
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchAllMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/clubmember/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAllMembers(data);
      }
    } catch (err) {
      console.error('Error fetching all members:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/clubmember/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Login failed.');
      }
      const data = await res.json();
      localStorage.setItem('memberToken', data.token);
      setToken(data.token);
      setMemberProfile(data.member);
      setLoginForm({ username: '', password: '' });
    } catch (err) {
      alert(err.message || 'Login failed. Check your credentials.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('memberToken');
    setToken(null);
    setMemberProfile(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <Link to="/" className="mb-8">
          <img src={logo} alt="Ek-Prayas" className="h-20 w-auto rounded-full" />
        </Link>
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Member Portal</h2>
            <p className="text-slate-500 mt-2">Sign in to access your dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Enter your member ID"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!memberProfile) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Member Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img src={logo} alt="Ek-Prayas" className="h-10 w-auto rounded-full" />
              </Link>
              <span className="font-bold text-slate-800 hidden sm:block border-l pl-3 border-slate-200">Member Portal</span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-4">
              <button 
                onClick={() => setActiveTab('events')}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'events' ? 'bg-cyan-50 text-cyan-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Events Planned</span>
              </button>
              <button 
                onClick={() => setActiveTab('notices')}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'notices' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notices</span>
              </button>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Directory */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Club Members Directory</h2>
              <p className="text-slate-500">Welcome, {memberProfile.name}! View all club members below.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {allMembers.map(member => (
                <div key={member._id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden transform transition-all hover:shadow-md flex flex-col">
                  <div className="p-8 flex flex-col items-center gap-6">
                    
                    {/* Profile Image with Cyan ring */}
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-cyan-100 shadow-inner">
                        {member.imageUrl ? (
                          <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center text-cyan-600 text-5xl font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-grow text-center space-y-4 w-full">
                      <div>
                        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2 flex-wrap">
                          {member.name}
                          {memberProfile._id === member._id && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">You</span>
                          )}
                        </h1>
                        <div className="inline-block mt-3 px-4 py-1.5 bg-cyan-50 text-cyan-700 font-semibold text-sm rounded-full border border-cyan-100">
                          {member.role}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-6 flex justify-center gap-6 w-full">
                        <DonutChart percentage={member.meetingAttendance} color="text-blue-500" label="Meeting" />
                        <DonutChart percentage={member.eventAttendance} color="text-purple-500" label="Event" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Lower section of the card */}
                  <div className="border-t border-slate-100 bg-slate-50/50 p-6 flex-grow">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Assigned Events
                  </h3>
                  {member.events && member.events.length > 0 ? (
                    <ul className="space-y-3">
                      {member.events.map((evt, idx) => (
                        <li key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                          <span className="font-medium text-slate-700">{evt.title || evt}</span>
                          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full">Assigned</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 italic">No events assigned yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder for Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Events Planned for Future</h2>
            <p className="text-slate-600">This section will list upcoming club-wide events and internal schedules.</p>
            <button onClick={() => setActiveTab('profile')} className="mt-4 text-cyan-600 font-medium hover:underline">← Back to Profile</button>
          </div>
        )}

        {/* Placeholder for Notices Tab */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Internal Notices</h2>
            <p className="text-slate-600">Important announcements and documents for club members will appear here.</p>
            <button onClick={() => setActiveTab('profile')} className="mt-4 text-cyan-600 font-medium hover:underline">← Back to Profile</button>
          </div>
        )}

      </main>
    </div>
  );
};

export default ClubMemberDashboard;
