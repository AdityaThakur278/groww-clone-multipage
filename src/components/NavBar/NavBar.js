import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
import { fetchStockData } from "../../Redux/stockData/stockDataAction";
import { connect } from 'react-redux';

function NavBar(props) {

    // Fetching data here to solve re-rendering issue
    useEffect(() => {
		setTimeout(() => props.fetchStockData(), 3000);
	}, []);

    const navLinkStyle = ({ isActive }) => {
        return {
            color: isActive ? "#00d09c" : "black",
            borderBottom: isActive ? "3px solid #00d09c" : "none",
        }
    }

    return (
        <nav className="navbar">
            <div className='groww-name'>
                <NavLink style={{color: "#00d09c", fontWeight: "bold"}} className="element" to="/">Groww</NavLink>
            </div>
            <div className='remaining-element'>
                <NavLink style={navLinkStyle} className="element" to="/">Home</NavLink>
                <NavLink style={navLinkStyle} className="element" to="/transactions">Transactions</NavLink>
                <NavLink style={navLinkStyle} className="element" to="/watchlist">Watchlist</NavLink>
                <NavLink style={navLinkStyle} className="element" to="/portfolio">Portfolio</NavLink>
            </div>
        </nav>
    );
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockData: () => dispatch(fetchStockData()),
	};
};

export default connect(null, mapDispatchToProps)(NavBar)