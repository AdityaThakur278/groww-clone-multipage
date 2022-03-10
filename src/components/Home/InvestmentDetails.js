import React from 'react'
import { connect } from 'react-redux'
import "./InvestmentDetails.css"

function InvestmentDetails(props) {
    return (
        <div className="investment-detail">
            <div className="investment-detail-top">
                <div className="top-card">
                    <p className="top-card-text">Total Investment</p>
                    <p className="top-card-value">1000.00</p>
                </div>
                <div className="top-card">Current Total</div>
                <div className="top-card">Profit/Loss</div>
            </div>
            <div className="investment-detail-bottom">
                <div className="wallet-balance">
                    <p>Wallet Balance</p>
                    <p className="wallet-balance-amount">₹{props.walletBalance}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		walletBalance: state.wallet.balance,
	}
}

export default connect(mapStateToProps, null)(InvestmentDetails)