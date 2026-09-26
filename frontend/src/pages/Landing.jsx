import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight,
  Play, 
  Plus, 
  Minus, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// Real Ek-Prayass Assets
import heroImage from '../assets/new.jpeg';
import circleImage from '../assets/O.jpeg';
import videoSrc from '../assets/vi.mp4';
import kitabi1 from '../assets/kitabiudan1.jpeg';
import kitabi2 from '../assets/kitabi2.jpeg';
import kitabi3 from '../assets/kitabi3.jpeg';
import clean1 from '../assets/clean1.jpeg';
import clean2 from '../assets/clean2.jpeg';
import team1 from '../assets/team1.jpeg';
import team2 from '../assets/team2.jpeg';
import team3 from '../assets/team3.jpeg';
import team4 from '../assets/team4.jpeg';
import team5 from '../assets/team5.jpeg';
import team6 from '../assets/team6.jpeg';
import swasti_maam from '../assets/swasti_maam.jpeg';
import Avi_sir from '../assets/Avi_sir.jpeg';
import abhinavImg from '../assets/abhinav.jpg';
import shreya from '../assets/shreya.jpeg';
import chirag from '../assets/chirag_sir.jpeg';
import pushpanjali from '../assets/pushpanjali.jpeg';
import vanshika from '../assets/vanshika.jpeg';
import shorya from '../assets/shorya_sir.jpeg';
import logo from '../assets/favicon.jpg';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

// Interactive 3D Tilt Card with Dynamic Specular Glare & Parallax Depth for Partners
const PartnerCard3D = ({ partner }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth 3D tilt angles (up to ±12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div style={{ perspective: '1000px' }} className="flex-shrink-0 py-2">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-8px) scale(1.04)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, background-color 0.3s ease, border-color 0.3s ease',
        }}
        className={`relative w-[260px] sm:w-[310px] h-[155px] sm:h-[175px] rounded-[26px] sm:rounded-[30px] p-6 flex flex-col items-center justify-center text-center cursor-pointer select-none border transition-colors ${
          isHovered
            ? 'bg-white/95 border-black/10 shadow-[0_24px_48px_-12px_rgba(43,20,8,0.22),0_10px_20px_-6px_rgba(0,0,0,0.08)]'
            : 'bg-[#e9e8e4]/70 hover:bg-[#e9e8e4] border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
        }`}
      >
        {/* Dynamic Specular 3D Glare Sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 200px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.7), transparent 75%)`,
          }}
        />

        {/* 3D Floating Icon Badge with Depth */}
        <div
          style={{
            transform: isHovered ? 'translateZ(32px) scale(1.12)' : 'translateZ(0px) scale(1)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
          }}
          className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors ${
            isHovered
              ? 'bg-white border border-black/10 shadow-md'
              : 'bg-white/80 border border-black/5 shadow-xs'
          }`}
        >
          {partner.icon}
        </div>

        {/* 3D Floating Partner Name */}
        <span
          style={{
            transform: isHovered ? 'translateZ(22px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="font-serif font-bold text-base sm:text-[17px] text-[#1c1917] leading-tight"
        >
          {partner.name}
        </span>

        {/* 3D Floating Category Tag */}
        <span
          style={{
            transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="text-[10px] sm:text-[11px] text-[#737373] uppercase tracking-widest font-medium mt-1.5"
        >
          {partner.type}
        </span>
      </div>
    </div>
  );
};

// Scroll-driven word-by-word blur reveal quote (Editorial scroll scrub interaction)
const ScrollBlurMissionQuote = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setScrollProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const tokens = [
    { type: 'word', text: 'At' },
    { type: 'word', text: 'Ek-Prayass,' },
    { type: 'word', text: 'we' },
    { type: 'word', text: 'are' },
    { type: 'word', text: 'building' },
    { type: 'word', text: 'a' },
    { type: 'word', text: 'bridge' },
    { type: 'word', text: 'between' },
    { type: 'word', text: 'hope' },
    { type: 'word', text: 'and' },
    { type: 'word', text: 'humanity.' },
    {
      type: 'badge',
      element: (
        <span className="inline-flex items-center align-middle mx-1.5 px-3 py-1 bg-white border border-black/10 rounded-full shadow-sm text-xs font-sans font-medium text-[#4a1c00]">
          <img src={logo} alt="Logo" className="w-4 h-4 rounded-full mr-1.5 object-cover" />
          Ek-Prayass
        </span>
      ),
    },
    { type: 'word', text: 'Today,' },
    {
      type: 'badge',
      element: (
        <span className="inline-flex items-center align-middle mx-1.5 px-3 py-1 bg-white border border-black/10 rounded-full shadow-sm text-xs font-sans font-medium text-[#1c1917]">
          <span className="flex -space-x-1.5 mr-2">
            <img src={swasti_maam} alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-white" />
            <img src={Avi_sir} alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-white" />
            <img src={shreya} alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-white" />
          </span>
          100+ Volunteers
        </span>
      ),
    },
    { type: 'word', text: 'passionate' },
    { type: 'word', text: 'youth' },
    { type: 'word', text: 'stand' },
    { type: 'word', text: 'with' },
    { type: 'word', text: 'us,' },
    { type: 'word', text: 'transforming' },
    { type: 'word', text: 'compassion' },
    { type: 'word', text: 'into' },
    { type: 'word', text: 'real' },
    { type: 'word', text: 'and' },
    { type: 'word', text: 'lasting' },
    { type: 'word', text: 'impact' },
    { type: 'word', text: 'for' },
    { type: 'word', text: 'communities' },
    { type: 'word', text: 'in' },
    { type: 'word', text: 'need.' },
  ];

  const totalTokens = tokens.length;
  const startRange = 0.04;
  const endRange = 0.88;
  const step = (endRange - startRange) / totalTokens;

  return (
    <section ref={sectionRef} className="relative h-[230vh] sm:h-[260vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pointer-events-none">
        <div className="pointer-events-auto w-full pt-16 sm:pt-0">
          <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#1c1917] font-normal leading-[1.38] sm:leading-[1.42] tracking-tight selection:bg-[#2b1408] selection:text-white">
            {tokens.map((token, idx) => {
              const tokenStart = startRange + idx * step;
              const tokenEnd = tokenStart + step * 1.5;

              let t = 0;
              if (scrollProgress >= tokenEnd) {
                t = 1;
              } else if (scrollProgress <= tokenStart) {
                t = 0;
              } else {
                t = (scrollProgress - tokenStart) / (tokenEnd - tokenStart);
              }

              const blurVal = Math.max(0, (1 - t) * 8).toFixed(1);
              const opacityVal = (0.18 + 0.82 * t).toFixed(2);
              const translateY = ((1 - t) * 5).toFixed(1);

              if (token.type === 'badge') {
                return (
                  <span
                    key={idx}
                    style={{
                      filter: `blur(${blurVal}px)`,
                      opacity: opacityVal,
                      transform: `translateY(${translateY}px)`,
                      transition: 'filter 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'filter, opacity, transform',
                    }}
                    className="inline-block align-middle my-1"
                  >
                    {token.element}
                  </span>
                );
              }

              return (
                <span
                  key={idx}
                  style={{
                    filter: `blur(${blurVal}px)`,
                    opacity: opacityVal,
                    transform: `translateY(${translateY}px)`,
                    transition: 'filter 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'filter, opacity, transform',
                  }}
                  className="inline-block mr-[0.28em] my-1"
                >
                  {token.text}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

// 4. Program cards data & interactive stacking deck component (Ditto Orenda reference)
const programCardsData = [
  {
    id: 'kitabi-udaan',
    image: kitabi1,
    alt: 'Kitabi Udaan Book Drive',
    time: 'Annual Drive • 3 min read',
    category: 'Education',
    categoryBg: 'bg-[#2d4d29]',
    title: 'Kitabi Udaan Book Drive',
    description: 'Recycling unused notebook pages to build fresh notebooks for underprivileged school children.',
    metricLabel1: 'Impact Reached',
    metricValue1: '1,200+ Books',
    metricLabel2: 'Goal Target',
    metricValue2: '1,500+ Books',
    link: '/project',
  },
  {
    id: 'swachhata-drive',
    image: clean1,
    alt: 'Swachhata Cleanliness Drive',
    time: 'Ongoing Campaign • 2 min read',
    category: 'Environment',
    categoryBg: 'bg-[#2d4d29]',
    title: 'Swachhata & Sanitation Drive',
    description: 'Community mobilization for clean public spaces, hygiene sensitization, and sustainable living.',
    metricLabel1: 'Areas Cleaned',
    metricValue1: '15+ Areas',
    metricLabel2: 'Goal Target',
    metricValue2: '20+ Drives',
    link: '/project',
  },
  {
    id: 'menstrual-health',
    image: team2,
    alt: 'Menstrual Health Camp',
    time: 'Health Workshop • 4 min read',
    category: 'Women Health',
    categoryBg: 'bg-[#1e3a8a]',
    title: 'Menstrual Health & Dignity',
    description: 'Breaking taboos, distributing sanitary care kits, and conducting hygiene workshops for young women.',
    metricLabel1: 'Girls Sensitized',
    metricValue1: '800+ Kits',
    metricLabel2: 'Goal Target',
    metricValue2: '1,000+ Kits',
    link: '/project',
  },
  {
    id: 'labour-dignity',
    image: team4,
    alt: 'Labour Dignity Initiative',
    time: 'Social Welfare • 3 min read',
    category: 'Social Dignity',
    categoryBg: 'bg-[#854d0e]',
    title: 'Labour Dignity & Recognition',
    description: 'Honoring the hard work of daily-wage laborers through health checkups and gratitude programs.',
    metricLabel1: 'Workers Reached',
    metricValue1: '500+ Workers',
    metricLabel2: 'Goal Target',
    metricValue2: '650+ Workers',
    link: '/project',
  }
];

const ProgramCardItem = ({ card }) => {
  return (
    <div className="rounded-[32px] p-6 sm:p-7 bg-white border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between group h-full transition-shadow duration-300 hover:shadow-lg">
      <div className="space-y-5">
        <div className="relative rounded-[24px] overflow-hidden aspect-[16/10] bg-slate-100">
          <img 
            src={card.image} 
            alt={card.alt} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#737373]">
          <span>{card.time}</span>
          <span className={`${card.categoryBg} text-white px-3 py-1 rounded-full font-medium tracking-wide`}>
            {card.category}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1917]">
            {card.title}
          </h3>
          <p className="text-sm text-[#666666] font-light leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-black/5">
        <div className="flex items-center justify-between text-sm mb-4">
          <div>
            <p className="text-xs text-[#737373]">{card.metricLabel1}</p>
            <p className="font-serif text-xl font-bold text-[#1c1917]">{card.metricValue1}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#737373]">{card.metricLabel2}</p>
            <p className="font-serif text-xl font-bold text-[#1c1917]">{card.metricValue2}</p>
          </div>
        </div>

        <Link
          to={card.link}
          className="group/btn relative inline-flex items-center h-10 pl-5 pr-11 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
        >
          <span 
            className="absolute right-1 top-1 bottom-1 w-8 group-hover/btn:w-[calc(100%-8px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
          />
          <span className="relative z-10 font-serif text-white group-hover/btn:text-[#2b1408] transition-colors duration-300 text-[14px] select-none">
            View details
          </span>
          <span className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-rotate-45" />
          </span>
        </Link>
      </div>
    </div>
  );
};

// Interactive Sticky Card Stack with slide-over scroll effect (Ditto Orenda demo)
const StickyProgramsStack = () => {
  const row2Ref = useRef(null);
  const [row1Scale, setRow1Scale] = useState(1);
  const [row1Dim, setRow1Dim] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!row2Ref.current) return;
      const rect = row2Ref.current.getBoundingClientRect();
      const targetTop = 136; // Sticky top offset for Row 2
      const startDistance = window.innerHeight * 0.78;

      if (rect.top <= targetTop) {
        setRow1Scale(0.96);
        setRow1Dim(0.92);
      } else if (rect.top >= startDistance) {
        setRow1Scale(1);
        setRow1Dim(1);
      } else {
        const progress = Math.max(0, Math.min(1, (startDistance - rect.top) / (startDistance - targetTop)));
        setRow1Scale(1 - progress * 0.04);
        setRow1Dim(1 - progress * 0.08);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      {/* DESKTOP LAYOUT (2 Stacking Rows of 2 Cards Each, with Row 2 Sliding Over Row 1) */}
      <div className="hidden md:block relative pb-36 lg:pb-52">
        {/* Row 1: Cards 1 & 2 - Pins at top-24/28 and gently scales down as Row 2 slides over */}
        <div 
          className="sticky top-24 lg:top-28 z-10 mb-8 lg:mb-12 origin-top transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${row1Scale})`,
            filter: `brightness(${row1Dim})`,
          }}
        >
          <div className="grid grid-cols-2 gap-8">
            <ProgramCardItem card={programCardsData[0]} />
            <ProgramCardItem card={programCardsData[1]} />
          </div>
        </div>

        {/* Row 2: Cards 3 & 4 - Slides UP and OVER Row 1 with drop shadow elevation and pins slightly lower */}
        <div 
          ref={row2Ref}
          className="sticky top-28 lg:top-36 z-20 rounded-[36px] transition-transform duration-200 ease-out"
          style={{
            boxShadow: '0 -20px 48px -12px rgba(0,0,0,0.14), 0 24px 48px -12px rgba(0,0,0,0.1)'
          }}
        >
          <div className="grid grid-cols-2 gap-8">
            <ProgramCardItem card={programCardsData[2]} />
            <ProgramCardItem card={programCardsData[3]} />
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (4 Individual Cards, each sliding over the previous) */}
      <div className="block md:hidden relative pb-24 space-y-6">
        {programCardsData.map((card, idx) => {
          const stickyTops = ['top-[76px]', 'top-[96px]', 'top-[116px]', 'top-[136px]'];
          const zIndexes = ['z-10', 'z-20', 'z-30', 'z-40'];
          return (
            <div 
              key={card.id}
              className={`sticky ${stickyTops[idx]} ${zIndexes[idx]} rounded-[32px] transition-transform duration-200`}
              style={idx > 0 ? {
                boxShadow: '0 -16px 36px -8px rgba(0,0,0,0.15), 0 20px 30px -10px rgba(0,0,0,0.08)'
              } : undefined}
            >
              <ProgramCardItem card={card} />
            </div>
          );
        })}
      </div>
    </>
  );
};

// Scroll-animated expanding community cluster card (Ditto Orenda)
const RadialLivesImpactedCard = () => {
  const cardRef = useRef(null);
  const [separationProgress, setSeparationProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start separating when top of card enters near bottom (95%)
      // Reach full separation smoothly as card centers in viewport (28%)
      const startY = windowHeight * 0.95;
      const endY = windowHeight * 0.28;

      const raw = (startY - rect.top) / (startY - endY);
      const progress = Math.min(Math.max(raw, 0), 1);

      setSeparationProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // 7 community avatars arranged in a mathematically equidistant, mirror-symmetrical ellipse
  const avatars = [
    { img: swasti_maam, targetX: 50, targetY: 12, rot: 0 },   // Top Center Crown
    { img: Avi_sir, targetX: 83, targetY: 26, rot: 8 },      // Upper Right
    { img: shreya, targetX: 17, targetY: 26, rot: -8 },      // Upper Left
    { img: chirag, targetX: 91, targetY: 58, rot: 12 },      // Mid Right
    { img: pushpanjali, targetX: 9, targetY: 58, rot: -12 },  // Mid Left
    { img: vanshika, targetX: 68, targetY: 84, rot: 6 },     // Bottom Right
    { img: shorya, targetX: 32, targetY: 84, rot: -6 },      // Bottom Left
  ];

  // Center text opacity and scale (revealed smoothly with spring ease)
  const textProgress = Math.min(Math.max((separationProgress - 0.2) / 0.8, 0), 1);
  const textOpacity = textProgress;
  const textScale = 0.78 + 0.22 * textProgress;

  return (
    <div
      ref={cardRef}
      className="group lg:col-span-7 rounded-[36px] bg-[#edeae1] p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[520px] sm:min-h-[580px] md:min-h-[620px] border border-black/5 shadow-sm overflow-hidden select-none"
    >
      {/* Center Metric Text (Revealed as avatars separate) */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="text-center z-10 space-y-1 pointer-events-none"
      >
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight">
          5,000+
        </h2>
        <p className="font-serif text-xl sm:text-2xl text-[#1c1917] font-normal">
          Lives Impacted
        </p>
      </div>

      {/* 7 Avatar Photos revolving continuously & separating radially on scroll */}
      <div 
        className="absolute inset-0 pointer-events-none animate-orbit"
        style={{ transformOrigin: '50% 50%' }}
      >
        {avatars.map((avatar, idx) => {
          // Progress goes from 0 (clustered tightly in center) to 1 (separated outward)
          const currentFactor = 0.16 + 0.84 * separationProgress;
          const currentX = 50 + (avatar.targetX - 50) * currentFactor;
          const currentY = 50 + (avatar.targetY - 50) * currentFactor;
          const scale = 0.82 + 0.18 * separationProgress;

          return (
            <div
              key={idx}
              style={{
                left: `${currentX}%`,
                top: `${currentY}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: idx + 5,
              }}
              className="absolute pointer-events-auto"
            >
              {/* Counter-rotating portrait container (keeps face upright!) */}
              <div 
                className="animate-orbit-counter w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg hover:scale-115 hover:z-30 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{ transformOrigin: 'center center' }}
              >
                <img src={avatar.img} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Landing = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Hero Stacked Campaign Cards Hover State
  const [isCardsHovered, setIsCardsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);

  const heroStackedCampaigns = [
    {
      id: 'kitabi-udaan',
      title: ['Kitabi Udaan', 'Book Drive'],
      badge: 'Active campaign',
      image: kitabi3,
      anchorId: 'programs-section'
    },
    {
      id: 'welfare-drive',
      title: ['Community Relief', '& Welfare Drive'],
      badge: 'Active campaign',
      image: team1,
      anchorId: 'programs-section'
    },
    {
      id: 'cleanliness',
      title: ['Swachhata & Green', 'Cleanliness Drive'],
      badge: 'Active campaign',
      image: clean1,
      anchorId: 'programs-section'
    }
  ];

  // Section 2: Trusted Partners Marquee Data
  const trustedPartners = [
    {
      name: 'Kitabi Udaan Foundation',
      type: 'Education Partner',
      icon: (
        <svg className="w-5 h-5 text-[#2b1408]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      name: 'Youth Red Cross India',
      type: 'Health & Youth',
      icon: (
        <svg className="w-5 h-5 text-red-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
        </svg>
      )
    },
    {
      name: 'Swachh Bharat Abhiyan Allied',
      type: 'Sanitation Drive',
      icon: (
        <svg className="w-5 h-5 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      name: 'Campus Welfare Alliance',
      type: 'Student Network',
      icon: (
        <svg className="w-5 h-5 text-sky-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      name: 'Rotaract Social Partners',
      type: 'Community Outreach',
      icon: (
        <svg className="w-5 h-5 text-amber-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      )
    },
    {
      name: 'Goonj Uplift Initiative',
      type: 'Dignity & Relief',
      icon: (
        <svg className="w-5 h-5 text-purple-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      name: 'Pratham Youth Network',
      type: 'Literacy Mission',
      icon: (
        <svg className="w-5 h-5 text-rose-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    campaign: 'Kitabi Udaan Book Drive',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || 'N/A',
      volunteerRole: formData.campaign,
      message: formData.message,
      purpose: 'Donation / Support'
    };

    try {
      await emailjs.send(
        'service_8rajhvu',
        'template_e58qn9i',
        templateParams,
        'g_KEysJ0UB13F3nUs'
      );

      try {
        await fetch(`${API_BASE}/volunteers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            purpose: 'Donation / Support',
            volunteerRole: formData.campaign,
            message: formData.message
          })
        });
      } catch (backendErr) {
        console.warn('Backend save skipped:', backendErr);
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        campaign: 'Kitabi Udaan Book Drive',
        message: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How does the "Kitabi Udaan" project work?',
      a: 'We collect old, discarded, or half-filled notebooks from schools and colleges. Volunteers tear out the clean, unused sheets, bind them into brand-new recycled notebooks, and distribute them along with stationery to underprivileged children.'
    },
    {
      q: 'Can college students join as active volunteers?',
      a: 'Absolutely! Ek-Prayass thrives on youth participation. Whether your skills are in event management, content writing, design, photography, or fieldwork, there is an essential place for you in our team.'
    },
    {
      q: 'How are donations and materials utilized?',
      a: '100% of collected books, stationery, sanitary products, and financial contributions go directly towards our on-ground community drives and beneficiaries. We maintain absolute transparency in every initiative.'
    },
    {
      q: 'How can an organization or college collaborate with Ek-Prayass?',
      a: 'We frequently collaborate with educational institutes, colleges, and fellow NGOs for joint cleanliness campaigns, menstrual hygiene camps, and book donation drives. Simply submit the form below or reach out to us directly.'
    }
  ];

  return (
    <div className="w-full bg-[#f8f4ec] text-[#292929] overflow-x-clip">
      
      {/* =========================================================================
          1. HERO SECTION (DITTO ORENDA: Giant Rounded Photo Card with Bottom Overlay)
      ========================================================================= */}
      <section className="p-2.5 sm:p-4 lg:p-6 w-full max-w-[1536px] mx-auto pt-3 sm:pt-4">
        <div className="relative w-full h-[88vh] min-h-[620px] max-h-[820px] rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-2xl">
          
          {/* Full-bleed high-res background image */}
          <img 
            src={heroImage} 
            alt="Ek-Prayass smiling children and volunteers" 
            className="w-full h-full object-cover object-center"
          />

          {/* Dark gradient overlay from bottom up */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.04) 100%)'
            }}
          ></div>

          {/* Bottom-Left Content: Heading, Subtitle & Dual Action Buttons */}
          <div className="absolute bottom-8 left-6 sm:bottom-14 sm:left-14 max-w-xl z-20">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.08] mb-4">
              Building A<br />Better Tomorrow
            </h1>

            <p className="text-white/85 text-base sm:text-lg font-light leading-relaxed max-w-md mb-7">
              Empowering communities through sustainable programs, transparency, and measurable impact.
            </p>

            {/* Buttons Row with Circular Arrows & Sliding Hover Fill Animation */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Button 1: Join Us (Dark Brown Pill with Light Sliding Fill) */}
              <Link
                to="/volunteer"
                className="relative overflow-hidden bg-[#2b1408] text-white rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 font-medium text-sm sm:text-base border border-white/20 hover:border-white transition-all duration-300 group shadow-lg"
              >
                {/* Sliding Wipe Fill Layer */}
                <span 
                  className="absolute inset-0 bg-[#f5f3ef] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full pointer-events-none"
                />

                <span className="relative z-10 text-white group-hover:text-[#2b1408] transition-colors duration-300">
                  Join us
                </span>

                <span className="relative z-10 w-9 h-9 rounded-full bg-white group-hover:bg-transparent text-[#2b1408] flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </Link>

              {/* Button 2: Donate Now (Light Cream Pill with Dark Sliding Fill) */}
              <button
                onClick={() => document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden bg-[#f5f3ef] text-[#2b1408] rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 font-medium text-sm sm:text-base border border-transparent hover:border-white transition-all duration-300 group shadow-lg"
              >
                {/* Sliding Wipe Fill Layer */}
                <span 
                  className="absolute inset-0 bg-[#2b1408] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full pointer-events-none"
                />

                <span className="relative z-10 text-[#2b1408] group-hover:text-white transition-colors duration-300">
                  Donate now
                </span>

                <span className="relative z-10 w-9 h-9 rounded-full bg-[#2b1408] text-white flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              Bottom-Right Interactive Stacked Cards Widget (Identical to Orenda Framer)
              Default: 3D stacked deck with Card 3 in front, Cards 1 & 2 peeking from top.
              Hover: Fans out smoothly upwards into a full vertical column of 3 distinct cards.
          ========================================================================= */}
          <div 
            className={`absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-30 hidden md:block w-[355px] ${
              isCardsHovered ? 'h-[345px]' : 'h-[135px]'
            } transition-[height] duration-300 pointer-events-auto select-none`}
            onMouseEnter={() => setIsCardsHovered(true)}
            onMouseLeave={() => {
              setIsCardsHovered(false);
              setHoveredCardIdx(null);
            }}
          >
            {heroStackedCampaigns.map((card, idx) => {
              // idx 0 = Clean Water (Top card when expanded)
              // idx 1 = Education (Middle card when expanded)
              // idx 2 = Green Earth (Bottom / Front card in both states)
              
              let translateY = 0;
              let scale = 1;
              let zIndex = 10;
              
              if (!isCardsHovered) {
                // Collapsed 3D stacked deck state
                if (idx === 0) {
                  translateY = -28; // Peeks highest
                  scale = 0.91;
                  zIndex = 10;
                } else if (idx === 1) {
                  translateY = -14; // Peeks in middle
                  scale = 0.955;
                  zIndex = 20;
                } else {
                  translateY = 0;   // Front active card
                  scale = 1;
                  zIndex = 30;
                }
              } else {
                // Expanded vertical column state
                if (idx === 0) {
                  translateY = -228;
                  scale = hoveredCardIdx === 0 ? 1.02 : 1;
                  zIndex = hoveredCardIdx === 0 ? 35 : 15;
                } else if (idx === 1) {
                  translateY = -114;
                  scale = hoveredCardIdx === 1 ? 1.02 : 1;
                  zIndex = hoveredCardIdx === 1 ? 35 : 20;
                } else {
                  translateY = 0;
                  scale = hoveredCardIdx === 2 ? 1.02 : 1;
                  zIndex = hoveredCardIdx === 2 ? 35 : 25;
                }
              }

              // Determine arrow icon:
              // Unhovered: Card 2 has ArrowRight
              // Hovered: If this card is hovered OR (no card is individually hovered and idx === 2), show ArrowUpRight
              const showDiagonalArrow = isCardsHovered && (hoveredCardIdx === idx || (hoveredCardIdx === null && idx === 2));

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    document.getElementById(card.anchorId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    transformOrigin: 'bottom center',
                    zIndex: zIndex,
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease'
                  }}
                  className={`absolute bottom-0 left-0 right-0 h-[102px] rounded-[24px] p-3 flex items-center justify-between gap-3.5 cursor-pointer border ${
                    isCardsHovered && hoveredCardIdx === idx
                      ? 'bg-white border-white shadow-[0_20px_45px_rgba(0,0,0,0.22)]'
                      : 'bg-[#f5f3ef]/95 backdrop-blur-md border-white/80 shadow-[0_12px_32px_rgba(0,0,0,0.18)]'
                  }`}
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <img 
                      src={card.image} 
                      alt={card.title.join(' ')} 
                      className="w-[78px] h-[78px] rounded-[16px] object-cover flex-shrink-0 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[17px] sm:text-[18px] font-normal text-[#1c1917] leading-[1.22] tracking-tight">
                        {card.title[0]}<br />{card.title[1]}
                      </h4>
                      <p className="text-[12px] text-[#666666] font-sans font-normal mt-1.5 flex items-center">
                        {card.badge}
                      </p>
                    </div>
                  </div>

                  {/* Right: Arrow Icon */}
                  <div className="flex-shrink-0 pr-1.5">
                    {showDiagonalArrow ? (
                      <ArrowUpRight className="w-5 h-5 text-[#1c1917] transition-transform" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-[#1c1917] transition-transform" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. SECTION 2: TRUSTED PARTNERS (Continuous Rolling Marquee Ticker)
          Smoothly rolls from one end to the other infinitely, with soft edge fades.
      ========================================================================= */}
      <section className="py-12 sm:py-16 w-full overflow-hidden">
        {/* Section title */}
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-sm font-medium text-[#737373] tracking-wide">Our trusted partners</p>
        </div>

        {/* Rolling Marquee Ticker Track with 3D Card Depth */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Edge Gradient Fades for Smooth Rolling In/Out */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#f8f4ec] via-[#f8f4ec]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#f8f4ec] via-[#f8f4ec]/80 to-transparent z-10 pointer-events-none"></div>

          {/* Infinite Marquee Track with Duplicated Sets */}
          <div className="animate-marquee flex select-none py-4 items-center">
            {/* Set 1 */}
            <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 flex-shrink-0 items-center">
              {trustedPartners.map((partner, idx) => (
                <PartnerCard3D key={`p1-${idx}`} partner={partner} />
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless 100% infinite loop) */}
            <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 flex-shrink-0 items-center" aria-hidden="true">
              {trustedPartners.map((partner, idx) => (
                <PartnerCard3D key={`p2-${idx}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION 3: SCROLL-ANIMATED MISSION QUOTE (Line-by-line blur reveal)
      ========================================================================= */}
      <ScrollBlurMissionQuote />

      {/* =========================================================================
          4. SECTION 4: OUR MISSION & PROGRAMS GRID (Ditto Screenshot `cards_programs_section`)
      ========================================================================= */}
      <section id="programs-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header with "View all ->" pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#737373] font-semibold">Our Mission</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1917] tracking-tight">
              Together, we turn kindness into lasting change
            </h2>
          </div>
          <Link
            to="/project"
            className="group relative inline-flex items-center h-10 pl-6 pr-11 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
          >
            <span 
              className="absolute right-1 top-1 bottom-1 w-8 group-hover:w-[calc(100%-8px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            />
            <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-[15px] select-none">
              View all
            </span>
            <span className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-45" />
            </span>
          </Link>
        </div>

        {/* Sticky Stacking Program Cards (Slide-over scroll deck) */}
        <StickyProgramsStack />

      </section>

      {/* =========================================================================
          5. SECTION 5: IMPACT BENTO GRID (Ditto Screenshot `stories_stats_section`)
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Big Radial Card: 5,000+ Lives Impacted with Scroll Separation Animation */}
          <RadialLivesImpactedCard />

          {/* Right Bento Column: 2 Cards (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Top Photo Card */}
            <div className="rounded-[36px] overflow-hidden aspect-[16/10] bg-slate-200 border border-black/5 shadow-sm">
              <img 
                src={team1} 
                alt="Ek-Prayass volunteer fellowship" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Total Metric Card */}
            <div className="rounded-[36px] bg-[#edeae1] p-8 border border-black/5 shadow-sm flex flex-col justify-between flex-1">
              <div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1917]">100+</p>
                <p className="font-serif text-lg text-[#1c1917] mt-1">Dedicated Volunteers</p>
              </div>
              <div className="mt-6 flex justify-end">
                <Link
                  to="/team"
                  className="group relative inline-flex items-center h-10 pl-5 pr-11 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
                >
                  <span 
                    className="absolute right-1 top-1 bottom-1 w-8 group-hover:w-[calc(100%-8px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                  />
                  <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-[14px] select-none">
                    Meet team
                  </span>
                  <span className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-45" />
                  </span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. SECTION 6: FEATURE CALLOUT WITH CARE PHOTO (Ditto Screenshot `footer_section_orenda`)
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="rounded-[36px] overflow-hidden shadow-xl border border-black/5 aspect-[4/3]">
              <img 
                src={team5} 
                alt="Community care workshop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#edeae1] text-[#2b1408] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1917] leading-tight">
              Healing lives with care and compassion
            </h2>
            <p className="text-base text-[#666666] font-light leading-relaxed">
              We provide essential educational notebooks, health supplies, and dedicated support to children and families who need it most.
            </p>
            <div className="pt-2">
              <button
                onClick={() => document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center h-11 pl-6 pr-12 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
              >
                <span 
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-8 group-hover:w-[calc(100%-12px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                />
                <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-[15px] select-none">
                  Support our work
                </span>
                <span className="absolute right-1.5 top-1.5 bottom-1.5 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. SECTION 7: 20+ SUCCESSFUL EVENTS (Ditto Screenshot `stories_gallery_bento_bottom`)
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-black/8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1c1917] tracking-tight">
              20+ Successful events
            </h2>
            <p className="text-sm text-[#737373] font-light">
              Highlighting moments that created real impact and lasting change
            </p>
          </div>
          <Link
            to="/gallery"
            className="group relative inline-flex items-center h-10 pl-6 pr-11 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-sm flex-shrink-0"
          >
            <span 
              className="absolute right-1 top-1 bottom-1 w-8 group-hover:w-[calc(100%-8px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            />
            <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-[15px] select-none">
              View all
            </span>
            <span className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-45" />
            </span>
          </Link>
        </div>

        {/* 3 Event Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Kitabi Udaan Distribution Camp",
              metric: "300+ Students Gifted",
              desc: "Distributing recycled notebooks, pencils, and educational kits to primary school students in nearby villages.",
              img: kitabi2
            },
            {
              title: "Kanpur Community Cleanliness Drive",
              metric: "50+ Volunteers Joined",
              desc: "Sensitizing neighborhoods on proper plastic waste disposal, planting green saplings, and cleaning public parks.",
              img: clean2
            },
            {
              title: "Menstrual Health & Dignity Workshop",
              metric: "200+ Sanitary Kits Handed",
              desc: "Open dialogues, removing stigmas, and equipping adolescent girls with personal hygiene essentials.",
              img: team3
            }
          ].map((event, idx) => (
            <div 
              key={idx}
              className="rounded-[32px] p-6 bg-white border border-black/5 shadow-sm space-y-4 group"
            >
              <div className="relative rounded-[22px] overflow-hidden aspect-[16/10] bg-slate-100">
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-semibold text-[#8b6a2a] bg-[#f8f4ec] px-3 py-1 rounded-full inline-block">
                {event.metric}
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#1c1917]">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                {event.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          8. SECTION 8: 3-STEP DONATION & INVOLVEMENT FORM
      ========================================================================= */}
      <section id="donate-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-black/8">
        
        {/* Step Guide Bar */}
        <div className="mb-12 bg-white border border-black/8 rounded-3xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="w-8 h-8 rounded-full bg-[#2b1408] text-white flex items-center justify-center font-bold text-sm">01</span>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#737373] font-semibold">Step One</p>
                <p className="text-sm font-serif font-bold text-[#1c1917]">Choose Campaign</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="w-8 h-8 rounded-full bg-[#2b1408] text-white flex items-center justify-center font-bold text-sm">02</span>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#737373] font-semibold">Step Two</p>
                <p className="text-sm font-serif font-bold text-[#1c1917]">Enter Your Details</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="w-8 h-8 rounded-full bg-[#2b1408] text-white flex items-center justify-center font-bold text-sm">03</span>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#737373] font-semibold">Step Three</p>
                <p className="text-sm font-serif font-bold text-[#1c1917]">Receive Confirmation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Form Box */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 border border-black/8 shadow-xl">
          <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1c1917]">
              Make A Difference Today
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-light">
              Support our grassroots drives with stationery donations, volunteering hours, or sponsorship.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#2b1408]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. rahul@gmail.com"
                  className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#2b1408]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#2b1408]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Select Campaign / Cause</label>
                <select
                  name="campaign"
                  value={formData.campaign}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#2b1408] cursor-pointer"
                >
                  <option value="Kitabi Udaan Book Drive">Kitabi Udaan (Recycled Books for Kids)</option>
                  <option value="Swachhata Drive">Swachhata & Sanitation Campaign</option>
                  <option value="Menstrual Health">Menstrual Health & Dignity Camp</option>
                  <option value="General Volunteering">General Volunteer Application</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1c1917]">Message / Contribution Note *</label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how you would like to help or contribute..."
                className="w-full px-4 py-3 bg-[#f8f4ec] border border-black/10 rounded-2xl text-sm focus:outline-none focus:border-[#2b1408] resize-none"
              ></textarea>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center h-11 pl-7 pr-12 rounded-full bg-[#2b1408] border-2 border-[#2b1408] overflow-hidden shadow-md disabled:opacity-50 flex-shrink-0"
              >
                <span 
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-8 group-hover:w-[calc(100%-12px)] rounded-full bg-[#f8f5ee] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                />
                <span className="relative z-10 font-serif text-white group-hover:text-[#2b1408] transition-colors duration-300 text-[15px] select-none">
                  {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
                </span>
                <span className="absolute right-1.5 top-1.5 bottom-1.5 w-8 flex items-center justify-center text-[#2b1408] z-10 pointer-events-none">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </button>

              {submitStatus === 'success' && (
                <p className="text-xs text-emerald-600 font-medium mt-3">
                  Thank you! Your information has been received. Our coordinator will contact you shortly.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-xs text-rose-600 font-medium mt-3">
                  Something went wrong. Please try again or email us directly at contact.ekprayass@gmail.com
                </p>
              )}
            </div>

          </form>
        </div>

      </section>

      {/* =========================================================================
          9. SECTION 9: FAQ ACCORDION
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-black/8">
        
        <div className="text-center mb-12 space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#737373] font-semibold">FAQ</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1c1917]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-[24px] bg-white border border-black/6 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif text-lg font-normal text-[#1c1917] hover:text-[#2b1408] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-[#f8f4ec] flex items-center justify-center flex-shrink-0 text-[#2b1408]">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[#666666] text-sm font-light leading-relaxed border-t border-black/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};

export default Landing;

