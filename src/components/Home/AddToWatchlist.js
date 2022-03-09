import React from 'react'
import "./AddToWatchlist.css"
import addImage from "../../images/add.png"
import doneImage from "../../images/done.png"
import {addToWatchlist, removeFromWatchlist} from "../../Redux/watchlist/watchlistActions"
import { connect } from 'react-redux'
import { toggleWatchlist } from '../../Redux/stockData/stockDataAction'

function AddToWatchlist(props) {

	function handleButtonClick() {

		const index = props.index;
		const watchlistCondition = props.stocksData[index].watchlist;
		const shallowCopyData = [...props.stocksData];
		shallowCopyData[index] = {...shallowCopyData[index], watchlist: !watchlistCondition};
		props.toggleWatchlist(shallowCopyData)

		if(watchlistCondition === false) {
			props.addToWatchlist(props.company)
		}
		else {
			props.removeFromWatchlist(props.company)
		}	
	}

    return (
		<p style={props.width} className="watchlist">
			<img 
				className="watchlist-button" 
				width="30px" 
				src={props.stocksData[props.index].watchlist ? doneImage : addImage} 
				alt="Add"
				onClick={handleButtonClick}
			/>
		</p>
    )
}

const mapStateToProps = (state) => {
	return {
		stocksData: state.stockData.stocksData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToWatchlist: company => dispatch(addToWatchlist(company)),
		removeFromWatchlist: company => dispatch(removeFromWatchlist(company)),
		toggleWatchlist: stocksData => dispatch(toggleWatchlist(stocksData)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToWatchlist)