import React, { useState, useEffect } from 'react';
import { Handshake, Globe, Mail, Send, Award, Trophy, Star } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const tierConfig = {
  Gold: { icon: Trophy, badge: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]' },
  Silver: { icon: Award, badge: 'bg-[#f3f4f6] text-[#374151] border-[#e5e7eb]' },
  Bronze: { icon: Star, badge: 'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]' }
};

const Partners = () => {
  const [sponsors, setSponsors] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', organization: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    fetchSponsors();
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
    setTimeout(() => {
      setFormStatus('sent');
      setContactForm({ name: '', email: '', organization: '', message: '' });
      setTimeout(() => setFormStatus(''), 4000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5" />
            <span>Synergy for Good</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Our Partners & <br />
            <span className="italic font-normal">Collaborators.</span>
          </h1>

          <p className="text-[#666666] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            We partner with institutions, student organizations, and civic brands to scale impactful health awareness, book recycling, and humanitarian programs.
          </p>
        </div>

        {/* Existing Partners Showcase */}
        {sponsors.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-[#1c1917] text-center">Active Sponsors & Allies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map((sponsor, idx) => {
                const config = tierConfig[sponsor.tier] || tierConfig.Bronze;
                const Icon = config.icon;
                return (
                  <div key={idx} className="card-orenda p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${config.badge}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{sponsor.tier || 'Partner'}</span>
                      </span>
                    </div>
                    {sponsor.logo && (
                      <div className="h-24 flex items-center justify-center bg-[#f8f4ec] rounded-2xl p-3">
                        <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                    <h3 className="font-serif text-xl font-bold text-[#1c1917]">{sponsor.name}</h3>
                    <p className="text-xs text-[#666666] font-light leading-relaxed">{sponsor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Partnership Inquiry Form */}
        <div className="bg-white border border-black/8 rounded-[2.5rem] p-8 sm:p-14 shadow-sm max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#1c1917]">Collaborate With Us</h2>
            <p className="text-sm text-[#666666] font-light">
              Interested in co-hosting an awareness campaign or sponsoring our drives? Get in touch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Rahul Singh"
                  className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#4a1c00]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="rahul@organization.org"
                  className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#4a1c00]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1c1917]">Organization / College Name</label>
              <input
                type="text"
                required
                value={contactForm.organization}
                onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                placeholder="e.g. Student Council / Social Club"
                className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#4a1c00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1c1917]">Proposal / Message</label>
              <textarea
                rows={4}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Tell us about how we can collaborate..."
                className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#4a1c00] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="w-full btn-orenda-primary"
            >
              <span>{formStatus === 'sending' ? 'Sending...' : 'Send Partnership Request'}</span>
              <Send className="w-4 h-4 ml-2" />
            </button>

            {formStatus === 'sent' && (
              <p className="text-center text-xs text-emerald-600 font-medium">
                Thank you! We have received your partnership request and will connect with you soon.
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Partners;
