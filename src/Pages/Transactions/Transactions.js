import React from 'react'
import TransactionTable from '../../components/Table/TransactionTable'
import "./Transactions.css"

function Transantions(props) {
    return (
        <div className='transactions-container'>
            <div className='pending-transaction'>
                <TransactionTable type="Pending"/>
            </div>
            <div className='complete-transaction'>
                <TransactionTable type="Complete"/>
            </div>
        </div>
    )
}

export default Transantions