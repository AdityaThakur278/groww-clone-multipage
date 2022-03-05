import React from 'react'
import { connect } from 'react-redux'
import "./BuySellTransaction.css"

function BuySellTransaction(props) {

    const buttonStyle = props.buyTab ? "buy-style" : "sell-style";
    const innerContent = props.buyTab ? "BUY" : "SELL";

    return (
        <button className={"buy-sell-button " + buttonStyle}>
            {innerContent}
        </button>
    )
}

const mapStateToProps = (state) => {
    return {
        buyTab: state.buySellForm.buyTab,
    }
}

export default connect(mapStateToProps, null)(BuySellTransaction)