import React from 'react'
import { connect } from 'react-redux'
import "./BuySellForm.css"
import BuySellPrice from './BuySellPrice'
import BuySellQuantity from './BuySellQuantity'
import BuySellTargetPrice from './BuySellTargetPrice'
import BuySellTransaction from './BuySellTransaction'
import {buyTabChange} from "../../Redux/buySellForm/buySellAction"

function BuySellForm(props) {
    const buyTab = props.buyTab ? "selected" : "";
    const sellTab = props.buyTab ? "" : "selected";

    const sharesOwned = props.assets[props.companyName] === undefined ? 0 : props.assets[props.companyName].quantity;
    let pendingBlockedStocks = props.pendingBlockedStocks[props.companyName];
    pendingBlockedStocks = pendingBlockedStocks === undefined ? 0 : pendingBlockedStocks;

    function buyTabSelect() {
        props.buyTabChange(true);
    }

    function sellTabSelect() {
        props.buyTabChange(false);
    }

    return (
        <div className="buy-sell-form">
            <div className="company-name">{props.companyName}</div>

            <div className="buy-sell-sub-container">
                    <div className="buy-sell-tab">
                        <p className={"buy-sell-tab-item " + buyTab } onClick={buyTabSelect}>BUY</p>
                        <p className={"buy-sell-tab-item " + sellTab} onClick={sellTabSelect}>SELL</p>
                        <p className="units-owned">Shares Owned - {sharesOwned}</p>
                    </div>

                    <BuySellQuantity/>
                    <BuySellTargetPrice/>
                    <BuySellPrice/>

                    <p className="buy-sell-info">
                        {props.buyTab 
                            ? "₹" + props.pendingBlockedAmount +  " of wallet balance(₹" + props.walletBalance + ") is blocked in pending transaction"
                            : pendingBlockedStocks + "-units of shares owned( " + sharesOwned + " ) is blocked in pending transaction"  
                        }
                    </p>

                    <BuySellTransaction/>
            </div>
        </div>
  )
}

const mapStateToProps = (state) => {
    return {
        companyName: state.buySellForm.buySellCompany,
        buyTab: state.buySellForm.buyTab,
        assets: state.assets,
        pendingBlockedAmount: state.transaction.pendingBlockedAmount,
        walletBalance: state.wallet.balance,
        pendingBlockedStocks: state.transaction.pendingBlockedStocks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyTabChange: (value) => dispatch(buyTabChange(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellForm)