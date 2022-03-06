import React from 'react'
import "./Transactions.css"
import TransactionTable from './TransactionTable'
import { connect } from 'react-redux'

function Transantions(props) {
    return (
        <div className='transactions-container'>
            <div className='pending-transaction'>
                <TransactionTable type="Pending" transactionArray={props.pendingTransaction}/>
            </div>
            <div className='complete-transaction'>
                <TransactionTable type="Complete" transactionArray={props.completeTransaction}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		pendingTransaction: state.transaction.pendingTransaction,
		completeTransaction: state.transaction.completeTransaction,
	}
}

export default connect(mapStateToProps, null)(Transantions)