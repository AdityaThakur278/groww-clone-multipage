import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

function NavBar() {
  return (
    <nav className="navbar">
        <div className='groww-name'>
            <NavLink className="element" to="/">Groww</NavLink>
        </div>
        <div className='remaining-element'>
            <NavLink className="element" to="/">Home</NavLink>
            <NavLink className="element" to="/transactions">Transactions</NavLink>
            <NavLink className="element" to="/watchlist">Watchlist</NavLink>
            <NavLink className="element" to="/portfolio">Portfolio</NavLink>
        </div>
    </nav>
  );
}

export default NavBar