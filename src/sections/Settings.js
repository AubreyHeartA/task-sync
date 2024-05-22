import React from 'react';
// import LandingPage from '../components/LandingPage';

export default function App ({ onLogout }) {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    const chatWithUs = () => {
        window.open("https://m.me/claricedomingo07", "_blank").focus();
    };

    const reportIssue = () => {
        window.open("mailto:studymate.project101@gmail.com").focus();
    };

    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    // };

    // if (!isLoggedIn) {
    //     return <LandingPage />;
    // }
    
    return (
        <div className='settings-section'>
            <div className="chat" onClick={chatWithUs}>
                <span>Chat With Us</span>
            </div>

            <div className="report" onClick={reportIssue}>
                <span>Report an Issue</span>
            </div>

            <hr />
            <div className="logout" onClick={onLogout}>
                <span>Logout</span>
            </div>
            <p>TaskSync &copy; 2024</p>
        </div>
    );
};

