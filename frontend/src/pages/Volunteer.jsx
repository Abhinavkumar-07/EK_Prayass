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
        <div className="bg-gradient-to-br from-cyan-50 via-white to-sky-50 min-h-screen p-4">

          
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-sky-400 to-teal-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-3xl"></div>
            </div>

            
            <div className="relative z-10 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block mb-6">
                            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
                                Our Domains
                            </h1>
                            <div className="w-full h-2 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4 shadow-lg"></div>
                        </div>
                        <p className="text-xl md:text-2xl text-teal-700 max-w-4xl mx-auto leading-relaxed font-medium">
                            Discover the diverse areas where we excel and make a meaningful impact through our dedicated volunteer work
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    
                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Event Management
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                We organize and manage events with creativity and precision, ensuring a memorable experience for everyone.
                            </p>
                            
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Public Speaking
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Public speaking is the powerful art of expressing thoughts, inspiring minds, and connecting with people through words.
                            </p>
                           
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Social Media Handling
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Social media handling is the strategic art of creating, managing, and growing an online presence to connect, engage, and inspire communities.
                            </p>
                            
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                           
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Mime & Skit
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Mime and skit are powerful forms of creative expression that convey meaningful stories, emotions, and messages through performance, gestures, and drama.
                            </p>
                            
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Public Relations and Outreach
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Public Relations and Outreach focus on building meaningful connections, spreading awareness, and fostering positive relationships between organizations and the community.
                            </p>
                           
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Graphic Design
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Graphic design is the creative craft of visually communicating ideas, messages, and emotions through compelling images, typography, and layouts.
                            </p>
                            
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Photography & Videography
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Photography and videography capture moments, tell stories, and bring visions to life through the power of visuals and creativity.
                            </p>
                            
                        </div>
                    </div>

                    <div className="group bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 p-8 border-2 border-cyan-200/50 hover:border-teal-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            
                            <h3 className="text-2xl font-bold text-teal-800 mb-4 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                                Content Writing
                            </h3>
                            <p className="text-teal-700 text-base leading-relaxed flex-grow">
                                Content writing is the art of crafting engaging, informative, and persuasive text that connects with audiences and drives meaningful action.
                            </p>
                           
                        </div>
                    </div>

                </div>
            </div>

               <div className="relative z-10 bg-gradient-to-r from-teal-500 to-cyan-500 py-20  rounded-3xl shadow-2xl">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-lg">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl text-cyan-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
                            Join us in these exciting domains and help create positive change in our community. Your skills and passion can make a real impact!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                            onClick={handleGetInvolvedClick }
                            className="bg-white text-teal-600 font-bold py-4 px-10 rounded-full hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
                                Get Involved Today
                            </button>
                            <Link to="/about">
                            <button className="border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
                                Learn More
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

               
        </div>
        
    )
}
export default Volunteer;   
