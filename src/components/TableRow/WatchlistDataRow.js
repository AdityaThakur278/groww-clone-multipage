import React from 'react'
import { connect } from 'react-redux';
import BuySellButton from '../BuySellButton/BuySellButton';
import "./WatchlistDataRow.css"
import RemoveFromWatchlist from '../RemoveFromWatchlist/RemoveFromWatchlist';

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function priceChangeStyle(value) {
    if(parseFloat(value) < 0) {
        return "change-neg";
    }
    else {
        return "change-pos";
    }
}

function WatchlistDataRow(props) {
    const company = props.company;
    const stocksData = props.stocksData;
    const index = getCompanyIndex(props.stocksData, props.company);
    const ltp = stocksData[index].ltp;
    const ptsChange = stocksData[index].ptsChange;
    const percentageChange = stocksData[index].percentageChange;
    const priceChangeStyleValue = priceChangeStyle(props.percentageChange);
    
    return (
        <div className="company-row">
            <p className="company">{company}</p>

            <div className="market-price">
                    <p className="price">₹{ltp}</p>
                    <p className={priceChangeStyleValue}>{ptsChange}({percentageChange}%)</p>
            </div>

            <BuySellButton type="buy" company={props.company}/>
            <BuySellButton type="sell" company={props.company}/>
            <RemoveFromWatchlist company={props.company} watchlistID={props.watchlistID}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        stocksData: state.stockData.stocksData,
    }
}

export default connect(mapStateToProps, null)(WatchlistDataRow)