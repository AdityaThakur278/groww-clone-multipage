import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import "./Login.css"

function Login() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const redirectPath = location.state?.path || "/";

    function handleLogin() {
        auth.login({firstName, lastName, email, password});
        navigate(redirectPath, { replace: true })
    }

    return (
        <div className='login-form'>
            <div className="login-form-container">
                <div className="company-header">
                    <img className="company-img" src={process.env.PUBLIC_URL + "/images/groww.png"} alt="groww" width="50px"></img>
                    <p className="company-name">GROWW</p>
                </div>
                <div className='login-heading'>LOGIN</div>
                <div className="input-text-value">
                    <label className="input-text">First Name</label>
                    <input className="input-value" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                </div>

                <div className="input-text-value">
                    <label className="input-text">Last Name</label>
                    <input className="input-value" type="text" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                </div>

                <div className="input-text-value">
                    <label className="input-text">Email</label>
                    <input className="input-value" type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div className="input-text-value">
                    <label className="input-text">Password</label>
                    <input className="input-value" type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>

                <div className="login-button-wrapper">
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login