import React from 'react'
import { connect } from 'react-redux';
import TransactionRow from './TransactionRow';
import "./TransactionTable.css"

function TransactionTable(props) {

    const pendindTransactionID = props.transactionID.filter(id => props.transactions[id].transactionType === "pending");
    const completeTransactionID = props.transactionID.filter(id => props.transactions[id].transactionType === "complete");

    const tableStyle = {
        transactionType: {width: props.cancel ? "9%" : "10%"},
        companyName: {width: props.cancel ? "25%" : "32%"},
        targetPrice: {width: props.cancel ? "20%" : "23%"},
        quantity: {width: props.cancel ? "12%" : "13%"},
        total: {width: props.cancel ? "22%" : "22%"},
        cancel: {width: "12%"},
    }

    return (
        <div className="transaction-table">
            <div className="heading">
                <p className="heading-name">{props.type} Transactions</p>
            </div>

            <div className="table">
                <div className="table-heading">
                    <p style={tableStyle.transactionType} className="transaction-type">Type</p>
                    <p style={tableStyle.companyName} className="company-name">Company</p>
                    <p style={tableStyle.targetPrice} className="target-price">Target Price</p>
                    <p style={tableStyle.quantity} className="quantity">Quantity</p>
                    <p style={tableStyle.total} className="total">Total</p>
                    {props.type === "Pending" ? <p style={tableStyle.cancel} className='cancel'>Cancel</p> : null}
                </div>
            </div>

            {
                props.type === "Pending" 
                ? pendindTransactionID.length === 0
                    ? (
                        <div className="no-transaction">
                            No Transactions
                        </div>
                    )
                    : pendindTransactionID.map(id =>  <TransactionRow
                        key = {id}
                        id = {id}
                        type = {props.transactions[id].type}
                        company={props.transactions[id].company}
                        price={props.transactions[id].price}
                        quantity={props.transactions[id].quantity}
                        total={props.transactions[id].total}
                        cancel={true}
                    />)
                
                : completeTransactionID.length === 0
                    ? (
                        <div className="no-transaction">
                            No Transactions
                        </div>
                    )
                    : completeTransactionID.map(id =>  <TransactionRow
                        key = {id}
                        id = {id}
                        type = {props.transactions[id].type}
                        company={props.transactions[id].company}
                        price={props.transactions[id].price}
                        quantity={props.transactions[id].quantity}
                        total={props.transactions[id].total}
                        cancel={false}
                    />)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transaction.transactions,
        transactionID: state.transaction.transactionID,
    }
}

export default connect(mapStateToProps, null)(TransactionTable);