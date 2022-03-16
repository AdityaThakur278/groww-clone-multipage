import React from 'react'
import { connect } from 'react-redux'
import "./BuySellForm.css"
import BuySellPrice from './BuySellPrice'
import BuySellQuantity from './BuySellQuantity'
import BuySellTargetPrice from './BuySellTargetPrice'
import BuySellTransaction from './BuySellTransaction'
import {buyTabChange} from "../../Actions/buySellAction"
import { removeFromBlockedTransaction } from "../../Actions/transactionAction"

import ModifyBuySellTransaction from '../ModifyModal/ModifyBuySellTransaction'

function BuySellForm(props) {
    const buyTab = props.buyTab ? "selected" : "";
    const sellTab = props.buyTab ? "" : "selected";

    const sharesOwned = props.assets[props.companyName] === undefined ? 0 : props.assets[props.companyName].quantity;
    let pendingBlockedStocks = props.pendingBlockedStocks[props.companyName];
    pendingBlockedStocks = pendingBlockedStocks === undefined ? 0 : pendingBlockedStocks.units;

    function buyTabSelect() {
        props.buyTabChange(true);
    }

    function sellTabSelect() {
        props.buyTabChange(false);
    }

    // For modify transaction
    let pendingBlockedAmount = parseFloat(props.pendingBlockedAmount);
    if(props.type === "B") pendingBlockedAmount = parseFloat(props.pendingBlockedAmount) - parseFloat(props.total);
    if(props.type === "S") pendingBlockedStocks = parseFloat(pendingBlockedStocks) - parseFloat(props.quantity);
    const isModify = props.isModify === undefined ? false : true; 
    const crossButtonStyle = {
        backgroundColor: "transparent",
        border: "none",
        fontSize: "22px",
        fontWeight: "700",
        cursor: "pointer",
    }

    function handleCrossButtonClick() {
        props.removeFromBlockedTransaction(props.id);
        props.setModifyModal(false)
    }

    return (
        <div className="buy-sell-form">
            {
                isModify 
                ?   <div style={{justifyContent: "space-between"}} className="company-name">
                        <p>{props.companyName}</p>
                        <button style={crossButtonStyle} onClick={handleCrossButtonClick}>X</button>
                    </div>
                : <div className="company-name">{props.companyName}</div>
            }
    
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
                            ? "₹" + pendingBlockedAmount +  " of wallet balance(₹" + props.walletBalance + ") is blocked in pending transaction"
                            : pendingBlockedStocks + "-units of shares owned( " + sharesOwned + " ) is blocked in pending transaction"  
                        }
                    </p>
                    
                    {
                        isModify 
                        ?   <ModifyBuySellTransaction 
                                setModifyModal={props.setModifyModal}
                                id = {props.id}
                                type = {props.type}
                                transactionType = {props.transactionType}
                                company={props.company}
                                price={props.price}
                                quantity={props.quantity}
                                total={props.total}
                            />
                        :   <BuySellTransaction/>
                    }
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
        buyTabChange: (value) => dispatch(buyTabChange(value)),
        removeFromBlockedTransaction: id => dispatch(removeFromBlockedTransaction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellForm)