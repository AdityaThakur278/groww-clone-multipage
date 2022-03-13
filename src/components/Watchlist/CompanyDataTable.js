import React, { useState } from 'react'
import { connect } from 'react-redux';
import CompanyDataRow from './CompanyDataRow';
import { deleteWatchlist, renameWatchlist } from "../../Redux/watchlist/watchlistActions"
import "./CompanyDataTable.css"

function CompanyDataTable(props) {

	const [watchlistRename, setWatchlistRename] = useState(false);
	const [watchlistRenameInput, setWatchlistRenameInput] = useState("");

	function handleDeleteWatchlist() {
		if(window.confirm("Are you sure you want to delete '" + props.watchlists[props.id].watchlistName + "' watchlist")) 
			props.deleteWatchlist(props.id)
	}

	function handleRenameWatchlist() {
		setWatchlistRenameInput(props.watchlists[props.id].watchlistName)
		setWatchlistRename(true)
	}

	function handleRenameConfirm() {
		props.renameWatchlist(props.id, watchlistRenameInput);
		alert("Watchlist Renamed!");
		setWatchlistRename(false)
	}

	return (
		<div className="company-data">
			<div className="heading">
				{
					watchlistRename 
					? 	<div className="watchlist-rename-container">
							<input className="watchlist-rename-input" type="text" value={watchlistRenameInput} onChange={e => setWatchlistRenameInput(e.target.value)}></input>
							<button style={{padding: "1.5%"}} className="watchlist-rename-button" onClick={handleRenameConfirm}>Rename</button>
							<button style={{padding: "1.5%"}} className="watchlist-delete-button" onClick={() => setWatchlistRename(false)}>Cancel</button>
						</div>
					: <p className="top-heading">{props.watchlists[props.id].watchlistName}</p>
				}
				<div style={{display: watchlistRename ? "none" : "flex"}} className="rename-delete">
					<button className="watchlist-rename-button" onClick={handleRenameWatchlist}>Rename</button>
					<button className="watchlist-delete-button" onClick={handleDeleteWatchlist}>Delete</button>
				</div>
			</div>

			<div className="table">
				<div className="table-heading">
					<p className="company">Company</p>
					<p className="market-price">Market Price</p>
					<p className="buy">Buy</p>
					<p className="sell">Sell</p>
					<p className="remove">Remove</p>
				</div>

				<div className="table-content">
					{
						props.watchlists[props.id].companies.length === 0
                        ? (
                            <div className='no-data'>
                                No Companies in Watchlist
                            </div>
                        )
                        : (
                            props.watchlists[props.id].companies.map(company => <CompanyDataRow key={company} company={company}/>)
                        )
					}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		watchlists: state.watchlist.watchlists,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteWatchlist: id => dispatch(deleteWatchlist(id)),
		renameWatchlist: (id, watchlistName) => dispatch(renameWatchlist(id, watchlistName)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDataTable)