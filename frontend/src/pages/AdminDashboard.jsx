import React, { useState, useEffect } from 'react';
import { Shield, LogOut, Bell, Users, FolderOpen, UserCircle, Handshake, Plus, Trash2, Edit3, Save, X, Eye, ChevronDown } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('notices');
  const [loading, setLoading] = useState(false);

  // Data states
  const [notices, setNotices] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  // Form states
  const [noticeForm, setNoticeForm] = useState({ title: '', message: '', postedBy: 'Admin' });
  const [sponsorForm, setSponsorForm] = useState({ name: '', logoUrl: '', website: '', tier: 'Bronze', description: '' });
  const [projectForm, setProjectForm] = useState({ title: '', tagline: '', description: '', images: '', videoUrl: '', colorScheme: 'cyan', order: 0 });
  const [teamForm, setTeamForm] = useState({ name: '', position: '', imageUrl: '', quote: '', order: 0 });

  const [editingId, setEditingId] = useState(null);
  const [editingType, setEditingType] = useState(null);

  // Verify token on mount
  useEffect(() => {
    if (token) verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        localStorage.removeItem('adminToken');
        setToken('');
      }
    } catch {
      localStorage.removeItem('adminToken');
      setToken('');
    }
  };

  // Fetch data when tab changes
  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [activeTab, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'notices': {
          const res = await fetch(`${API_BASE}/notices`);
          const data = await res.json();
          setNotices(Array.isArray(data) ? data : []);
          break;
        }
        case 'volunteers': {
          const res = await fetch(`${API_BASE}/volunteers`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          setVolunteers(Array.isArray(data) ? data : []);
          break;
        }
        case 'projects': {
          const res = await fetch(`${API_BASE}/projects`);
          const data = await res.json();
          setProjects(Array.isArray(data) ? data : []);
          break;
        }
        case 'team': {
          const res = await fetch(`${API_BASE}/team`);
          const data = await res.json();
          setTeamMembers(Array.isArray(data) ? data : []);
          break;
        }
        case 'sponsors': {
          const res = await fetch(`${API_BASE}/sponsors`);
          const data = await res.json();
          setSponsors(Array.isArray(data) ? data : []);
          break;
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setLoginForm({ username: '', password: '' });
    } catch {
      alert('Login failed. Check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  // Generic delete
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchData();
    } catch {
      alert(`Error deleting ${type}`);
    }
  };

  // Notice CRUD
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_BASE}/notices/${editingId}` : `${API_BASE}/notices`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(noticeForm)
      });
      if (!res.ok) throw new Error('Failed');
      setNoticeForm({ title: '', message: '', postedBy: 'Admin' });
      setEditingId(null);
      setEditingType(null);
      fetchData();
    } catch {
      alert('Error saving notice');
    }
  };

  // Sponsor CRUD
  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_BASE}/sponsors/${editingId}` : `${API_BASE}/sponsors`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(sponsorForm)
      });
      if (!res.ok) throw new Error('Failed');
      setSponsorForm({ name: '', logoUrl: '', website: '', tier: 'Bronze', description: '' });
      setEditingId(null);
      setEditingType(null);
      fetchData();
    } catch {
      alert('Error saving sponsor');
    }
  };

  // Project CRUD
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_BASE}/projects/${editingId}` : `${API_BASE}/projects`;
      const payload = {
        ...projectForm,
        images: projectForm.images ? projectForm.images.split(',').map(s => s.trim()) : [],
        order: Number(projectForm.order)
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed');
      setProjectForm({ title: '', tagline: '', description: '', images: '', videoUrl: '', colorScheme: 'cyan', order: 0 });
      setEditingId(null);
      setEditingType(null);
      fetchData();
    } catch {
      alert('Error saving project');
    }
  };

  // Team CRUD
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_BASE}/team/${editingId}` : `${API_BASE}/team`;
      const payload = {
        ...teamForm,
        quote: teamForm.quote ? teamForm.quote.split('\n').filter(s => s.trim()) : [],
        order: Number(teamForm.order)
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed');
      setTeamForm({ name: '', position: '', imageUrl: '', quote: '', order: 0 });
      setEditingId(null);
      setEditingType(null);
      fetchData();
    } catch {
      alert('Error saving team member');
    }
  };

  // Volunteer status update
  const handleVolunteerStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/volunteers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed');
      fetchData();
    } catch {
      alert('Error updating status');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingType(null);
    setNoticeForm({ title: '', message: '', postedBy: 'Admin' });
    setSponsorForm({ name: '', logoUrl: '', website: '', tier: 'Bronze', description: '' });
    setProjectForm({ title: '', tagline: '', description: '', images: '', videoUrl: '', colorScheme: 'cyan', order: 0 });
    setTeamForm({ name: '', position: '', imageUrl: '', quote: '', order: 0 });
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-2xl mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Ek-Prayass Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  placeholder="Enter admin username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD
  const tabs = [
    { key: 'notices', label: 'Notices', icon: Bell },
    { key: 'volunteers', label: 'Volunteers', icon: Users },
    { key: 'projects', label: 'Projects', icon: FolderOpen },
    { key: 'team', label: 'Team', icon: UserCircle },
    { key: 'sponsors', label: 'Sponsors', icon: Handshake }
  ];

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  const tierColors = {
    Gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Silver: 'bg-gray-100 text-gray-700 border-gray-300',
    Bronze: 'bg-orange-100 text-orange-800 border-orange-300'
  };

  const inputClass = "w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-gray-700 bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-md border border-cyan-100">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); cancelEdit(); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-cyan-50 hover:text-teal-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {/* NOTICES TAB */}
        {!loading && activeTab === 'notices' && (
          <div className="space-y-6">
            <form onSubmit={handleNoticeSubmit} className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-500" />
                {editingId ? 'Edit Notice' : 'Create Notice'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Title</label>
                  <input type="text" value={noticeForm.title} onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Posted By</label>
                  <input type="text" value={noticeForm.postedBy} onChange={(e) => setNoticeForm({...noticeForm, postedBy: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div className="mb-4">
                <label className={labelClass}>Message</label>
                <textarea value={noticeForm.message} onChange={(e) => setNoticeForm({...noticeForm, message: e.target.value})} rows="3" className={inputClass + ' resize-none'} required />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md flex items-center gap-2">
                  <Save className="w-4 h-4" />{editingId ? 'Update' : 'Post'}
                </button>
                {editingId && <button type="button" onClick={cancelEdit} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all flex items-center gap-2"><X className="w-4 h-4" />Cancel</button>}
              </div>
            </form>

            <div className="space-y-3">
              {notices.map(n => (
                <div key={n._id} className="bg-white rounded-xl shadow-sm border border-cyan-100 p-5 flex justify-between items-start hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{n.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-2">By {n.postedBy} • {new Date(n.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingId(n._id); setEditingType('notice'); setNoticeForm({ title: n.title, message: n.message, postedBy: n.postedBy }); }} className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('notices', n._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {notices.length === 0 && <p className="text-center text-gray-400 py-8">No notices yet.</p>}
            </div>
          </div>
        )}

        {/* VOLUNTEERS TAB */}
        {!loading && activeTab === 'volunteers' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-500" />
              Volunteer Applications ({volunteers.length})
            </h2>
            {volunteers.map(v => (
              <div key={v._id} className="bg-white rounded-xl shadow-sm border border-cyan-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{v.fullName}</h3>
                    <p className="text-sm text-gray-500">{v.email} {v.phone && `• ${v.phone}`}</p>
                    {v.purpose && <span className="inline-block mt-1 px-3 py-1 bg-cyan-100 text-teal-700 text-xs font-semibold rounded-full">{v.purpose}</span>}
                    {v.volunteerRole && <span className="inline-block mt-1 ml-2 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">{v.volunteerRole}</span>}
                    {v.message && <p className="text-gray-600 text-sm mt-2 italic">"{v.message}"</p>}
                    <p className="text-xs text-gray-400 mt-2">{new Date(v.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={v.status}
                      onChange={(e) => handleVolunteerStatus(v._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${statusColors[v.status] || 'bg-gray-100 text-gray-600'}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button onClick={() => handleDelete('volunteers', v._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
            {volunteers.length === 0 && <p className="text-center text-gray-400 py-8">No volunteer applications yet.</p>}
          </div>
        )}

        {/* PROJECTS TAB */}
        {!loading && activeTab === 'projects' && (
          <div className="space-y-6">
            <form onSubmit={handleProjectSubmit} className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-500" />
                {editingId ? 'Edit Project' : 'Add Project'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelClass}>Title</label><input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className={inputClass} required /></div>
                <div><label className={labelClass}>Tagline</label><input type="text" value={projectForm.tagline} onChange={(e) => setProjectForm({...projectForm, tagline: e.target.value})} className={inputClass} /></div>
              </div>
              <div className="mb-4"><label className={labelClass}>Description</label><textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} rows="3" className={inputClass + ' resize-none'} required /></div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><label className={labelClass}>Images (comma-separated URLs)</label><input type="text" value={projectForm.images} onChange={(e) => setProjectForm({...projectForm, images: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Video URL</label><input type="text" value={projectForm.videoUrl} onChange={(e) => setProjectForm({...projectForm, videoUrl: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Color Scheme</label>
                  <select value={projectForm.colorScheme} onChange={(e) => setProjectForm({...projectForm, colorScheme: e.target.value})} className={inputClass}>
                    <option value="cyan">Cyan</option><option value="teal">Teal</option><option value="green">Green</option><option value="pink">Pink</option><option value="purple">Purple</option><option value="sky">Sky</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md flex items-center gap-2"><Save className="w-4 h-4" />{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={cancelEdit} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all flex items-center gap-2"><X className="w-4 h-4" />Cancel</button>}
              </div>
            </form>
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p._id} className="bg-white rounded-xl shadow-sm border border-cyan-100 p-5 flex justify-between items-start hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{p.title}</h3>
                    {p.tagline && <p className="text-teal-600 text-sm italic">{p.tagline}</p>}
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingId(p._id); setProjectForm({ title: p.title, tagline: p.tagline || '', description: p.description, images: (p.images || []).join(', '), videoUrl: p.videoUrl || '', colorScheme: p.colorScheme || 'cyan', order: p.order || 0 }); }} className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('projects', p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-center text-gray-400 py-8">No projects yet. Projects page will use hardcoded data as fallback.</p>}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {!loading && activeTab === 'team' && (
          <div className="space-y-6">
            <form onSubmit={handleTeamSubmit} className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-500" />
                {editingId ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><label className={labelClass}>Name</label><input type="text" value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} className={inputClass} required /></div>
                <div><label className={labelClass}>Position</label><input type="text" value={teamForm.position} onChange={(e) => setTeamForm({...teamForm, position: e.target.value})} className={inputClass} required /></div>
                <div><label className={labelClass}>Image URL</label><input type="text" value={teamForm.imageUrl} onChange={(e) => setTeamForm({...teamForm, imageUrl: e.target.value})} className={inputClass} /></div>
              </div>
              <div className="mb-4"><label className={labelClass}>Quote (one paragraph per line)</label><textarea value={teamForm.quote} onChange={(e) => setTeamForm({...teamForm, quote: e.target.value})} rows="4" className={inputClass + ' resize-none'} /></div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md flex items-center gap-2"><Save className="w-4 h-4" />{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={cancelEdit} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all flex items-center gap-2"><X className="w-4 h-4" />Cancel</button>}
              </div>
            </form>
            <div className="space-y-3">
              {teamMembers.map(m => (
                <div key={m._id} className="bg-white rounded-xl shadow-sm border border-cyan-100 p-5 flex justify-between items-start hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 flex-1">
                    {m.imageUrl && <img src={m.imageUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover border-2 border-teal-300" />}
                    <div>
                      <h3 className="font-bold text-gray-800">{m.name}</h3>
                      <p className="text-teal-600 text-sm">{m.position}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingId(m._id); setTeamForm({ name: m.name, position: m.position, imageUrl: m.imageUrl || '', quote: (m.quote || []).join('\n'), order: m.order || 0 }); }} className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('team', m._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {teamMembers.length === 0 && <p className="text-center text-gray-400 py-8">No team members yet. Team page will use hardcoded data as fallback.</p>}
            </div>
          </div>
        )}

        {/* SPONSORS TAB */}
        {!loading && activeTab === 'sponsors' && (
          <div className="space-y-6">
            <form onSubmit={handleSponsorSubmit} className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-500" />
                {editingId ? 'Edit Sponsor' : 'Add Sponsor'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelClass}>Name</label><input type="text" value={sponsorForm.name} onChange={(e) => setSponsorForm({...sponsorForm, name: e.target.value})} className={inputClass} required /></div>
                <div><label className={labelClass}>Website</label><input type="url" value={sponsorForm.website} onChange={(e) => setSponsorForm({...sponsorForm, website: e.target.value})} className={inputClass} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelClass}>Logo URL</label><input type="text" value={sponsorForm.logoUrl} onChange={(e) => setSponsorForm({...sponsorForm, logoUrl: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Tier</label>
                  <select value={sponsorForm.tier} onChange={(e) => setSponsorForm({...sponsorForm, tier: e.target.value})} className={inputClass}>
                    <option value="Gold">Gold</option><option value="Silver">Silver</option><option value="Bronze">Bronze</option>
                  </select>
                </div>
              </div>
              <div className="mb-4"><label className={labelClass}>Description</label><textarea value={sponsorForm.description} onChange={(e) => setSponsorForm({...sponsorForm, description: e.target.value})} rows="2" className={inputClass + ' resize-none'} /></div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md flex items-center gap-2"><Save className="w-4 h-4" />{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={cancelEdit} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all flex items-center gap-2"><X className="w-4 h-4" />Cancel</button>}
              </div>
            </form>
            <div className="space-y-3">
              {sponsors.map(s => (
                <div key={s._id} className="bg-white rounded-xl shadow-sm border border-cyan-100 p-5 flex justify-between items-start hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 flex-1">
                    {s.logoUrl && <img src={s.logoUrl} alt={s.name} className="w-12 h-12 rounded-lg object-contain border border-gray-200" />}
                    <div>
                      <h3 className="font-bold text-gray-800">{s.name}</h3>
                      <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full border ${tierColors[s.tier]}`}>{s.tier}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingId(s._id); setSponsorForm({ name: s.name, logoUrl: s.logoUrl || '', website: s.website || '', tier: s.tier, description: s.description || '' }); }} className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('sponsors', s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {sponsors.length === 0 && <p className="text-center text-gray-400 py-8">No sponsors yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
