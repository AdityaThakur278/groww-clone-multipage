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
            <div>
                <label>FirstName</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
            </div>

            <div>
                <label>LastName</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}></input>
            </div>

            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>

            <div>
                <label>Password</label>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login