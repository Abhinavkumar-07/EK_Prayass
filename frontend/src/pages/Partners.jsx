import React, { useState, useEffect } from 'react';
import { Handshake, Globe, Mail, Phone, Star, Award, Trophy, Send } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const tierConfig = {
  Gold: { icon: Trophy, gradient: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-800' },
  Silver: { icon: Award, gradient: 'from-gray-400 to-slate-500', bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-700' },
  Bronze: { icon: Star, gradient: 'from-orange-400 to-amber-600', bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' }
};

const Partners = () => {
  const [sponsors, setSponsors] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', organization: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    document.title = 'Partner with Us | Ek-Prayass';
    fetchSponsors();
    return () => { document.title = 'Ek Prayass'; };
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await fetch(`${API_BASE}/sponsors`);
      const data = await res.json();
      setSponsors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching sponsors:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    // For now, just show a success message. Can be connected to a backend endpoint later.
    setTimeout(() => {
      setFormStatus('sent');
      setContactForm({ name: '', email: '', organization: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
  };

  const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'Silver');
  const bronzeSponsors = sponsors.filter(s => s.tier === 'Bronze');

  const inputClass = "w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-teal-50 px-5 py-2.5 rounded-full text-sm font-medium text-teal-700 border border-cyan-200 mb-6">
            <Handshake className="w-4 h-4" />
            Partnerships & Sponsorships
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent mb-6">
            Partner with Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Join hands with Ek-Prayass to amplify social impact. Your support powers health awareness campaigns,
            education initiatives, and community-driven change.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-cyan-100">
              <div className="text-3xl font-black bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-2">100+</div>
              <p className="text-gray-600 text-sm font-medium">Community Members</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-cyan-100">
              <div className="text-3xl font-black bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-2">25+</div>
              <p className="text-gray-600 text-sm font-medium">Projects Completed</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-cyan-100">
              <div className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent mb-2">15+</div>
              <p className="text-gray-600 text-sm font-medium">Communities Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sponsorship Tiers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose a tier that fits your vision of community partnership</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Gold', 'Silver', 'Bronze'].map(tier => {
            const config = tierConfig[tier];
            const TierIcon = config.icon;
            return (
              <div key={tier} className={`relative group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${config.border} hover:scale-105`}>
                <div className={`bg-gradient-to-r ${config.gradient} p-6 text-center`}>
                  <TierIcon className="w-10 h-10 text-white mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">{tier} Partner</h3>
                </div>
                <div className="p-6 space-y-3">
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}></div>
                      Logo on website & event materials
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}></div>
                      Social media recognition
                    </li>
                    {tier === 'Gold' && (
                      <>
                        <li className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}></div>
                          Featured in newsletter & annual report
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}></div>
                          Exclusive event naming rights
                        </li>
                      </>
                    )}
                    {tier === 'Silver' && (
                      <li className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}></div>
                        Featured in newsletter
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Sponsors */}
      {sponsors.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Partners</h2>
            <p className="text-gray-600">Organizations making a difference alongside Ek-Prayass</p>
          </div>

          {[
            { tier: 'Gold', list: goldSponsors },
            { tier: 'Silver', list: silverSponsors },
            { tier: 'Bronze', list: bronzeSponsors }
          ].filter(g => g.list.length > 0).map(group => {
            const config = tierConfig[group.tier];
            return (
              <div key={group.tier} className="mb-12">
                <h3 className={`text-xl font-bold ${config.text} mb-6 flex items-center gap-2`}>
                  <config.icon className="w-5 h-5" />
                  {group.tier} Partners
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.list.map(s => (
                    <div key={s._id} className={`${config.bg} rounded-2xl p-6 border ${config.border} hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-center gap-4 mb-3">
                        {s.logoUrl ? (
                          <img src={s.logoUrl} alt={`${s.name} logo`} className="w-14 h-14 rounded-xl object-contain bg-white border border-gray-200 p-1" />
                        ) : (
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white font-bold text-xl`}>
                            {s.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-800">{s.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${config.badge}`}>{group.tier}</span>
                        </div>
                      </div>
                      {s.description && <p className="text-gray-600 text-sm mb-3">{s.description}</p>}
                      {s.website && (
                        <a href={s.website} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors">
                          <Globe className="w-3 h-3" /> Visit Website
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contact / Partner Form */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl border border-cyan-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-8 text-center">
            <Handshake className="w-12 h-12 text-white mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-white">Become a Partner</h2>
            <p className="text-cyan-100 mt-2">Reach out and let's create impact together</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">Your Name <span className="text-red-500">*</span></label>
                <input type="text" value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="Full name" className={inputClass} required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">Email <span className="text-red-500">*</span></label>
                <input type="email" value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="your@email.com" className={inputClass} required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">Organization <span className="text-gray-400 text-xs">(Optional)</span></label>
              <input type="text" value={contactForm.organization}
                onChange={(e) => setContactForm({...contactForm, organization: e.target.value})}
                placeholder="Company or organization name" className={inputClass} />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">Message <span className="text-red-500">*</span></label>
              <textarea value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows="4" placeholder="Tell us about your partnership interests..."
                className={inputClass + ' resize-none'} required />
            </div>
            <div className="text-center">
              <button type="submit" disabled={formStatus === 'sending'}
                className="px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 flex items-center gap-2 mx-auto">
                <Send className="w-5 h-5" />
                {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Sent! ✓' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Direct Contact */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl p-10 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Prefer to reach out directly?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="mailto:ekprayass@gmail.com" className="flex items-center gap-2 text-cyan-100 hover:text-white transition-colors font-medium">
              <Mail className="w-5 h-5" /> ekprayass@gmail.com
            </a>
            <a href="https://instagram.com/club_ekprayass" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-100 hover:text-white transition-colors font-medium">
              <Globe className="w-5 h-5" /> @club_ekprayass
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
