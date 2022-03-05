import React from "react";
import Home from "./components/Home/Home";
import {Routes, Route} from "react-router-dom"
import NoMatch from "./components/NoMatch";
import NavBar from "./components/NavBar/NavBar";
import "./App.css"
import Transantions from "./components/Transactions/Transantions";
import Watchlist from "./components/Watchlist/Watchlist";
import Portfolio from "./components/Portfolio/Portfolio";

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/transactions" element={<Transantions/>}/>
        <Route path="/watchlist" element={<Watchlist/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </>
  );
}

export default App;
