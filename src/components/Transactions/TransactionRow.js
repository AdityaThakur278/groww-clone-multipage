import React from 'react'
import "./TransactionRow.css"
import { deletePendingTransaction, substractFromPendingBlockedAmount, substractFromPendingBlockedStocks, addToTransactions } from "../../Redux/transaction/transactionAction"
import { connect } from 'react-redux';
import { v4 } from 'uuid';

function TransactionRow(props) {

    function handleCancelTransaction() {
        props.deletePendingTransaction(props.id);
        if(props.type === "B") props.substractFromPendingBlockedAmount(props.total);
        if(props.type === "S") props.substractFromPendingBlockedStocks(props.company, props.quantity, props.id);

        const newId = v4();
        props.addToTransactions(newId, {
            type: props.type,
            status: "Cancelled",
            transactionType: "complete",
            company: props.company,
            price: props.price,
            quantity: props.quantity,
            total: props.total,
        })
    }

    const transactionStatusStyle = props.status === "Successful" ? "successful" : "cancelled";
    const transactionTypeStyle = props.type === "B" ? "transaction-type-buy" : "transaction-type-sell";

    return (
        <div className="company-row">
            <p className={"transaction-type " + transactionTypeStyle}>{props.type}</p>
            <p className="company-name">{props.company}</p>
            <p className="target-price">{props.price}</p>
            <p className="quantity">{props.quantity}</p>
            <p className="total">{props.total}</p>
            {
                props.transactionType === "pending"
                ? (
                    <p className='cancel-modify-status cancel-modify'>
                        <button onClick={() => handleCancelTransaction()} className="cancel-button">C</button>
                        <button className="modify-button">M</button>
                    </p>
                )
                : (
                    <div className='cancel-modify-status'>
                        <p className={transactionStatusStyle}>{props.status}</p>
                    </div>
                )
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePendingTransaction: index => dispatch(deletePendingTransaction(index)),
        substractFromPendingBlockedAmount: amount => dispatch(substractFromPendingBlockedAmount(amount)),
        substractFromPendingBlockedStocks: (company, units, id) => dispatch(substractFromPendingBlockedStocks(company, units, id)),
        addToTransactions: (id, transaction) => dispatch(addToTransactions(id, transaction))
    }
}

export default connect(null, mapDispatchToProps)(TransactionRow)