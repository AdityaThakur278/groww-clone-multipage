import React from 'react'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NoMatch from "./components/NoMatch";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Transantions from "./Pages/Transactions/Transactions";
import NavBar from "./components/NavBar/NavBar";
import Login from './components/Login/Login';
import { useAuth } from './utils/auth';
import RequireAuth from './utils/RequireAuth';
import ProfilePage from './components/ProfilePage/ProfilePage';

function AppNavigator() {
    const auth = useAuth();
    return (
        <BrowserRouter>
            {auth.user && <NavBar />}
            <Routes>
                <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
                <Route path="/transactions" element={<RequireAuth> <Transantions /> </RequireAuth>} />
                <Route path="/watchlist" element={<RequireAuth> <Watchlist /> </RequireAuth> } />
                <Route path="/portfolio" element={<RequireAuth> <Portfolio /> </RequireAuth>} />
                <Route path="/profile" element={<RequireAuth> <ProfilePage /> </RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppNavigator