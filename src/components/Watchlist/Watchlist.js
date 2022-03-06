import React from 'react'
import BuySellForm from '../BuySellForm/BuySellForm';
import CompanyDataTable from './CompanyDataTable';
import "./Watchlist.css"

function Watchlist(props) {
	return (
		<div className="watchlist-page">
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

export default Watchlist