import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from '../pages/About.jsx';
import Form from '../components/Form.jsx';
import { useNavigate, useLocation  } from 'react-router-dom';


const Volunteer = () => {
  useEffect(() => {
    document.title = 'Volunteer | Ek-Prayass';
    return () => { document.title = 'Ek Prayass'; };
  }, []);

    const navigate = useNavigate();
  const location = useLocation();

  const handleGetInvolvedClick = () => {
    if (location.pathname === '/') {
     
      const formEl = document.getElementById('form');
      formEl?.scrollIntoView({ behavior: 'smooth' });
    } else {
     
      navigate('/');
      setTimeout(() => {
        const formEl = document.getElementById('form');
        formEl?.scrollIntoView({ behavior: 'smooth' });
      }, 200);  
    }
  };    

  return (
        <div className="bg-slate-50 min-h-screen relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-cyan-300/30 to-teal-400/30 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-sky-300/30 to-teal-400/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-teal-300/30 to-emerald-400/30 rounded-full blur-[90px] animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Header Area */}
            <div className="relative z-10 pt-28 pb-20 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-8">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 drop-shadow-sm">Domains</span>
                    </h1>
                    <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80 ring-1 ring-slate-900/5">
                         <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                             Discover the diverse areas where we excel and make a meaningful impact through our dedicated volunteer work.
                         </p>
                    </div>
                </div>
            </div>

            {/* Domains Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    
                    {[
                        { title: "Event Management", desc: "We organize and manage events with creativity and precision, ensuring a memorable experience for everyone.", color: "cyan" },
                        { title: "Public Speaking", desc: "Public speaking is the powerful art of expressing thoughts, inspiring minds, and connecting with people through words.", color: "teal" },
                        { title: "Social Media Handling", desc: "Social media handling is the strategic art of creating, managing, and growing an online presence to connect communities.", color: "sky" },
                        { title: "Mime & Skit", desc: "Mime and skit are powerful forms of creative expression that convey meaningful stories, emotions, and messages.", color: "emerald" },
                        { title: "Public Relations", desc: "Public Relations and Outreach focus on building meaningful connections and fostering positive relationships.", color: "indigo" },
                        { title: "Graphic Design", desc: "Graphic design is the creative craft of visually communicating ideas, messages, and emotions through compelling imagery.", color: "violet" },
                        { title: "Photography & Video", desc: "Photography and videography capture moments, tell stories, and bring visions to life through visuals and creativity.", color: "fuchsia" },
                        { title: "Content Writing", desc: "Content writing is the art of crafting engaging, informative, and persuasive text that connects with audiences.", color: "rose" }
                    ].map((domain, index) => (
                        <div key={index} className="group h-full animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="h-full bg-white/70 backdrop-blur-md rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-white/50 ring-1 ring-slate-900/5 hover:-translate-y-2 relative overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100/50 to-teal-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 group-hover:text-cyan-600 transition-colors duration-300 leading-tight">
                                        {domain.title}
                                    </h3>
                                    <p className="text-slate-600 text-base leading-relaxed flex-grow font-light">
                                        {domain.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[3rem] shadow-2xl p-12 lg:p-16 text-center transform relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-white/20 transition-colors duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-lg md:text-xl text-teal-50 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                            Join us in these exciting domains and help create positive change in our community. Your skills and passion can make a real impact!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button 
                                onClick={handleGetInvolvedClick}
                                className="w-full sm:w-auto bg-white text-teal-700 font-semibold py-4 px-10 rounded-xl hover:bg-cyan-50 transition-all duration-300 shadow-xl hover:shadow-cyan-900/20 transform hover:-translate-y-1 text-lg">
                                Get Involved Today
                            </button>
                            <Link to="/about" className="w-full sm:w-auto">
                                <button className="w-full border-2 border-white/80 hover:border-white text-white font-semibold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-lg backdrop-blur-sm">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Volunteer;   
