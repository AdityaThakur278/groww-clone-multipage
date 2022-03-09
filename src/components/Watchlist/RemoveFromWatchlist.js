import React from 'react'
import deleteImage from "../../images/delete.png"
import "./RemoveFromWatchlist.css"
import {removeFromWatchlist} from "../../Redux/watchlist/watchlistActions"
import { toggleWatchlist } from '../../Redux/stockData/stockDataAction'
import { connect } from 'react-redux'

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function RemoveFromWatchlist(props) {

    function handleButtonClick() {
        const index = getCompanyIndex(props.stocksData, props.company);
		const watchlistCondition = props.stocksData[index].watchlist;
		const shallowCopyData = [...props.stocksData];
		shallowCopyData[index] = {...shallowCopyData[index], watchlist: !watchlistCondition};
		props.toggleWatchlist(shallowCopyData)

        props.removeFromWatchlist(props.company)
    }

    return (
        <p className="remove">
            <img 
                className="delete-button"
                src={deleteImage}
                width="30px"
                alt="delete"
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
        removeFromWatchlist: company => dispatch(removeFromWatchlist(company)),
        toggleWatchlist: stocksData => dispatch(toggleWatchlist(stocksData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromWatchlist)