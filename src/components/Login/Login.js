import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import "./Login.css"

function Login() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupTab, setSignupTab] = useState(false)

    const auth = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const redirectPath = location.state?.path || "/";

    function handleLogin() {
        if(signupTab) {
            auth.signup({userName, email, password})
            navigate(redirectPath, { replace: true })
        }
        else {
            auth.signin({userName, password})
            navigate(redirectPath, { replace: true })
        }
    }

    return (
        <div className='login-form'>
            <div className="login-form-container">
                <div className="company-header">
                    <img className="company-img" src={process.env.PUBLIC_URL + "/images/groww.png"} alt="groww" width="50px"></img>
                    <p className="company-name">GROWW</p>
                </div>

                <div className="signin-signup-wrapper">
                    <div className={"signin-signup " + (signupTab ? "" : "selected")} onClick={() => setSignupTab(false)}>SIGNIN</div>
                    <div className={"signin-signup " + (signupTab ? "selected" : "")} onClick={() => setSignupTab(true)}>SIGNUP</div>
                </div>

                <div className="input-text-value">
                    <label className="input-text">Username</label>
                    <input className="input-value" type="text" value={userName} onChange={e => setUserName(e.target.value)}></input>
                </div>

                {
                    signupTab 
                    && (<div className="input-text-value">
                        <label className="input-text">Email</label>
                        <input className="input-value" type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>)
                }

                <div className="input-text-value">
                    <label className="input-text">Password</label>
                    <input className="input-value" type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>

                <div className="login-button-wrapper">
                    <button className="login-button" onClick={handleLogin}>{signupTab ? "SIGNUP" : "SIGNIN"}</button>
                </div>
            </div>
        </div>
    )
}

export default Login