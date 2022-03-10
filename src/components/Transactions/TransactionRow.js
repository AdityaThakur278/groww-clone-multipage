import React from 'react'
import "./TransactionRow.css"
import { deletePendingTransaction, substractFromPendingBlockedAmount, substractFromPendingBlockedStocks } from "../../Redux/transaction/transactionAction"
import { connect } from 'react-redux';

function TransactionRow(props) {

    function transactionTypeStyle() {
        if(props.type === "B") return "transaction-type-buy";
        else if(props.type ==="S") return "transaction-type-sell";
    }

    function handleCancelTransaction(total, company, quantity) {
        props.deletePendingTransaction(props.id);
        if(props.type === "B") props.substractFromPendingBlockedAmount(total);
        if(props.type === "S") props.substractFromPendingBlockedStocks(company, quantity);
    }

    const tableStyle = {
        transactionType: {width: props.cancel ? "9%" : "10%"},
        companyName: {width: props.cancel ? "25%" : "32%"},
        targetPrice: {width: props.cancel ? "20%" : "23%"},
        quantity: {width: props.cancel ? "12%" : "13%"},
        total: {width: props.cancel ? "22%" : "22%"},
        cancel: {width: "12%"},
    }

    return (
        <div className="company-row">
            <p style={tableStyle.transactionType} className={transactionTypeStyle()}>{props.type}</p>
            <p style={tableStyle.companyName} className="company-name">{props.company}</p>
            <p style={tableStyle.targetPrice} className="target-price">{props.price}</p>
            <p style={tableStyle.quantity} className="quantity">{props.quantity}</p>
            <p style={tableStyle.total} className="total">{props.total}</p>
            {
                props.cancel
                ? (
                    <p style={tableStyle.cancel} className='cancel'>
                        <button onClick={() => handleCancelTransaction(props.total, props.company, props.quantity)} className="cancel-button">C</button>
                    </p>
                )
                : null
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePendingTransaction: index => dispatch(deletePendingTransaction(index)),
        substractFromPendingBlockedAmount: amount => dispatch(substractFromPendingBlockedAmount(amount)),
        substractFromPendingBlockedStocks: (company, units) => dispatch(substractFromPendingBlockedStocks(company, units)),
    }
}

export default connect(null, mapDispatchToProps)(TransactionRow)