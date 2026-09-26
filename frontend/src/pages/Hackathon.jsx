import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, Users, Clock, Trophy, Zap, Code, Lightbulb, Target, Shield, Star, MapPin, Calendar, ExternalLink, Mail, Instagram, Plus, Minus, ArrowUpRight } from 'lucide-react';
import logo from '../assets/ek_prayas-logo.png';
import heroImg from '../assets/team1.jpeg';
import teamImg2 from '../assets/team2.jpeg';
import teamImg3 from '../assets/team3.jpeg';

/* ──────────────────────────────────────────────
   AAVISHKAAR — Hackathon Landing Page
   Orenda-Inspired Redesign
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
    }, { threshold: 0.12, ...options });
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
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
};

// ─── FAQ Accordion Item (Orenda Style) ─────────
const FaqItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-warm-brown/15 shadow-lg shadow-warm-brown/5' : 'border-warm-brown/5 hover:border-warm-brown/10 hover:shadow-md hover:shadow-warm-brown/3'}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className={`font-medium text-base md:text-lg pr-4 transition-colors ${isOpen ? 'text-warm-brown' : 'text-warm-brown/80 group-hover:text-warm-brown'}`}>
          {question}
        </span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-warm-brown text-white rotate-0' : 'bg-cream-200 text-warm-brown/60'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
        <p className="px-6 pb-6 text-warm-brown/60 text-sm md:text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// ─── Pill Button Component ─────────────────────
const PillButton = ({ children, href, variant = 'primary', className = '', icon = true }) => {
  const base = 'inline-flex items-center gap-2 font-semibold text-sm md:text-base transition-all duration-300 rounded-full';
  const variants = {
    primary: 'bg-warm-brown text-white px-7 py-3.5 hover:bg-warm-brown-400 hover:shadow-xl hover:shadow-warm-brown/15 hover:-translate-y-0.5',
    outline: 'border-2 border-warm-brown/20 text-warm-brown px-7 py-3.5 hover:border-warm-brown/40 hover:bg-warm-brown/5',
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && (
        <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 ${variant === 'primary' ? 'bg-white/20' : 'bg-warm-brown/10'}`}>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      )}
    </a>
  );
};

// ─── Data ──────────────────────────────────────
const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe7d99M-xSBoL6jj8MjAjEihgHsgpcZtCiWze2kpSshUWuDPw/viewform';

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
  { date: 'Sept 6', label: 'Round 1 Results Announced', status: 'upcoming' },
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
  { number: '2', label: 'Rounds' },
  { number: '₹250', label: 'Fee / Team' },
];

const problemStatements = [
  {
    track: "Healthcare & Well-being",
    color: "bg-rose-100 text-rose-700",
    problems: [
      "SIH26133 – Accessibility and Quality of Public Healthcare Services, Particularly in Rural & Underserved Areas",
      "SIH26038 – Explainable AI for Diabetic Retinopathy Screening in Rural India",
      "SIH26003 – AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients",
      "SIH26094 – AI-Powered Mental Health Monitoring and Distress Prediction for Victims of Atrocities",
      "SIH26093 – AI-Based Stress & Trauma Assessment for Victims/Complainants",
      "SIH26113 – Human Augmentation Technologies for Healthcare, Rehabilitation, Assistive Living & Personal Mobility",
      "SIH26181 – AI-Powered Personal Health Companion with Real-Time Health Monitoring & Early Warnings"
    ]
  },
  {
    track: "Rural, Agriculture & Livelihood Empowerment",
    color: "bg-emerald-100 text-emerald-700",
    problems: [
      "SIH26132 – Strengthening Market Linkages and Price Discovery for Farmers",
      "SIH26033 – Multiple Intermediaries Reduce Farmers' Earnings and Increase Consumer Prices",
      "SIH26090 – AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans",
      "SIH26097 – AI-Driven Voice Assistant for Livelihood Mapping and Skilling Recommendations for SC Communities",
      "SIH26091 – AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs",
      "SIH26022 – Smart Solar-Powered Drying & Packaging System for Rural Women Artisans",
      "SIH26020 – Innovative Hand-Spinning Equipment for Enhancing Khadi Artisan Productivity and Income",
      "SIH26128 – Early Detection, Prevention and Management of Livestock Diseases"
    ]
  },
  {
    track: "Women & Community Empowerment",
    color: "bg-purple-100 text-purple-700",
    problems: [
      "SIH26022 – Smart Solar-Powered Drying & Packaging System for Rural Women Artisans",
      "SIH26043 – Platform to Crowdsource Societal Challenges and Connect Citizens, Universities and Industry",
      "SIH26097 – AI-Driven Voice Assistant for Livelihood Mapping and Skilling Recommendations for SC Communities"
    ]
  },
  {
    track: "Environment, Climate & Disaster Resilience",
    color: "bg-sky-100 text-sky-700",
    problems: [
      "SIH26192 – Flash Flood Prediction System for Hilly Regions",
      "SIH26191 – Identifying Hazard Red Zones and Relocation Needs for Vulnerable Habitations",
      "SIH26178 – AI Environmental Monitoring for Floods, Fires, Pollution and Other Hazards",
      "SIH26082 – Air Pollution–Weather Coupled Forecasting System",
      "SIH26083 – Extreme Heatwave Early Warning & Human Thermal Stress Index",
      "SIH26001 – AI-Based Early Warning and Landslide Risk Monitoring System",
      "SIH26071 – AI/ML-Based Heavy Rainfall Early Warning and Inundation Prediction",
      "SIH26072 – AI/ML-Based Thunderstorm and Lightning Nowcasting"
    ]
  },
  {
    track: "Inclusive Society & Accessibility",
    color: "bg-amber-100 text-amber-700",
    problems: [
      "SIH26042 – AI-Powered Vernacular Pedagogy and Real-Time Translation for Mother-Tongue Primary Education",
      "SIH26113 – Human Augmentation Technologies for Healthcare, Rehabilitation, Assistive Living & Personal Mobility",
      "SIH26075 – CAPACITY CONNECT – Digital Capacity Building and Learning Management Portal",
      "SIH26134 – Aligning Skill-Development Programs with Job-Market Requirements",
      "SIH26135 – Tracking Employment Outcomes, Skill Gaps and Skilling Impact"
    ]
  },
  {
    track: "Governance & Citizen-Centric Services",
    color: "bg-indigo-100 text-indigo-700",
    problems: [
      "SIH26043 – Platform to Crowdsource Societal Challenges and Connect Citizens, Universities and Industry",
      "SIH26129 – Integration of Government Digital Platforms to Reduce Fragmented Service Delivery",
      "SIH26102 – AI System to Detect Fraud and Inefficiencies in MPLAD Scheme Implementation",
      "SIH26016 – Real-Time National Land Acquisition & Management System",
      "SIH26018 – Intelligent Land Record Digitization and Validation System"
    ]
  }
];


// ─── Main Component ────────────────────────────
const Hackathon = () => {
  const countdown = useCountdown(EVENT_DATE);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [openTrack, setOpenTrack] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-cream-100 text-warm-brown min-h-screen font-sans selection:bg-warm-brown/10 selection:text-warm-brown animate-fade-in">

      {/* ════════════ FLOATING PILL NAVBAR ════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navScrolled ? 'py-2' : 'py-4'}`}>
        <div className={`max-w-6xl mx-auto px-4 transition-all duration-500 ${navScrolled ? '' : ''}`}>
          <div className={`flex items-center justify-between px-6 h-14 rounded-full transition-all duration-500 ${navScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-warm-brown/5 border border-warm-brown/5' : 'bg-white/70 backdrop-blur-lg border border-warm-brown/5'}`}>
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <img src={logo} alt="Ek-Prayass Logo" className="h-8 w-auto object-contain" />
              <span className="font-serif font-bold text-lg tracking-tight text-warm-brown">Aavishkaar</span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              <a href="#about" className="text-warm-brown/60 text-sm font-medium hover:text-warm-brown transition-colors">About</a>
              <a href="#timeline" className="text-warm-brown/60 text-sm font-medium hover:text-warm-brown transition-colors">Timeline</a>
              <a href="#tracks" className="text-warm-brown/60 text-sm font-medium hover:text-warm-brown transition-colors">Tracks</a>
              <a href="#faq" className="text-warm-brown/60 text-sm font-medium hover:text-warm-brown transition-colors">FAQ</a>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-warm-brown text-white font-semibold text-sm pl-5 pr-1.5 py-1.5 rounded-full hover:bg-warm-brown-400 transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-warm-brown/15"
              >
                Register Now
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            {/* Mobile burger */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-warm-brown z-10">
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-warm-brown transition-all duration-300 ${mobileMenu ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-warm-brown transition-all duration-300 ${mobileMenu ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-warm-brown transition-all duration-300 ${mobileMenu ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile menu dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileMenu ? 'max-h-80 mt-2' : 'max-h-0'}`}>
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-warm-brown/5 shadow-xl px-6 py-5 space-y-3">
              <a href="#about" onClick={() => setMobileMenu(false)} className="block text-warm-brown/70 hover:text-warm-brown py-2 font-medium">About</a>
              <a href="#timeline" onClick={() => setMobileMenu(false)} className="block text-warm-brown/70 hover:text-warm-brown py-2 font-medium">Timeline</a>
              <a href="#tracks" onClick={() => setMobileMenu(false)} className="block text-warm-brown/70 hover:text-warm-brown py-2 font-medium">Tracks</a>
              <a href="#faq" onClick={() => setMobileMenu(false)} className="block text-warm-brown/70 hover:text-warm-brown py-2 font-medium">FAQ</a>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-warm-brown text-white font-bold text-center px-5 py-3 rounded-full mt-2"
              >
                Register Now →
              </a>
            </div>
          </div>
        </div>
      </nav>


      {/* ════════════ HERO — Full-Bleed Image ════════════ */}
      <section className="relative min-h-[95vh] flex items-end overflow-hidden pt-24 pb-16">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Aavishkaar team"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/90 via-warm-brown/40 to-warm-brown/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/60 to-transparent"></div>
        </div>

        {/* Rounded corners container like Orenda */}
        <div className="absolute inset-x-4 inset-y-0 top-20 rounded-3xl overflow-hidden">
          <img
            src={heroImg}
            alt="Aavishkaar team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e04]/95 via-[#1a0e04]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0e04]/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-warm-gold-light rounded-full animate-pulse"></span>
            <span className="text-white/90 font-medium">Ek-Prayass presents</span>
          </div>

          <h1 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6 tracking-tight">
            Building The<br />
            <span className="text-cream-200">Next Generation</span><br />
            <span className="italic text-warm-gold-light">of Innovators</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
            A pathway to innovation! Join us for a massive competition inspired by the
            Smart India Hackathon (SIH) framework.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white text-warm-brown font-semibold pl-7 pr-2 py-2.5 rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5 flex items-center gap-3"
            >
              Join us
              <span className="w-9 h-9 rounded-full bg-warm-brown text-white flex items-center justify-center group-hover:bg-warm-brown-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#tracks"
              className="group border-2 border-white/30 text-white font-semibold pl-7 pr-2 py-2.5 rounded-full text-base transition-all duration-300 hover:border-white/60 hover:bg-white/10 flex items-center gap-3"
            >
              View Tracks
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Floating card — featured campaign style like Orenda */}
          {(countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0) && (
            <div className="absolute right-8 bottom-16 hidden lg:block">
              <div className="bg-white rounded-2xl p-5 shadow-2xl shadow-warm-brown/15 w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-brown/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-warm-brown" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-warm-brown text-sm">Registration Closes</p>
                    <p className="text-warm-brown/50 text-xs">Sept 4, 2026</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[
                    { val: countdown.days, label: 'D' },
                    { val: countdown.hours, label: 'H' },
                    { val: countdown.minutes, label: 'M' },
                    { val: countdown.seconds, label: 'S' },
                  ].map((item) => (
                    <div key={item.label} className="flex-1 bg-cream-100 rounded-xl py-2 text-center">
                      <span className="font-serif font-bold text-lg text-warm-brown block leading-none">{String(item.val).padStart(2, '0')}</span>
                      <span className="text-warm-brown/40 text-[10px] uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ════════════ EDITORIAL MISSION STATEMENT ════════════ */}
      <Section id="about" className="py-28 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug tracking-tight">
            <span className="text-warm-brown">At Aavishkaar, we are building a bridge</span>
            <span className="text-warm-brown/30"> between ideas and impact. </span>
            <span className="inline-block w-10 h-10 align-middle mx-1">
              <img src={logo} alt="" className="w-full h-full object-contain" />
            </span>
            <span className="text-warm-brown/30">
              Today, 40 teams will stand with us, transforming innovation into real and lasting change for communities in need.
            </span>
          </p>
        </div>
      </Section>


      {/* ════════════ STATS BANNER ════════════ */}
      <Section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-warm-brown rounded-3xl p-10 md:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-serif font-bold text-4xl md:text-5xl text-white mb-2">{stat.number}</p>
                  <p className="text-white/50 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ WHY AAVISHKAAR — White Cards on Cream ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Why Aavishkaar?</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight leading-tight">
              This isn't just another<br />
              <span className="text-warm-brown/40">campus hackathon.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyHighlights.map((item, i) => (
              <div
                key={i}
                className="group p-7 rounded-2xl bg-white border border-warm-brown/5 hover:border-warm-brown/15 hover:shadow-xl hover:shadow-warm-brown/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-cream-200 flex items-center justify-center text-warm-brown mb-5 group-hover:bg-warm-brown group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-warm-brown mb-2">{item.title}</h3>
                <p className="text-warm-brown/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ PRIZES ════════════ */}
      <Section className="py-24 md:py-32 bg-cream-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">What You Win</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight">
              This is the <span className="italic text-warm-gold-dark">real thing.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1st Prize */}
            <div className="relative p-8 rounded-3xl bg-white border border-warm-brown/10 text-center group hover:shadow-xl hover:shadow-warm-brown/5 transition-all duration-300 hover:-translate-y-1 md:scale-105 md:-mt-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-warm-brown text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider">Top 3 Winners</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-warm-gold/10 flex items-center justify-center mx-auto mt-4 mb-4">
                <Trophy className="w-7 h-7 text-warm-gold-dark" />
              </div>
              <p className="font-serif font-bold text-4xl text-warm-brown mb-2">₹5,000+</p>
              <p className="text-warm-brown/50 text-sm">Total Prize Pool</p>
            </div>

            {/* SIH Entry */}
            <div className="p-8 rounded-3xl bg-white border border-warm-brown/5 text-center hover:shadow-xl hover:shadow-warm-brown/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-cream-200 flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-warm-brown/40" />
              </div>
              <p className="text-warm-brown/40 text-xs font-semibold uppercase tracking-wider mb-2">Direct Entry</p>
              <p className="font-serif font-bold text-2xl text-warm-brown mb-2">SIH National</p>
              <p className="text-warm-brown/50 text-sm">Top 3 teams advance directly</p>
            </div>

            {/* Tracks */}
            <div className="p-8 rounded-3xl bg-white border border-warm-brown/5 text-center hover:shadow-xl hover:shadow-warm-brown/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-cream-200 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-7 h-7 text-warm-brown/40" />
              </div>
              <p className="text-warm-brown/40 text-xs font-semibold uppercase tracking-wider mb-2">Diverse Themes</p>
              <p className="font-serif font-bold text-2xl text-warm-brown mb-2">6 Tracks</p>
              <p className="text-warm-brown/50 text-sm">Healthcare, Rural, Women, Environment & more</p>
            </div>
          </div>

          <p className="text-center text-warm-brown/35 text-sm mt-10">
            + Track-specific prizes • Best Freshers Team • Best UI/UX • People's Choice Award
          </p>
        </div>
      </Section>


      {/* ════════════ HOW IT WORKS ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">The Process</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight leading-tight">
              How exactly does<br />
              <span className="text-warm-brown/40">this work?</span>
            </h2>
          </div>

          <div className="space-y-0">
            {howItWorks.map((item, i) => (
              <div key={i} className="group flex gap-6 md:gap-10 items-start py-8 border-b border-warm-brown/8 last:border-0">
                <span className="font-serif font-bold text-5xl md:text-7xl text-warm-brown/8 group-hover:text-warm-brown/20 transition-colors flex-shrink-0 w-20 text-right leading-none">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-xl md:text-2xl text-warm-brown mb-2 group-hover:text-warm-gold-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-warm-brown/50 text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ TEAM & HARDWARE ════════════ */}
      <Section className="py-24 md:py-32 bg-cream-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Your Team</p>
              <h3 className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-8 leading-tight">
                How your team<br /><span className="text-warm-brown/40">should look.</span>
              </h3>
              <ul className="space-y-4">
                {rules.slice(0, 5).map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-warm-brown/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-3.5 h-3.5 text-warm-brown/50" />
                    </span>
                    <span className="text-warm-brown/60 text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Hardware</p>
              <h3 className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-8 leading-tight">
                Your gear at<br /><span className="text-warm-brown/40">the venue.</span>
              </h3>
              <ul className="space-y-4">
                {rules.slice(5).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-warm-brown/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-3.5 h-3.5 text-warm-brown/50" />
                    </span>
                    <span className="text-warm-brown/60 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-warm-brown/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ChevronRight className="w-3.5 h-3.5 text-warm-brown/50" />
                  </span>
                  <span className="text-warm-brown/60 text-sm leading-relaxed">Bring your laptops and passion!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ TIMELINE ════════════ */}
      <Section id="timeline" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Mark Your Calendar</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight">Timeline</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-warm-brown/10 -translate-x-1/2"></div>

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${item.status === 'active'
                      ? 'bg-warm-brown border-warm-brown shadow-lg shadow-warm-brown/30'
                      : 'bg-cream-100 border-warm-brown/20'}`}>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className={`inline-block px-5 py-4 rounded-2xl bg-white border transition-all hover:shadow-md ${item.status === 'active' ? 'border-warm-brown/15 shadow-sm' : 'border-warm-brown/5'}`}>
                      <p className={`font-semibold text-sm flex items-center gap-1.5 ${i % 2 === 0 ? 'md:justify-end' : ''} ${item.status === 'active' ? 'text-warm-brown' : 'text-warm-brown/40'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </p>
                      <p className="text-warm-brown font-serif font-bold text-base mt-1">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ WHO SHOULD JOIN ════════════ */}
      <Section className="py-24 md:py-32 bg-cream-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">For You</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight">
              Who should join<br />
              <span className="text-warm-brown/40">Aavishkaar?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: '💻', title: 'Developers', desc: 'Frontend, backend, full-stack, mobile — if you code, you belong here.' },
              { emoji: '🎨', title: 'Designers', desc: 'UI/UX designers who make things beautiful and usable.' },
              { emoji: '💡', title: 'Idea People', desc: 'Got a problem to solve? Pair up with builders and make it real.' },
              { emoji: '🔬', title: 'Domain Experts', desc: 'Health, finance, education — your knowledge shapes the solution.' },
            ].map((item, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white border border-warm-brown/5 hover:border-warm-brown/15 hover:shadow-xl hover:shadow-warm-brown/5 transition-all duration-300 text-center hover:-translate-y-1">
                <span className="text-4xl block mb-5">{item.emoji}</span>
                <h3 className="font-serif font-bold text-warm-brown mb-2">{item.title}</h3>
                <p className="text-warm-brown/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ THEMATIC TRACKS & PROBLEM STATEMENTS ════════════ */}
      <Section id="tracks" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Choose Your Path</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight">
              Thematic Tracks &<br />
              <span className="text-warm-brown/40">Problem Statements.</span>
            </h2>
            <p className="text-warm-brown/50 mt-6 text-lg max-w-2xl mx-auto">
              Explore some of the real-world SIH problem statements you can tackle during Aavishkaar '26.
            </p>

            {/* Flexibility notice */}
            <div className="mt-8 bg-white border border-warm-brown/10 rounded-2xl p-6 text-left max-w-3xl mx-auto shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5 text-warm-gold-dark" />
                </div>
                <div>
                  <span className="text-warm-gold-dark font-bold uppercase tracking-wider text-xs block mb-1">Flexibility Allowed</span>
                  <p className="text-warm-brown/60 text-sm md:text-base leading-relaxed">
                    You are <span className="text-warm-brown font-semibold">NOT restricted</span> to the problem statements listed below. You are free to choose <span className="text-warm-brown font-semibold">ANY problem statement</span> from the official Smart India Hackathon (SIH) portal that aligns with our thematic tracks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {problemStatements.map((track, i) => (
              <div key={i} className="rounded-2xl bg-white border border-warm-brown/5 overflow-hidden hover:shadow-lg hover:shadow-warm-brown/5 transition-all duration-300">
                <button
                  onClick={() => setOpenTrack(openTrack === i ? null : i)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${track.color}`}>
                      {track.problems.length}
                    </span>
                    <h3 className="font-serif font-bold text-lg md:text-xl text-warm-brown group-hover:text-warm-gold-dark transition-colors">
                      {track.track}
                    </h3>
                  </div>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openTrack === i ? 'bg-warm-brown text-white rotate-180' : 'bg-cream-200 text-warm-brown/50'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-out ${openTrack === i ? 'max-h-[800px]' : 'max-h-0'}`}>
                  <ul className="px-6 md:px-8 pb-6 md:pb-8 space-y-3">
                    {track.problems.map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-warm-brown/25 mt-2.5 flex-shrink-0"></span>
                        <span className="text-warm-brown/60 text-sm md:text-base leading-relaxed">{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ FAQ — Orenda 2-Column Layout ════════════ */}
      <Section id="faq" className="py-24 md:py-32 bg-cream-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
            {/* Left Column — Heading */}
            <div className="md:col-span-2">
              <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight sticky top-24">
                Questions? We<br />
                got your <span className="italic">Answers</span>
              </h2>
              <p className="text-warm-brown/50 mt-4 text-base leading-relaxed">
                Have questions? We're here to provide clarity and transparency.
              </p>
            </div>

            {/* Right Column — Accordion */}
            <div className="md:col-span-3 space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ GOLDEN RULES ════════════ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Play Fair</p>
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight">
              The Golden <span className="italic text-warm-gold-dark">Rules.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-warm-brown/5 hover:border-warm-brown/10 hover:shadow-md transition-all">
                <span className="font-serif font-bold text-warm-brown/15 text-xl flex-shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-warm-brown/60 text-sm leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* ════════════ CONTACT / QUESTIONS ════════════ */}
      <Section className="py-24 md:py-32 bg-cream-200/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-warm-brown/50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Still have questions?</p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6">
            Questions? We've got you.
          </h2>
          <p className="text-warm-brown/50 text-lg mb-8">
            Reach out to us anytime. We're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:club_ekprayss@kiet.edu" className="group px-7 py-4 rounded-2xl bg-white border border-warm-brown/5 hover:border-warm-brown/15 hover:shadow-lg hover:shadow-warm-brown/5 text-warm-brown font-semibold transition-all duration-300 flex items-center justify-center gap-3">
              <Mail className="w-5 h-5 text-warm-brown/40 group-hover:text-warm-brown transition-colors" />
              club_ekprayss@kiet.edu
            </a>
            <a href="https://instagram.com/club_ekprayass" target="_blank" rel="noopener noreferrer" className="group px-7 py-4 rounded-2xl bg-white border border-warm-brown/5 hover:border-warm-brown/15 hover:shadow-lg hover:shadow-warm-brown/5 text-warm-brown font-semibold transition-all duration-300 flex items-center justify-center gap-3">
              <Instagram className="w-5 h-5 text-warm-brown/40 group-hover:text-warm-brown transition-colors" />
              @club_ekprayass
            </a>
          </div>
        </div>
      </Section>


      {/* ════════════ FINAL CTA ════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-warm-brown rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-warm-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6 leading-tight">
                Seats are limited.<br />
                <span className="italic text-warm-gold-light">Your time isn't.</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                Don't wait for the deadline. Register now, form your squad, and start preparing.
                The stage is set — are you?
              </p>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-warm-brown font-semibold pl-8 pr-2 py-3 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
              >
                Register Now
                <span className="w-10 h-10 rounded-full bg-warm-brown text-white flex items-center justify-center group-hover:bg-warm-brown-400 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════ FOOTER — Multi-Column ════════════ */}
      <footer className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logo} alt="Ek-Prayass Logo" className="h-10 w-auto" />
                <span className="font-serif font-bold text-xl text-warm-brown">Aavishkaar</span>
              </div>
              <p className="text-warm-brown/40 text-sm leading-relaxed mb-6">
                Innovation in Action,<br />
                Impact in Every Code.
              </p>
              <div className="flex gap-3">
                <a href="https://instagram.com/club_ekprayass" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-brown/5 hover:bg-warm-brown/10 flex items-center justify-center text-warm-brown/40 hover:text-warm-brown transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="mailto:club_ekprayss@kiet.edu" className="w-9 h-9 rounded-full bg-warm-brown/5 hover:bg-warm-brown/10 flex items-center justify-center text-warm-brown/40 hover:text-warm-brown transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="font-serif font-bold text-warm-brown mb-5">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-warm-brown/50 hover:text-warm-brown text-sm transition-colors">About</a></li>
                <li><a href="#timeline" className="text-warm-brown/50 hover:text-warm-brown text-sm transition-colors">Timeline</a></li>
                <li><a href="#tracks" className="text-warm-brown/50 hover:text-warm-brown text-sm transition-colors">Tracks</a></li>
                <li><a href="#faq" className="text-warm-brown/50 hover:text-warm-brown text-sm transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Organized By */}
            <div>
              <h4 className="font-serif font-bold text-warm-brown mb-5">Organized By</h4>
              <ul className="space-y-3">
                <li><span className="text-warm-brown/50 text-sm">Club Ek-Prayass</span></li>
                <li><span className="text-warm-brown/50 text-sm">Club AISS</span></li>
                <li><span className="text-warm-brown/50 text-sm">KIET Group of Institutions</span></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-serif font-bold text-warm-brown mb-5">Contact us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-warm-brown/30" />
                  <a href="mailto:club_ekprayss@kiet.edu" className="text-warm-brown/50 hover:text-warm-brown text-sm transition-colors">club_ekprayss@kiet.edu</a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-warm-brown/30" />
                  <a href="https://instagram.com/club_ekprayass" target="_blank" rel="noopener noreferrer" className="text-warm-brown/50 hover:text-warm-brown text-sm transition-colors">@club_ekprayass</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-warm-brown/30 mt-0.5" />
                  <span className="text-warm-brown/50 text-sm">KIET Group of Institutions,<br />Ghaziabad, UP</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-warm-brown/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-warm-brown/30 text-sm">© {new Date().getFullYear()} Ek-Prayass. All rights reserved.</p>
            <p className="text-warm-brown/30 text-xs">
              Designed with ❤️ for the community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hackathon;
