import React from 'react'
import AssetTable from '../../components/Portfolio/AssetTable'
import InvestmentDetails from '../../components/Portfolio/InvestmentDetails'
import "./Portfolio.css"

function Portfolio() {
    return (
		<div className="portfolio-page">
			<div className="asset-table">
				<div className="heading">
					<p className="heading-name">Assets</p>
				</div>
				<AssetTable/>
			</div>

			<div className="right-side">
				<div className="right-side-wrapper">
					<InvestmentDetails/>
				</div>
			</div>
		</div>
    )
}

export default Portfolio