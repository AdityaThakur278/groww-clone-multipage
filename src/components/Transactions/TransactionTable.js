import React from 'react'
import { connect } from 'react-redux';
import TransactionRow from './TransactionRow';
import "./TransactionTable.css"

function TransactionTable(props) {

    const pendindTransactionID = props.transactionID.filter(id => props.transactions[id].transactionType === "pending");
    const completeTransactionID = props.transactionID.filter(id => props.transactions[id].transactionType === "complete");

    return (
        <div className="transaction-table">
            <div className="heading">
                <p className="heading-name">{props.type} Transactions</p>
            </div>

            <div className="table">
                <div className="table-heading">
                    <p className="transaction-type">Type</p>
                    <p className="companyname">Company</p>
                    <p className="target-price">Target Price</p>
                    <p className="quantity">Quantity</p>
                    <p className="total">Total</p>
                    <p className='cancel-modify-status'>{props.type === "Pending" ? "Cancel/Modify" : "Status"}</p>
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
                        transactionType = {props.transactions[id].transactionType}
                        company={props.transactions[id].company}
                        price={props.transactions[id].price}
                        quantity={props.transactions[id].quantity}
                        total={props.transactions[id].total}
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
                        transactionType = {props.transactions[id].transactionType}
                        company={props.transactions[id].company}
                        price={props.transactions[id].price}
                        quantity={props.transactions[id].quantity}
                        total={props.transactions[id].total}
                        status={props.transactions[id].status}
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