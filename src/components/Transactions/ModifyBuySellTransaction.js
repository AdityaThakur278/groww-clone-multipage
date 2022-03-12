import React from 'react'
import "./ModifyBuySellTransaction.css"
import { addToTransactions, addToPendingBlockedAmount, addToPendingBlockedStocks, substractFromPendingBlockedAmount, substractFromPendingBlockedStocks, removeFromBlockedTransaction, modifyPendingTransaction } from "../../Redux/transaction/transactionAction"
import { connect } from 'react-redux'

function ModifyBuySellTransaction(props) {

	function buyTransaction() {
		const totalAmount = parseFloat(props.shareQuantity) * parseFloat(props.targetPrice);
        const walletBalance = parseFloat(props.walletBalance);
        const pendingBlockedAmount = parseFloat(props.pendingBlockedAmount);
		const blockedValue = props.type === "B" ? parseFloat(props.total) : 0;

        if(totalAmount > walletBalance) {
            alert("Wallet balance is not enough!!")
            return;
        }

        if(totalAmount + pendingBlockedAmount - blockedValue > walletBalance) {
            alert("₹" + (pendingBlockedAmount-blockedValue) +  " of wallet balance(₹" + walletBalance + ") is blocked in pending transaction");
            return;
        }

		// Buy Success
		if(props.type === "B") {
			props.substractFromPendingBlockedAmount(props.total);
		}
		else {
			props.substractFromPendingBlockedStocks(props.company, props.quantity, props.id);
		}

		props.modifyPendingTransaction(props.id, {
            transactionType: "pending",
            type: "B",
            company: props.buySellCompany,
            price: props.targetPrice,
            quantity: props.shareQuantity,
            total: totalAmount.toFixed(2),
        });

		props.addToPendingBlockedAmount(totalAmount);

		props.removeFromBlockedTransaction(props.id);
        alert("Modify Successful!");

		props.setModifyModal(false);
	}

	function sellTransaction() {
		const sharesOwned = props.assets[props.buySellCompany] === undefined ? 0 : props.assets[props.buySellCompany].quantity;
        const shareQuantity = props.shareQuantity;
        const pendingBlockedStocks = props.pendingBlockedStocks[props.buySellCompany] === undefined ? 0 : props.pendingBlockedStocks[props.buySellCompany].units;
		const blockedValue = props.type === "S" ? parseFloat(props.quantity) : 0;
		const totalAmount = parseFloat(props.shareQuantity) * parseFloat(props.targetPrice);

        if(parseFloat(shareQuantity) > parseFloat(sharesOwned)) {
            alert("Not having enough shares!")
            return;
        }

        if(parseFloat(shareQuantity) + parseFloat(pendingBlockedStocks) - blockedValue > parseFloat(sharesOwned)) {
            alert((pendingBlockedStocks-blockedValue) + "-units of shares owned( " + sharesOwned + " ) is blocked in pending transaction");
            return;
        }

		// Sell Successful
		if(props.type === "B") {
			props.substractFromPendingBlockedAmount(props.total);
		}
		else {
			props.substractFromPendingBlockedStocks(props.company, props.quantity, props.id);
		}

		props.modifyPendingTransaction(props.id, {
            transactionType: "pending",
            type: "S",
            company: props.buySellCompany,
            price: props.targetPrice,
            quantity: props.shareQuantity,
            total: totalAmount.toFixed(2),
        });

		props.addToPendingBlockedStocks(props.buySellCompany, props.shareQuantity, props.id);
	
		props.removeFromBlockedTransaction(props.id);
        alert("Modify Successful!");

		props.setModifyModal(false);
	}

	function buySellTransaction() {
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
        addToPendingBlockedAmount: amount => dispatch(addToPendingBlockedAmount(amount)),
        addToPendingBlockedStocks: (company, units, id) => dispatch(addToPendingBlockedStocks(company, units, id)),
		substractFromPendingBlockedAmount: amount => dispatch(substractFromPendingBlockedAmount(amount)),
		substractFromPendingBlockedStocks: (company, quantity, id) => dispatch(substractFromPendingBlockedStocks(company, quantity, id)),
		removeFromBlockedTransaction: id => dispatch(removeFromBlockedTransaction(id)),
		modifyPendingTransaction: (id, transaction) => dispatch(modifyPendingTransaction(id, transaction)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyBuySellTransaction)