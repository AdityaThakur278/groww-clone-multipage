import React from 'react'
import "./BuySellButton.css"
import {buySellCompanyChange, buyTabChange, marketPriceValueChange} from "../../Redux/buySellForm/buySellAction"
import { connect } from 'react-redux';

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function BuySellButton(props) {
    const buttonStyle = props.type + "-button";
    const innerHtml = props.type.charAt(0).toUpperCase();

    function handleButtonClick() {
        props.buySellCompanyChange(props.company);
        props.type === "buy" ? props.buyTabChange(true) : props.buyTabChange(false);

        const index = getCompanyIndex(props.stocksData, props.company);
        const marketPrice = props.stocksData[index].ltp;
        props.marketPriceValueChange(marketPrice)
    }

    return (
        <p className={props.type}>
            <button className={buttonStyle} onClick={handleButtonClick}>{innerHtml}</button>
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
        buySellCompanyChange: (value) => dispatch(buySellCompanyChange(value)),
        buyTabChange: (value) => dispatch(buyTabChange(value)),
        marketPriceValueChange: (value) => dispatch(marketPriceValueChange(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellButton);