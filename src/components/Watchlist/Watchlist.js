import React from 'react'
import { connect } from 'react-redux';
import BuySellForm from '../BuySellForm/BuySellForm';
import WatchlistInput from '../CreateWatchlist/WatchlistInput';
import CompanyDataTable from './CompanyDataTable';
import "./Watchlist.css"

function Watchlist(props) {
	return (
		<div className="watchlist-page">
			<div className="stock-data-area">
				{
					props.watchlistID.length === 0 
					? <div className="no-watchlist">No Watchlist Available</div>
					: props.watchlistID.map(id => <CompanyDataTable key={id} id={id}/>)
				}
			</div>
			<div className="buy-sell-form-area">
				<div className="buy-sell-form-wrapper">
					<WatchlistInput/>
					<BuySellForm/>
				</div>
			</div>	
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		watchlistID: state.watchlist.watchlistID,
	}
}

export default connect(mapStateToProps, null)(Watchlist)