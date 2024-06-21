import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import logo from '../assets/TaskSync1.png';
import '../config/style.css';

const Login = ({ onSwitchToSignup, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(firestore, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User data:', userData); // Display user data in console
                if (rememberMe) {
                    localStorage.setItem('userEmail', email);
                }
                onLogin();
            } else {
                alert('User data not found');
            }
        } catch (error) {
            alert('Invalid email or password: ' + error.message);
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
                    <div className="signup-link">
                        <p>Don't have an account? <a href="#sign-up" className="signup-link-btn" onClick={onSwitchToSignup}>Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
