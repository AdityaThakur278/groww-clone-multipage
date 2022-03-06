import React from 'react'
import { connect } from 'react-redux'
import "./BuySellTransaction.css"
import {addToPendingTransaction} from "../../Redux/transaction/transactionAction"

function BuySellTransaction(props) {

    function buyTransaction() {
        const totalAmount = parseFloat(props.shareQuantity) * parseFloat(props.targetPrice);
        const walletAmount = parseFloat(props.walletAmount);

        if(totalAmount > walletAmount) {
            alert("Wallet balance is not enough!!")
            return;
        }

        props.addToPendingTransaction({
            type: "B",
            company: props.buySellCompany,
            price: props.targetPrice,
            quantity: props.shareQuantity,
            total: totalAmount.toFixed(2),
        })

        alert("Transaction added to pending transaction list");
    }

    function buySellTransaction() {

        if(props.buySellCompany === "Loading...") return;

        if(props.buyTab) {
            buyTransaction();
        }
    }

    const buttonStyle = props.buyTab ? "buy-style" : "sell-style";
    const innerContent = props.buyTab ? "BUY" : "SELL";

    return (
        <button 
            className={"buy-sell-button " + buttonStyle} 
            onClick={buySellTransaction}
        >
            {innerContent}
        </button>
    )
}

const mapStateToProps = (state) => {
    return {
        buyTab: state.buySellForm.buyTab,
        walletAmount: state.wallet.amount,
        shareQuantity: state.buySellForm.shareQuantityValue,
        targetPrice: state.buySellForm.targetPrice,
        buySellCompany: state.buySellForm.buySellCompany,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToPendingTransaction: value => dispatch(addToPendingTransaction(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellTransaction)