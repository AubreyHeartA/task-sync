import React, { useState, useEffect } from 'react';
import { MdAccountCircle, MdHome, MdInfo } from 'react-icons/md';

import '../config/style.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../sections/Dashboard';
import Task from '../sections/Tasks';
// import Settings from '../sections/Settings';
import LandingPage from '../components/LandingPage';
import Login from './Login';
import Signup from './Signup';
import Profile from '../sections/Profile';

const App = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isLandingPage, setIsLandingPage] = useState(true);
    const [taskDetails, setTaskDetails] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleProfileClick = () => {
        setSelectedItem('Profile');
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsLandingPage(false);
        setSelectedItem('Dashboard');
    };

    const handleSignup = () => {
        setIsAuthenticated(true);
        setIsLandingPage(false);
        setSelectedItem('Dashboard');
    };

    const switchToSignup = () => {
        setIsLogin(false);
        setIsLandingPage(false);
    };

    const switchToLogin = () => {
        setIsLogin(true);
        setIsLandingPage(false);
    };

    // const handleLogout = () => {
    //     setIsAuthenticated(false);
    //     setIsLandingPage(true);
    // };

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTaskDetails(savedTasks);
        }
        const profilePhotoUri = localStorage.getItem('profilePhoto');
        if (profilePhotoUri) {
            setProfilePhoto(profilePhotoUri);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && !selectedItem) {
            setSelectedItem('Dashboard');
        }
    }, [isAuthenticated, selectedItem]);

    if (isLandingPage) {
        return (
            <LandingPage
                onSwitchToLogin={switchToLogin}
                onSwitchToSignup={switchToSignup}
            />
        );
    }

    if (!isAuthenticated) {
        return isLogin ? (
            <Login onSwitchToSignup={switchToSignup} onLogin={handleLogin} />
        ) : (
            <Signup onSwitchToLogin={switchToLogin} onSignup={handleSignup} />
        );
    }

    const sidebarItems = [
        { label: 'Dashboard', icon: <MdHome /> },
        { label: 'Tasks', icon: <MdInfo /> },
        { label: 'Profile', icon: <MdAccountCircle /> },
    ];

    return (
        <div className="body">
            <Header 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onProfileClick={handleProfileClick} 
                profilePhoto={profilePhoto} 
            />
            <div className="main">
                <Sidebar
                    items={sidebarItems}
                    onItemClick={handleItemClick}
                    selectedItem={selectedItem}
                />
                <div className="article">
                    {selectedItem === 'Dashboard' && <Dashboard taskDetails={taskDetails} />}
                    {selectedItem === 'Tasks' && <Task searchTerm={searchTerm} taskDetails={taskDetails} setTaskDetails={setTaskDetails} />}
                    {/* {selectedItem === 'Settings' && <Settings onLogout={handleLogout} />} */}
                    {selectedItem === 'Profile' && <Profile setProfilePhoto={setProfilePhoto} />}
                </div>
            </div>
        </div>
    );
}

export default App;
