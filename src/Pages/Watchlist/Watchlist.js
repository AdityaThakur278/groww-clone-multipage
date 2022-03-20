import React from 'react'
import { connect } from 'react-redux';
import BuySellForm from '../../components/BuySellForm/BuySellForm';
import WatchlistInput from '../../components/WatchlistInput/WatchlistInput';
import WatchlistDataTable from '../../components/Table/WatchlistDataTable';
import "./Watchlist.css"

function Watchlist(props) {
	return (
		<div className="watchlist-page">
			<div className="stock-data-area">
				{
					props.watchlistID.length === 0 
					? <div className="no-watchlist">No Watchlist Available</div>
					: props.watchlistID.map(id => <WatchlistDataTable key={id} id={id}/>)
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