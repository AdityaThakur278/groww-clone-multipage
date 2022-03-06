import React from 'react'
import TransactionRow from './TransactionRow';
import "./TransactionTable.css"

function TransactionTable(props) {

    const transactionArray = props.transactionArray;

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
                    {props.cancel ? <p style={tableStyle.cancel} className='cancel'>Cancel</p> : null}
                </div>
            </div>

            {
                transactionArray.length === 0 
                ? (
                    <div className="no-transaction">
                        No Transactions
                    </div>
                ) 
                : (
                    transactionArray.map((obj, index) => {
                        return  <TransactionRow
                                    key={index}
                                    index={index}
                                    type={obj.type}
                                    company={obj.company}
                                    price={obj.price}
                                    quantity={obj.quantity}
                                    total={obj.total}
                                    cancel={props.cancel}
                                />
                    })
                )
            }
        </div>
    )
}

export default TransactionTable;