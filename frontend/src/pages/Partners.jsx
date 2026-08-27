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
    
    fetchSponsors();
    return () => {  };
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 px-4 pb-16 z-10 animate-fade-in-up">
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-6 py-3 rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] text-sm font-semibold text-teal-700 shadow-sm border border-cyan-100 mb-8 ring-1 ring-slate-900/5 hover:scale-105 transition-transform duration-300">
            <Handshake className="w-4 h-4 text-cyan-500" />
            Partnerships & Sponsorships
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-slate-800 mb-6 drop-shadow-sm">
            Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Join hands with Ek-Prayass to amplify social impact. Your support powers health awareness campaigns,
            education initiatives, and community-driven change.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 mb-8">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] rounded-tl-[1rem] rounded-br-[1rem] shadow-xl border border-white ring-1 ring-slate-900/5 group hover:shadow-cyan-900/10 hover:-translate-y-2 transition-all duration-500">
              <div className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 mb-3 group-hover:scale-110 transition-transform duration-300">100+</div>
              <p className="text-slate-600 font-medium tracking-wide">Community Members</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] shadow-xl border border-white ring-1 ring-slate-900/5 group hover:shadow-cyan-900/10 hover:-translate-y-2 transition-all duration-500">
              <div className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500 mb-3 group-hover:scale-110 transition-transform duration-300">25+</div>
              <p className="text-slate-600 font-medium tracking-wide">Projects Completed</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] rounded-tl-[1rem] rounded-br-[1rem] shadow-xl border border-white ring-1 ring-slate-900/5 group hover:shadow-cyan-900/10 hover:-translate-y-2 transition-all duration-500">
              <div className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500 mb-3 group-hover:scale-110 transition-transform duration-300">15+</div>
              <p className="text-slate-600 font-medium tracking-wide">Communities Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-5 tracking-tight">Sponsorship Tiers</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">Choose a tier that fits your vision of community partnership</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Gold', 'Silver', 'Bronze'].map((tier, idx) => {
            const config = tierConfig[tier];
            const TierIcon = config.icon;
            return (
              <div key={tier} className="group relative bg-white/70 backdrop-blur-xl rounded-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white ring-1 ring-slate-900/5 hover:-translate-y-2 flex flex-col h-full z-10">
                <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className={`bg-gradient-to-r ${config.gradient} p-8 text-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700"></div>
                  <TierIcon className="w-12 h-12 text-white mx-auto mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-3xl font-display font-bold text-white tracking-wide">{tier} Partner</h3>
                </div>
                <div className="p-8 space-y-4 flex-grow relative z-10">
                  <ul className="space-y-4 text-slate-600 text-base font-light">
                    <li className="flex items-start gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 bg-gradient-to-r ${config.gradient} flex-shrink-0 shadow-sm`}></div>
                      <span className="leading-relaxed">Logo on website & event materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 bg-gradient-to-r ${config.gradient} flex-shrink-0 shadow-sm`}></div>
                      <span className="leading-relaxed">Social media recognition</span>
                    </li>
                    {tier === 'Gold' && (
                      <>
                        <li className="flex items-start gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 bg-gradient-to-r ${config.gradient} flex-shrink-0 shadow-sm`}></div>
                          <span className="leading-relaxed">Featured in newsletter & annual report</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 bg-gradient-to-r ${config.gradient} flex-shrink-0 shadow-sm`}></div>
                          <span className="leading-relaxed">Exclusive event naming rights</span>
                        </li>
                      </>
                    )}
                    {tier === 'Silver' && (
                      <li className="flex items-start gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 bg-gradient-to-r ${config.gradient} flex-shrink-0 shadow-sm`}></div>
                        <span className="leading-relaxed">Featured in newsletter</span>
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-5 tracking-tight">Our Partners</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">Organizations making a positive difference alongside Ek-Prayass</p>
          </div>

          {[
            { tier: 'Gold', list: goldSponsors },
            { tier: 'Silver', list: silverSponsors },
            { tier: 'Bronze', list: bronzeSponsors }
          ].filter(g => g.list.length > 0).map(group => {
            const config = tierConfig[group.tier];
            return (
              <div key={group.tier} className="mb-16">
                <h3 className={`text-2xl font-display font-bold ${config.text} mb-8 flex items-center gap-3 bg-white/50 backdrop-blur-sm self-start inline-flex px-6 py-3 rounded-2xl border ${config.border} shadow-sm`}>
                  <config.icon className="w-6 h-6" />
                  {group.tier} Partners
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.list.map(s => (
                    <div key={s._id} className={`group bg-white/80 backdrop-blur-xl rounded-[2.5rem] rounded-tl-[1rem] rounded-br-[1rem] p-8 border ${config.border} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-slate-900/5`}>
                      <div className="flex flex-col gap-5 mb-4">
                        <div className="flex items-center justify-between">
                            {s.logoUrl ? (
                            <img src={s.logoUrl} alt={`${s.name} logo`} className="w-16 h-16 rounded-2xl object-contain bg-white border border-slate-100 p-1.5 shadow-sm group-hover:scale-105 transition-transform" />
                            ) : (
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-inner group-hover:scale-105 transition-transform`}>
                                {s.name.charAt(0)}
                            </div>
                            )}
                            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide self-start shadow-sm ${config.badge}`}>{group.tier}</span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-xl truncate">{s.name}</h4>
                        </div>
                      </div>
                      {s.description && <p className="text-slate-600 text-base font-light mb-5 line-clamp-3 leading-relaxed">{s.description}</p>}
                      {s.website && (
                        <a href={s.website} target="_blank" rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 font-medium hover:underline transition-colors ${config.text}`}>
                          <Globe className="w-4 h-4" /> Visit Website
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
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white overflow-hidden ring-1 ring-slate-900/5">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
                <Handshake className="w-16 h-16 text-white mx-auto mb-6 drop-shadow-md" />
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Become a Partner</h2>
                <p className="text-cyan-50 text-xl font-light mt-4 max-w-xl mx-auto">Reach out and let's create positive impact together.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-8 bg-white/50">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-slate-700 font-bold text-sm mb-2 ml-1">Your Name <span className="text-teal-500">*</span></label>
                <input type="text" value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="Full name" className={inputClass} required />
              </div>
              <div className="group">
                <label className="block text-slate-700 font-bold text-sm mb-2 ml-1">Email <span className="text-teal-500">*</span></label>
                <input type="email" value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="your@email.com" className={inputClass} required />
              </div>
            </div>
            <div className="group">
              <label className="block text-slate-700 font-bold text-sm mb-2 ml-1">Organization <span className="text-slate-400 font-light ml-2">(Optional)</span></label>
              <input type="text" value={contactForm.organization}
                onChange={(e) => setContactForm({...contactForm, organization: e.target.value})}
                placeholder="Company or organization name" className={inputClass} />
            </div>
            <div className="group">
              <label className="block text-slate-700 font-bold text-sm mb-2 ml-1">Message <span className="text-teal-500">*</span></label>
              <textarea value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows="5" placeholder="Tell us about your organization and how you'd like to partner..."
                className={inputClass + ' resize-none'} required />
            </div>
            <div className="text-center pt-4">
              <button type="submit" disabled={formStatus === 'sending'}
                className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto focus:ring-4 focus:ring-cyan-200 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-xl">
                <Send className={`w-5 h-5 ${formStatus === 'sending' ? 'animate-pulse' : formStatus === 'sent' ? 'animate-bounce' : ''}`} />
                {formStatus === 'sending' ? 'Sending Message...' : formStatus === 'sent' ? 'Message Sent Successfully ✓' : 'Send Partnership Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-32 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <h3 className="text-3xl font-display font-bold mb-8">Prefer to reach out directly?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-12">
            <a href="mailto:club_ekprayass@kiet.edu" className="flex items-center justify-center gap-3 text-cyan-50 hover:text-white transition-colors text-lg font-medium group/link">
              <div className="p-3 bg-white/10 rounded-full group-hover/link:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6" /> 
              </div>
              club_ekprayass@kiet.edu
            </a>
            <a href="https://instagram.com/club_ekprayass" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-cyan-50 hover:text-white transition-colors text-lg font-medium group/link">
              <div className="p-3 bg-white/10 rounded-full group-hover/link:bg-white/20 transition-colors">
                  <Globe className="w-6 h-6" /> 
              </div>
              @club_ekprayass
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
