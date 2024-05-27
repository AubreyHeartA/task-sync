import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import Button from 'react-bootstrap/Button';

import '../config/style.css';

export default function Header({ searchTerm, setSearchTerm, onProfileClick, profilePhoto }) {
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const getApp = () => {
        window.open("https://www.mediafire.com/file/9qmqxp2up7tjbv4/TaskSync.apk/file", "_blank").focus();
    };

    return (
        <div className="header">
            <div className="search-container">
                <input
                    className="search"
                    type="text"
                    placeholder="Search tasks, members, projects"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button className="btn-search">Search</Button>
            </div>
            <div className='left'> 
                <a className="getApp" href="#get-app" onClick={getApp}>Get App</a>
                {profilePhoto ? (
                    <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="headerProfilePhoto" 
                        onClick={onProfileClick} 
                    />
                ) : (
                    <MdAccountCircle size={40} onClick={onProfileClick} />
                )}
            </div>
        </div>
    );
}
