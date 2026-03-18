import Reacr from 'react';
import Home from '../components/Home.jsx';
import About from '../pages/About.jsx';
import Team from '../pages/Team.jsx';
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