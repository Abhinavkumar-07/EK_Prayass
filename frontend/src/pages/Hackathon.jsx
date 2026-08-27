import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowRight, Users, Clock, Trophy, Zap, Code, Lightbulb, Target, Shield, Star, MapPin, Calendar, ExternalLink } from 'lucide-react';

/* ──────────────────────────────────────────────
   AAVISHKAAR — Hackathon Landing Page
   TEMPORARY: Remove after October 2026
   ────────────────────────────────────────────── */

// ─── Countdown Hook ────────────────────────────
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
};

// ─── Intersection Observer Hook ────────────────
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, isInView];
};

// ─── Animated Section Wrapper ──────────────────
const Section = ({ children, className = '', id = '' }) => {
  const [ref, isInView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </section>
  );
};

// ─── FAQ Accordion Item ────────────────────────
const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-white font-semibold text-base md:text-lg pr-4 group-hover:text-amber-400 transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// ─── Data ──────────────────────────────────────
const REGISTER_URL = '#register'; // TEMPORARY: Replace with actual registration form URL

const EVENT_DATE = '2026-09-05T09:00:00+05:30';

const keyHighlights = [
  { icon: <Users className="w-6 h-6" />, title: '40 Max Teams', desc: 'Limited spots available for the most dedicated innovators.' },
  { icon: <Shield className="w-6 h-6" />, title: '6 Members / Team', desc: 'Exactly 6 members required, with at least 1 female member mandatory.' },
  { icon: <Trophy className="w-6 h-6" />, title: '₹5,000+ Prize Pool', desc: 'Win cash prizes and the chance for a direct entry to SIH National.' },
  { icon: <Target className="w-6 h-6" />, title: '2 Competition Rounds', desc: 'Internal Screening followed by Final Evaluation.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Registration Fee', desc: '₹250 per team. Affordable entry to massive opportunities.' },
  { icon: <Star className="w-6 h-6" />, title: 'SIH Inspired', desc: 'Top 3 teams get direct entry to the Smart India Hackathon (SIH) National.' },
];

const howItWorks = [
  { step: '01', title: 'Round 1: Internal Screening', desc: '5 September 2026. 40 Teams compete, only 10 will advance to the finals.' },
  { step: '02', title: 'Round 2: Final Evaluation', desc: '12 September 2026. The top 10 teams battle for the ultimate crown.' },
  { step: '03', title: 'Top 3 Teams', desc: 'The final winners claim the ₹5,000+ prize pool and direct entry to SIH National!' }
];

const timeline = [
  { date: 'Aug 20', label: 'Registration Opens', status: 'active' },
  { date: 'Sept 4', label: 'Registration Closes', status: 'upcoming' },
  { date: 'Sept 5', label: 'Round 1: Internal Screening', status: 'upcoming' },
  { date: 'Sept 10', label: 'Round 1 Results Announced', status: 'upcoming' },
  { date: 'Sept 12', label: 'Round 2: Final Evaluation', status: 'upcoming' },
  { date: 'Sept 12', label: 'Winner Announcement', status: 'upcoming' },
];

const rules = [
  'All participants must be students of KIET Deemed to be University.',
  'Inter-college or inter-school teams are not permitted.',
  'Teams may consist of students from different branches/departments/disciplines.',
  'Each team must consist of exactly 6 members, including the Team Leader.',
  'At least one female member is mandatory in every team.',
  'A student can be part of only one registered team.',
  'The Team Leader will be the primary point of contact.',
];

const faqs = [
  { q: 'Who can participate in Aavishkaar?', a: 'All participants must be students of KIET Deemed to be University. Inter-college or inter-school teams are not permitted.' },
  { q: 'What is the team size requirement?', a: 'Each team must consist of exactly 6 members, including the Team Leader. At least one female member is mandatory in every team.' },
  { q: 'Can I be in multiple teams?', a: 'No, a student can be part of only one registered team.' },
  { q: 'What are the thematic tracks?', a: 'The tracks are: Healthcare for All, Rural & Livelihood Empowerment, Women & Community Empowerment, Environment & Disaster Resilience, and Inclusive Society.' },
  { q: 'What do the winners get?', a: 'There is a prize pool of ₹5,000+, and the Top 3 teams get direct entry to the Smart India Hackathon (SIH) National.' },
];

const stats = [
  { number: '40', label: 'Max Teams' },
  { number: '₹5K+', label: 'Prize Pool' },
  { number: '2', label: 'Competition Rounds' },
  { number: '₹250', label: 'Fee / Team' },
];


// ─── Main Component ────────────────────────────
const Hackathon = () => {
  const countdown = useCountdown(EVENT_DATE);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    
    return () => {  };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-amber-400/30 selection:text-amber-200">

      {/* ════════════ HACKATHON NAVBAR ════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          <Link to="/" className="text-gray-400 text-sm hover:text-white transition-colors z-10">
            ← Ek-Prayas
          </Link>
          <span className="absolute left-1/2 -translate-x-1/2 font-display font-bold text-lg tracking-tight">
            <span className="text-amber-400">AAVISH</span>KAAR
          </span>
          <div className="hidden md:flex items-center gap-6 z-10">
            <a href="#about" className="text-gray-400 text-sm hover:text-white transition-colors">About</a>
            <a href="#timeline" className="text-gray-400 text-sm hover:text-white transition-colors">Timeline</a>
            <a href="#faq" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7d99M-xSBoL6jj8MjAjEihgHsgpcZtCiWze2kpSshUWuDPw/viewform"
              className="bg-amber-400 text-black font-bold text-sm px-5 py-2 rounded-lg hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-400/20"
            >
              Register Now
            </a>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-white z-10">
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenu ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenu ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenu ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4 animate-fade-in">
            <a href="#about" onClick={() => setMobileMenu(false)} className="block text-gray-300 hover:text-white py-2">About</a>
            <a href="#timeline" onClick={() => setMobileMenu(false)} className="block text-gray-300 hover:text-white py-2">Timeline</a>
            <a href="#faq" onClick={() => setMobileMenu(false)} className="block text-gray-300 hover:text-white py-2">FAQ</a>
            <a href={REGISTER_URL} className="block bg-amber-400 text-black font-bold text-center px-5 py-3 rounded-lg">Register Now</a>
          </div>
        )}
      </nav>


      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm mb-10">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-gray-300">Ek-Prayas presents</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8">
            <span className="text-amber-400">AAVISH</span>KAAR
          </h1>

          <p className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 tracking-tight mb-6 leading-tight">
            FROM CAMPUS<br className="sm:hidden" /> TO THE<br />
            <span className="text-amber-400">NATIONAL STAGE</span>
          </p>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            A pathway to innovation! Join us for a massive competition inspired by the Smart India Hackathon (SIH) framework.
            Organized by Club Ek-Prayass in collaboration with Club AISS.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-12">
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.minutes, label: 'Mins' },
              { val: countdown.seconds, label: 'Secs' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-2">
                  <span className="font-display font-bold text-2xl sm:text-3xl text-white">{String(item.val).padStart(2, '0')}</span>
                </div>
                <span className="text-gray-500 text-xs uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7d99M-xSBoL6jj8MjAjEihgHsgpcZtCiWze2kpSshUWuDPw/viewform"
              className="group bg-amber-400 hover:bg-amber-300 text-black font-bold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-amber-400/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Register Your Team
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:bg-white/5 flex items-center justify-center gap-2"
            >
              Learn More
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>


      {/* ════════════ WHAT IS AAVISHKAAR ════════════ */}
      <Section id="about" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">What is Aavishkaar?</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-8 leading-tight">
            Not just a hackathon.<br />
            <span className="text-gray-500">A launchpad for student innovators.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
            Aavishkaar is a premium hackathon organized by Club Ek-Prayass and Club AISS, inspired by the 
            Smart India Hackathon (SIH) framework. Build real products, get mentored, 
            and compete for a direct entry to the national stage.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed">
            With thematic tracks ranging from Healthcare and Rural Empowerment to Environment and Inclusive Society,
            this is your arena to build meaningful solutions that matter.
          </p>
        </div>
      </Section>


      {/* ════════════ WHY DIFFERENT ════════════ */}
      <Section className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Why Aavishkaar?</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              This isn't just another<br />
              <span className="text-gray-500">campus hackathon.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyHighlights.map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-400/30 hover:bg-amber-400/[0.03] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-400/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ PRIZES ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Hold Up</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              This is the <span className="text-amber-400">real thing.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1st Prize */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-amber-400/10 to-transparent border border-amber-400/20 text-center group hover:border-amber-400/40 transition-all md:scale-105 md:-mt-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-amber-400 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Top 3 Winners</span>
              </div>
              <Trophy className="w-10 h-10 text-amber-400 mx-auto mt-4 mb-4" />
              <p className="font-display font-black text-4xl text-amber-400 mb-2">₹5,000+</p>
              <p className="text-gray-400 text-sm">Total Prize Pool</p>
            </div>

            {/* SIH Entry */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-white/20 transition-all">
              <Star className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Direct Entry</p>
              <p className="font-display font-black text-2xl text-white mb-2">SIH National</p>
              <p className="text-gray-500 text-sm">Top 3 teams advance directly</p>
            </div>

            {/* Thematic Tracks */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-white/20 transition-all">
              <Lightbulb className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Diverse Themes</p>
              <p className="font-display font-black text-2xl text-white mb-2">5 Tracks</p>
              <p className="text-gray-500 text-sm">Healthcare, Rural, Women, Environment</p>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm mt-8">
            + Track-specific prizes • Best Freshers Team • Best UI/UX • People's Choice Award
          </p>
        </div>
      </Section>


      {/* ════════════ HOW IT WORKS ════════════ */}
      <Section className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">The Process</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              How exactly does<br />
              <span className="text-gray-500">this work?</span>
            </h2>
          </div>

          <div className="space-y-0">
            {howItWorks.map((item, i) => (
              <div key={i} className="group flex gap-6 md:gap-10 items-start py-8 border-b border-white/5 last:border-0">
                <span className="font-display font-black text-4xl md:text-6xl text-white/5 group-hover:text-amber-400/20 transition-colors flex-shrink-0 w-20 text-right">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ TEAM & HARDWARE ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Your Team</p>
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-6">
                How your team<br /><span className="text-gray-500">should look.</span>
              </h3>
              <ul className="space-y-4">
                {rules.slice(0, 5).map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-400 text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Hardware</p>
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-6">
                Your gear at<br /><span className="text-gray-500">the venue.</span>
              </h3>
              <ul className="space-y-4">
                {rules.slice(5).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400 text-sm leading-relaxed">Bring your laptops and passion!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ TIMELINE ════════════ */}
      <Section id="timeline" className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Mark Your Calendar</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">Timeline</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-3 h-3 rounded-full border-2 ${item.status === 'active' ? 'bg-amber-400 border-amber-400 shadow-lg shadow-amber-400/40' : 'bg-[#0f0f0f] border-white/20'}`}></div>
                  </div>

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className={`inline-block px-4 py-3 rounded-xl bg-white/[0.03] border ${item.status === 'active' ? 'border-amber-400/30' : 'border-white/5'}`}>
                      <p className={`font-display font-bold text-sm ${item.status === 'active' ? 'text-amber-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                        {item.date}
                      </p>
                      <p className="text-white font-semibold text-base mt-1">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ WHO SHOULD JOIN ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">For You</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Who should join<br />
              <span className="text-gray-500">Aavishkaar?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: '💻', title: 'Developers', desc: 'Frontend, backend, full-stack, mobile — if you code, you belong here.' },
              { emoji: '🎨', title: 'Designers', desc: 'UI/UX designers who make things beautiful and usable.' },
              { emoji: '💡', title: 'Idea People', desc: 'Got a problem to solve? Pair up with builders and make it real.' },
              { emoji: '🔬', title: 'Domain Experts', desc: 'Health, finance, education — your knowledge shapes the solution.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-400/20 transition-all text-center">
                <span className="text-4xl block mb-4">{item.emoji}</span>
                <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>



      {/* ════════════ FAQ ════════════ */}
      <Section id="faq" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Got Questions?</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Frequently Asked<br />
              <span className="text-gray-500">Questions.</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ GOLDEN RULES ════════════ */}
      <Section className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Play Fair</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              The Golden <span className="text-amber-400">Rules.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="font-display font-bold text-amber-400/40 text-lg flex-shrink-0 w-7">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ STATS BANNER ════════════ */}
      <Section className="py-20 md:py-28 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="font-display font-black text-4xl md:text-5xl text-amber-400 mb-2">{stat.number}</p>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ CONTACT / QUESTIONS ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Still have questions?</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-6">
            Questions? We've got you.
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Reach out to us anytime. We're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:ekprayass@gmail.com" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold transition-all hover:bg-white/10">
              📧 ekprayass@gmail.com
            </a>
            <a href="https://instagram.com/club_ekprayass" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold transition-all hover:bg-white/10">
              📸 @club_ekprayass
            </a>
          </div>
        </div>
      </Section>


      {/* ════════════ FINAL CTA ════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Amber glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter mb-6">
            SEATS ARE LIMITED.<br />
            <span className="text-amber-400">YOUR TIME ISN'T.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Don't wait for the deadline. Register now, form your squad, and start preparing. 
            The stage is set — are you?
          </p>
          <a
            href={REGISTER_URL}
            className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-black font-bold px-12 py-5 rounded-xl text-lg transition-all hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-1"
          >
            Register Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>


      {/* ════════════ FOOTER ════════════ */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm text-gray-500">
              <span className="text-amber-400">AAVISH</span>KAAR
            </span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-600 text-sm">by Ek-Prayas</span>
          </div>
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} Ek-Prayas. All rights reserved.</p>
          <Link to="/" className="text-gray-500 text-sm hover:text-amber-400 transition-colors">
            ← Back to Ek-Prayas
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Hackathon;
