import React from "react";
import AssetTable from "./AssetTable";
import CompanyDataTable from "./CompanyDataTable";
import "./Home.css"

function Home() {
    return (
		<div className="home-page">
			<div className="stock-data-area">
				<CompanyDataTable/>
			</div>
			<div className="right-side">
				<div className="right-side-wrapper">
					{/* <ul>
						<li>Assets Table</li>
						<li>Total Investment</li>
						<li>Current total Value</li>
						<li>Profit/Loss</li>
						<li>Wallet Balance</li>
						<li>Add money to wallet</li>
					</ul> */}
					<div className="investment-detail">
						<div className="card">Total Investment</div>
						<div className="card">Current Total</div>
						<div className="card">Profit/Loss</div>
						<div className="card">Wallet Balance</div>
					</div>

					<div className="asset-table">
						<div className="heading">
							<p className="heading-name">Assets</p>
						</div>
						<AssetTable/>
					</div>
				</div>
			</div>
		</div>
    );
}

export default Home;
