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
    const data = props.data;
    const index = props.mapCompanyToIndex[company];
    const ltp = data[index].ltp;
    const ptsChange = data[index].ptsChange;
    const percentageChange = data[index].percentageChange;
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
        data: state.stockData.data,
        mapCompanyToIndex: state.stockData.mapCompanyToIndex,
    }
}

export default connect(mapStateToProps, null)(CompanyDataRow)