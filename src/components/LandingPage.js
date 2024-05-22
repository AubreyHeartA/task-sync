import React from 'react';
import '../config/style.css';
import photo from '../assets/123.jpg';  // Assuming you have this image in your src folder

function LandingPage({ onSwitchToLogin, onSwitchToSignup }) {
    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo">
                    <h2>TaskSync</h2>
                </div>
                <ul className="nav-links">
                    <li><a href="#login" onClick={onSwitchToLogin}>Log In</a></li>
                    <li><a href="#get-started" className="get-started-btn" onClick={onSwitchToSignup}>Get Started</a></li>
                    <li><a href="#get-app" className="get-app-btn">Get App</a></li>
                </ul>
            </nav>
            <header className="App-header">
                <div className="header-content">
                    <h1>Collaboration and Organization</h1>
                    <p>Unlock the power of collaboration and organization with our platform, designed to 
                    seamlessly bring teams together, streamline workflows, and achieve extraordinary results</p>
                    <button className="get-started-button" onClick={onSwitchToSignup}>Get Started</button>
                </div>
                <div className="header-image">
                    <img className='photo' src={photo} alt="Calendar and Hourglass" />
                </div>
            </header>
        </div>
    );
}

export default LandingPage;
