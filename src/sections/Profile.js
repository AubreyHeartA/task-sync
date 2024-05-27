import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineMessage, MdOutlineReportGmailerrorred } from "react-icons/md";

import profile from '../assets/TaskSync1.png';
import '../config/style.css';

const Profile = ({ navigation, setProfilePhoto }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [profilePhoto, setLocalProfilePhoto] = useState(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = () => {
        try {
            const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
            const profilePhotoUri = localStorage.getItem('profilePhoto');
            if (userCredentials) {
                setFirstname(userCredentials.firstname);
                setLastname(userCredentials.lastname);
                setEmail(userCredentials.email);
            }
            if (profilePhotoUri) {
                setLocalProfilePhoto(profilePhotoUri);
            }
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    };

    const saveChanges = (e) => {
        e.preventDefault();
        try {
            const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
            localStorage.setItem('userCredentials', JSON.stringify({
                firstname,
                lastname,
                email,
                password: userCredentials.password,
            }));
            localStorage.setItem('profilePhoto', profilePhoto || '');

            setProfilePhoto(profilePhoto || '');
            setIsEditMode(false);
            alert('Profile Updated', 'Your profile has been successfully updated.');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const selectProfilePhoto = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalProfilePhoto(reader.result);
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const chatWithUs = () => {
        window.open("https://m.me/claricedomingo07", "_blank");
    };

    const reportIssue = () => {
        window.open("mailto:studymate.project101@gmail.com");
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('userToken');
            navigation.replace('Login');
        } catch (error) {
            alert('Error', 'An error occurred during logout');
        }
    };

    return (
        <div className="profile-section">
            <div className="profileContainer">
                <div className="selectProfilePhoto">
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={selectProfilePhoto}
                        style={{ display: 'none' }}
                        id="profilePhotoInput"
                    />
                    <label htmlFor="profilePhotoInput">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className="profileImage" />
                        ) : (
                            <img src={profile} alt="Blank Profile" className="profileImage" />
                        )}
                    </label>
                </div>
                <p className="greetings">Hello, {firstname} {lastname}!</p>
            </div>

            <div className="information-actions">
                {!isEditMode ? (
                    <div className="accountInfoContainer">
                        <p className="sectionHeader">Account Information:</p>
                        <div className="displayInfo">
                            <span className="label">Firstname</span>
                            <input
                                className="textInput-readonly"
                                value={firstname}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="displayInfo">
                            <span className="label">Lastname</span>
                            <input
                                className="textInput-readonly"
                                value={lastname}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="displayInfo">
                            <span className="label">Email</span>
                            <input
                                className="textInput-readonly"
                                value={email}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="updatebtn-container">
                            <Button className="updateButton" onClick={() => setIsEditMode(true)}>
                                <span className="updateButtonText">Edit Profile</span>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="editProfileContainer">
                        <p className="sectionHeader">Edit Profile:</p>
                        <div className="information">
                            <span>First Name</span>
                            <input
                                className="textInput"
                                type="text"
                                placeholder="Enter first name"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="information">
                            <span>Last Name</span>
                            <input
                                className="textInput"
                                type="text"
                                placeholder="Enter last name"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="information">
                            <span>Email</span>
                            <input
                                className="textInput"
                                type="email"
                                placeholder="Enter a valid email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="editProfile-btn">
                            <Button className="cancel-btn" onClick={() => setIsEditMode(false)}>Cancel</Button>
                            <Button className="saveButton" onClick={saveChanges}>Save Changes</Button>
                        </div>
                    </div>
                )}

                <div className="actionsContainer">
                    <p className="sectionHeader">Actions:</p>
                    <div className="actions-list">
                        <div className="actions" onClick={chatWithUs}>
                            <MdOutlineMessage />
                            <span className="actionsItem">Chat With Us</span>
                        </div>

                        <hr className="actions-line" />

                        <div className="actions" onClick={reportIssue}>
                            <MdOutlineReportGmailerrorred />
                            <span className="actionsItem">Report an Issue</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="logout" onClick={handleLogout}>
                <span>Logout</span>
            </div>

            <p className="credit">TaskSync &copy; 2024</p>
        </div>
    );
};

export default Profile;
