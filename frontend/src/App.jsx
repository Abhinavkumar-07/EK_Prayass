import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import './index.css';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';
import Landing from './pages/Landing.jsx';
import About from './pages/About.jsx';
import Team from './pages/Team.jsx';
import Project from './pages/Project.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Notice from './pages/Notice.jsx';
import Gallery from './pages/Gallery.jsx';
import Partners from './pages/Partners.jsx';
import Form from './components/Form.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ClubMemberDashboard from './pages/ClubMemberDashboard.jsx';
import Hackathon from './pages/Hackathon.jsx';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const isClubMember = location.pathname === '/clubmember';
  const hideShell = isAdmin || isClubMember;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f4ec] text-[#292929] selection:bg-[#4a1c00] selection:text-white">
      {!hideShell && <Preloader />}
      {!hideShell && <Navbar />}

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/project" element={<Project />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/form" element={<Form />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/clubmember" element={<ClubMemberDashboard />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      {!hideShell && <Footer />}
      <Analytics />
    </div>
  );
}

export default App;
