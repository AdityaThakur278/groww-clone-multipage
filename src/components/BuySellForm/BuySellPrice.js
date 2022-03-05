import React from 'react'
import { connect } from 'react-redux';
import "./BuySellPrice.css"

function BuySellPrice(props) {
    const marketPrice = props.marketPrice ? "₹" + props.marketPrice : "NULL";
    return (
        <div className="buy-sell-price">
            <p className="buy-sell-price-text">Market Price</p>
            <p className="buy-sell-market-price">{marketPrice}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        marketPrice: state.buySellForm.marketPriceValue,
    }
}   

export default connect(mapStateToProps, null)(BuySellPrice)