import React from 'react';
import Home from '../components/Home.jsx';
import About from './About.jsx';
import Team from './Team.jsx';
import Form from '../components/Form.jsx';

const Landing = () => {
    return (
        <div>
            <Home />
            <About />
            <Team isHome={true} />
            <Form />
        </div>
    )
}
export default Landing;