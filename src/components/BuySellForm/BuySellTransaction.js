import React from 'react'
import { connect } from 'react-redux'
import "./BuySellTransaction.css"
import {addToTransactions, addToPendingBlockedAmount, addToPendingBlockedStocks} from "../../Actions/transactionAction"
import { numberRegex } from '../../utils/regex'
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

    function sellTransaction() {
        const sharesOwned = props.assets[props.buySellCompany] === undefined ? 0 : props.assets[props.buySellCompany].quantity;
        const shareQuantity = props.shareQuantity;
        const pendingBlockedStocks = props.pendingBlockedStocks[props.buySellCompany] === undefined ? 0 : props.pendingBlockedStocks[props.buySellCompany].units;
        const totalAmount = parseFloat(props.shareQuantity) * parseFloat(props.targetPrice);

        if(parseFloat(shareQuantity) > parseFloat(sharesOwned)) {
            alert("Not having enough shares!")
            return;
        }

        if(parseFloat(shareQuantity) + parseFloat(pendingBlockedStocks) > parseFloat(sharesOwned)) {
            alert(pendingBlockedStocks + "-units of shares owned( " + sharesOwned + " ) is blocked in pending transaction");
            return;
        }

        const id = v4();

        props.addToTransactions(id, {
            transactionType: "pending",
            type: "S",
            company: props.buySellCompany,
            price: props.targetPrice,
            quantity: props.shareQuantity,
            total: totalAmount.toFixed(2),
        });
        props.addToPendingBlockedStocks(props.buySellCompany, props.shareQuantity, id);
        alert("Transaction added to pending transaction list");
    }

    function buySellTransaction() {

        if(numberRegex(props.shareQuantity)) {
            alert("Enter proper share quantity value!")
            return;
        }

        // if(!Number.isInteger(props.shareQuantity)) {
        //     alert("Share quantity can't be fractional!")
        //     return;
        // }

        if(numberRegex(props.targetPrice)) {
            alert("Enter proper target price value!")
            return;
        }

        if(props.buySellCompany === "Select Company") return;

        if(props.buyTab) {
            buyTransaction();
        }
        else {
            sellTransaction();
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
        pendingBlockedStocks: state.transaction.pendingBlockedStocks,
        assets: state.assets,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToTransactions: (id, transaction) => dispatch(addToTransactions(id, transaction)),
        addToPendingBlockedAmount: (amount) => dispatch(addToPendingBlockedAmount(amount)),
        addToPendingBlockedStocks: (company, units, id) => dispatch(addToPendingBlockedStocks(company, units, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellTransaction)