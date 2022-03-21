import React, { useState } from 'react'
import { useAuth } from '../../utils/auth'
import "./ProfilePage.css"

function ProfilePage() {
    const auth = useAuth();
    const [userName, setUserName] = useState(auth.user.userName);
    const [email, setEmail] = useState(auth.user.email);
    const [password, setPassword] = useState(auth.user.password);

    function handleSave() {
        auth.signup({userName, email, password});
        alert("Details Updated!");
    }

    return (
        <div className="profile-page">
            <div className="profile-page-details">
                <div className="update-heading">Update Details</div>
                <div className="input-text-value">
                    <label className="input-text">Username</label>
                    <input className="input-value" value={userName} onChange={e => setUserName(e.target.value)}></input>
                </div>
                <div className="input-text-value">
                    <label className="input-text">Email</label>
                    <input className="input-value" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="input-text-value">
                    <label className="input-text">Password</label>
                    <input className="input-value" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="login-button-wrapper">
                    <button className="login-button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage