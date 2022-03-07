import React from "react";
import CompanyDataTable from "./CompanyDataTable";
import "./Home.css"

function Home() {
    return (
		<div className="home-page">
			<div className="stock-data-area">
				<CompanyDataTable/>
			</div>
			<div className="right-side">
				<ul>
					<li>Assets Table</li>
					<li>Total Investment</li>
					<li>Current total Value</li>
					<li>Profit/Loss</li>
					<li>Wallet Balance</li>
					<li>Add money to wallet</li>
				</ul>
			</div>
		</div>
    );
}

export default Home;
