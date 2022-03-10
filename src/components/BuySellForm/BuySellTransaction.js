import React from 'react'
import { connect } from 'react-redux'
import "./BuySellTransaction.css"
import {addToTransactions, addToPendingBlockedAmount} from "../../Redux/transaction/transactionAction"
import { v4 } from "uuid";
 
function BuySellTransaction(props) {

    function buyTransaction() {
        const totalAmount = parseFloat(props.shareQuantity) * parseFloat(props.targetPrice);
        const walletBalance = parseFloat(props.walletBalance);
        const pendingBlockedAmount = parseFloat(props.pendingBlockedAmount);

        if(totalAmount > walletBalance) {
            alert("Wallet balance is not enough!!")
            return;
        }

        if(totalAmount + pendingBlockedAmount > walletBalance) {
            alert("₹" + pendingBlockedAmount +  " of wallet balance(₹" + walletBalance + ") is blocked in pending transaction");
            return;
        }

        const id = v4();
        
        props.addToTransactions(id, {
            transactionType: "pending",
            type: "B",
            company: props.buySellCompany,
            price: props.targetPrice,
            quantity: props.shareQuantity,
            total: totalAmount.toFixed(2),
        });
        props.addToPendingBlockedAmount(totalAmount);
        alert("Transaction added to pending transaction list");
    }

    function buySellTransaction() {

        if(props.buySellCompany === "Select Company") return;

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
        walletBalance: state.wallet.balance,
        shareQuantity: state.buySellForm.shareQuantityValue,
        targetPrice: state.buySellForm.targetPrice,
        buySellCompany: state.buySellForm.buySellCompany,
        pendingBlockedAmount: state.transaction.pendingBlockedAmount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToTransactions: (id, transaction) => dispatch(addToTransactions(id, transaction)),
        addToPendingBlockedAmount: (amount) => dispatch(addToPendingBlockedAmount(amount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellTransaction)