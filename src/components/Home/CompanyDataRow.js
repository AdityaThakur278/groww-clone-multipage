import React, { useState } from 'react'
import BuySellButton from '../Watchlist/BuySellButton';
import "./CompanyDataRow.css"
import AddToWatchlistModal from '../Watchlist/AddToWatchlistModal';

function priceChangeStyle(value) {
    if(parseFloat(value) < 0) {
        return "change-neg";
    }
    else {
        return "change-pos";
    }
}

function CompanyDataRow(props) {

    const [addToWatchlistModal, setAddToWatchlistModal] = useState(false);

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
            <div className="watchlist">
                <img 
                    className="watchlist-button" 
                    width="30px" 
                    src= {process.env.PUBLIC_URL + "/images/add.png"} 
                    alt="Add"
                    onClick={() => setAddToWatchlistModal(true)}
                />

                {
                    addToWatchlistModal &&  <AddToWatchlistModal 
                                                setAddToWatchlistModal={setAddToWatchlistModal}
                                                company={props.company}
                                            />
                }
            </div>
        </div>
    )
}

export default CompanyDataRow