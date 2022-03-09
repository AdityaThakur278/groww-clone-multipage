import React from "react";
import AssetTable from "./AssetTable";
import CompanyDataTable from "./CompanyDataTable";
import "./Home.css"
import InvestmentDetails from "./InvestmentDetails";

function Home(props) {
    return (
		<div className="home-page">
			<div className="stock-data-area">
				<CompanyDataTable/>
			</div>
			<div className="right-side">
				<div className="right-side-wrapper">
					<InvestmentDetails/>

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