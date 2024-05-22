import React from 'react';

import '../config/style.css';
import logo from  '../assets/TaskSync1.png';
import photo from '../assets/Organizing projects-bro.png';  // Assuming you have this image in your src folder

function LandingPage({ onSwitchToLogin, onSwitchToSignup }) {
    const getApp = () => {
        window.open("https://www.mediafire.com/file/9qmqxp2up7tjbv4/TaskSync.apk/file", "_blank").focus();
    };

    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo">
                    <img className='logo-photo' src={logo} alt="TaskSync Logo" />
                    <h2>TaskSync</h2>
                </div>
                <ul className="nav-links">
                    <li><a href="#login" onClick={onSwitchToLogin}>Log In</a></li>
                    <li><a href="#get-started" className="get-started-btn" onClick={onSwitchToSignup}>Get Started</a></li>
                    <li><a href="#get-app" onClick={getApp} className="get-app-btn">Get App</a></li>
                </ul>
            </nav>
            <div className="App-header">
                <div className="header-content">
                    <h1>Collaboration and Organization</h1>
                    <p>Unlock the power of collaboration and organization with our platform, designed to 
                    seamlessly bring teams together, streamline workflows, and achieve extraordinary results</p>
                    <button className="get-started-button" onClick={onSwitchToSignup}>Get Started</button>
                </div>
                <div className="header-image">
                    <img className='photo' src={photo} alt="Calendar and Hourglass" />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
