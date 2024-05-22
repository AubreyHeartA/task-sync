import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../assets/tasksync.png';
import '../config/style.css'

const Login = ({ onSwitchToSignup, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // // Dummy authentication logic
        // if (email === 'user@example.com' && password === 'password') {
        // onLogin();
        // } else {
        // setError('Invalid email or password');
        // }
        onLogin();
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here
    };

  return (
    <div>
        <div className="header">
            <div className='logo-container'>
                <img className="image" src={logo} alt="tasksync logo" />
            </div>
        </div>

        <div className='form-container'>
            <form onSubmit={handleLogin} className="form">
                <div className='text'>
                    <h2>Hi, Welcome Back</h2>
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
                <div className="form-group remember-me">
                    <input 
                        type="checkbox" 
                        id="rememberMe" 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)} 
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" className="btn-login">Login</button>
                <div className="forgot-password">
                    <Button className="forgot-password-link" onClick={handleForgotPassword}>Forgot Password?</Button>
                </div>
                <div className="signup-link">
                    <p>Don't have an account? <a href="#" onClick={onSwitchToSignup}>Sign Up</a></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login;


