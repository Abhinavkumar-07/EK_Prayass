import React, { useState } from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';
import './App.css'
import './index.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import Form from './components/Form.jsx';
import Team from './pages/Team.jsx';
import Project from './pages/Project.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Notice from './pages/Notice.jsx';
import Landing from './pages/Landing.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Partners from './pages/Partners.jsx';
import Gallery from './pages/Gallery.jsx';
import Hackathon from './pages/Hackathon.jsx'; // TEMPORARY: Remove after October 2026
import ClubMemberDashboard from './pages/ClubMemberDashboard.jsx';


function App () {
    const location = useLocation();
    const isAdmin = location.pathname === '/admin';
    const isClubMember = location.pathname === '/clubmember';
    
    // Temporarily hide shell completely since main site is off
    const hideShell = true;

    return(
        <div className="flex flex-col min-h-screen bg-white">
        {!hideShell && (
          <div className="sticky top-0 z-50 w-full flex flex-col shadow-md">
            <Navbar />
            <Link
              to="/hackathon"
              onClick={() => window.scrollTo(0, 0)}
              className="relative block bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-black py-4 px-6 text-center group hover:from-amber-400 hover:via-amber-300 hover:to-yellow-300 transition-all duration-300"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-base md:text-lg font-semibold">
                <span className="animate-pulse text-xl">🚀</span>
                <span className="hidden sm:inline opacity-90">Ek-Prayass presents</span>
                <span className="font-black tracking-tight text-xl">AAVISHKAAR</span>
                <span className="bg-black text-amber-400 text-sm font-bold px-4 py-1.5 rounded-full ml-3 group-hover:bg-black/80 group-hover:-translate-y-0.5 transition-all shadow-sm">
                    Register Now →
                </span>
              </div>
            </Link>
          </div>
        )}

        <main className="flex-grow flex flex-col">
            <Routes>
                {/* --- MAIN SITE TEMPORARILY DISABLED --- 
                <Route path ='/' element={<Landing />} />
                <Route path='/about' element={<About />} />
                <Route path='/team' element={<Team />} />
                <Route path='/project' element={<Project />} />
                <Route path='/volunteer' element={<Volunteer />} />
                <Route path='/form' element={<Form />} />
                <Route path='/notice' element={<Notice />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/partners' element={<Partners />} />
                */}

                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/clubmember' element={<ClubMemberDashboard />} />
                
                {/* Make Hackathon the main page for now */}
                <Route path='/' element={<Hackathon />} /> 
                <Route path='*' element={<Hackathon />} />
            </Routes>
        </main>
           

        {!hideShell && <Footer />}
        <Analytics />
        </div>
    )
}
export default App;
