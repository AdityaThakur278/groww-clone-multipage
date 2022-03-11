import React from "react";
import BuySellForm from "../BuySellForm/BuySellForm";
import CompanyDataTable from "./CompanyDataTable";
import "./Home.css"

function Home(props) {
    return (
		<div className="home-page">
			<div className="stock-data-area">
				<CompanyDataTable/>
			</div>
			<div className="buy-sell-form-area">
				<div className="buy-sell-form-wrapper">
					<BuySellForm/>
				</div>
			</div>	
		</div>
    );
}

export default Home;