import React from 'react'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NoMatch from "./components/NoMatch";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Transantions from "./Pages/Transactions/Transactions";
import NavBar from "./components/NavBar/NavBar";

function AppNavigator() {
    return (
        <BrowserRouter>
          <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<Transantions />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppNavigator