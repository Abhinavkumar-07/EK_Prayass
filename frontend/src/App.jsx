import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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


function App () {
    const location = useLocation();
    const isAdmin = location.pathname === '/admin';

    return(
        <div className="flex flex-col min-h-screen bg-white">
        {!isAdmin && <Navbar />}

        <main className="flex-grow flex flex-col">
            <Routes>
                <Route path ='/' element={<Landing />} />
                <Route path='/about' element={<About />} />
                <Route path='/team' element={<Team />} />
                <Route path='/project' element={<Project />} />
                <Route path='/volunteer' element={<Volunteer />} />
                <Route path='/form' element={<Form />} />
                <Route path='/notice' element={<Notice />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/partners' element={<Partners />} />
                <Route path='/admin' element={<AdminDashboard />} />
            </Routes>
        </main>
           

        {!isAdmin && <Footer />}
        </div>
    )
}
export default App;