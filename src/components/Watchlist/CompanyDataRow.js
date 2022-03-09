import React from 'react'
import { connect } from 'react-redux';
import BuySellButton from './BuySellButton';
import "./CompanyDataRow.css"
import RemoveFromWatchlist from './RemoveFromWatchlist';

function priceChangeStyle(value) {
    if(parseFloat(value) < 0) {
        return "change-neg";
    }
    else {
        return "change-pos";
    }
}

function CompanyDataRow(props) {
    const company = props.company;
    const stocksData = props.stocksData;
    const index = props.mapCompanyToIndex[company];
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
            <RemoveFromWatchlist company={props.company}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        stocksData: state.stockData.stocksData,
        mapCompanyToIndex: state.stockData.mapCompanyToIndex,
    }
}

export default connect(mapStateToProps, null)(CompanyDataRow)