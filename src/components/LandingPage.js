import React from 'react';
import '../config/style.css';
import TaskSync from '../assets/TaskSync1.png';  // Assuming you have this image in your src folder

function LandingPage({ onSwitchToLogin, onSwitchToSignup }) {
    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo">
                    <h2>TaskSync</h2>
                </div>
                <ul className="nav-links">
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#login" onClick={onSwitchToLogin}>Log In</a></li>
                    <li><a href="#get-started" className="get-started-btn" onClick={onSwitchToSignup}>Get Started</a></li>
                    <li><a href="#get-app" className="get-app-btn">Get App</a></li>
                </ul>
            </nav>
            <header className="App-header">
                <div className="header-content">
                    <h1>Collaboration and Organization</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <button className="get-started-button" onClick={onSwitchToSignup}>Get Started</button>
                </div>
                <div className="header-image">
                    <img src={TaskSync} alt="Calendar and Hourglass" />
                </div>
            </header>
        </div>
    );
}

export default LandingPage;
