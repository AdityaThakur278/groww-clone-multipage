import React from "react";
import CompanyDataTable from "./CompanyDataTable";
import "./Home.css"

function Home() {
    return (
		<div className="home-page">
			<div className="stock-data-area">
				<CompanyDataTable/>
			</div>
		</div>
    );
}

export default Home;
