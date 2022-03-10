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
                            ?  "₹" + props.pendingBlockedAmount +  " of wallet balance(₹" + props.walletBalance + ") is blocked in pending transaction"
                            : "Sell Tab Message"
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyTabChange: (value) => dispatch(buyTabChange(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellForm)