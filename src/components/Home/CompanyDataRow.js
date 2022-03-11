import React from 'react'
import BuySellButton from '../Watchlist/BuySellButton';
import AddToWatchlist from './AddToWatchlist'
import "./CompanyDataRow.css"

function priceChangeStyle(value) {
    if(parseFloat(value) < 0) {
        return "change-neg";
    }
    else {
        return "change-pos";
    }
}

function CompanyDataRow(props) {
    const priceChangeStyleValue = priceChangeStyle(props.percentageChange);
    return (
        <div className="company-row">
            <p className="company">{props.company}</p>

            <div className="market-price">
                    <p className="price">₹{props.ltp}</p>
                    <p className={priceChangeStyleValue}>{props.ptsChange}({props.percentageChange}%)</p>
            </div>

            <BuySellButton type="buy" company={props.company}/>
            <BuySellButton type="sell" company={props.company}/>
            <AddToWatchlist company={props.company} index={props.index}/>
        </div>
    )
}

export default CompanyDataRow