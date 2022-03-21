import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import BuySellForm from '../../components/BuySellForm/BuySellForm';
import WatchlistInput from '../../components/WatchlistInput/WatchlistInput';
import WatchlistDataTable from '../../components/Table/WatchlistDataTable';
import "./Watchlist.css"

function Watchlist(props) {
	const [selectedWatchlist, setSelectedWatchlist] = useState(null);
	let watchlistToShow = selectedWatchlist ? selectedWatchlist : props.watchlistID[0];

	useEffect(() => {
		setSelectedWatchlist(props.watchlistID[0])
	}, [props.watchlistID])

	return (
		<div className="watchlist-page">
			<div className="stock-data-area">
				{
					props.watchlistID.length === 0 
					? 	<div className="no-watchlist">No Watchlist Available</div>
					: 	<div>
							<select className="select-tab" value={watchlistToShow} onChange={e => setSelectedWatchlist(e.target.value)}>
								{props.watchlistID.map(id => <option className="option-tab" key={id} value={id}>{props.watchlists[id].watchlistName}</option>)}
							</select>
							<WatchlistDataTable key={watchlistToShow} id={watchlistToShow}/>
						</div>
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
		watchlists: state.watchlist.watchlists,
	}
}

export default connect(mapStateToProps, null)(Watchlist)