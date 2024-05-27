import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import logo from '../assets/TaskSync1.png';
import '../config/style.css';

export default function Signup({ onSwitchToLogin }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const userCredentials = { firstname, lastname, email, password };
            localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
            onSwitchToLogin();  // Redirect to login after successful signup
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <img className='logo-photo' src={logo} alt="TaskSync Logo" />
                    <h2>TaskSync</h2>
                </div>
            </div>

            <div className="form-container">
                <form onSubmit={handleSignup} className="form">
                    <div className='text'>
                        <h2>Create an Account</h2>
                        <p>Enter your details to create an account</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input 
                            type="text" 
                            id="firstname" 
                            value={firstname} 
                            onChange={(e) => setFirstname(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input 
                            type="text" 
                            id="lastname" 
                            value={lastname} 
                            onChange={(e) => setLastname(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-signup">Sign Up</button>
                    <div className="login-link">
                        <p>Already have an account? <a href="#sign-up" className="login-link-btn" onClick={onSwitchToLogin}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
