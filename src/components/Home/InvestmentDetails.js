import React, { useState } from 'react'
import { connect } from 'react-redux'
import "./InvestmentDetails.css"
import WalletModel from './WalletModel';

function InvestmentDetails(props) {

    const [walletModel, setWalletModel] = useState(false);
    const [addTab, setAddTab] = useState(false);
    const [withdrawTab, setWithdrawTab] = useState(false);

    return (
        <div className="investment-detail">
            <div className="investment-detail-top">
                <div className="top-card">Total Investment</div>
                <div className="top-card">Current Total</div>
                <div className="top-card">Profit/Loss</div>
            </div>
            <div className="investment-detail-bottom">
                <div className="wallet-balance">
                    <p>Wallet Balance</p>
                    <p className="wallet-balance-amount">₹{props.walletBalance}</p>
                </div>
                <div className="wallet-transactions">
                    <p className="withdraw-msg">Add/Withdraw from wallet</p>
                    <div className="transaction-button">
                        <button 
                            className="wallet-add-button"
                            onClick={() => {setWalletModel(true); setAddTab(true); setWithdrawTab(false)}}
                        >
                            Add
                        </button>
                        <button 
                            className="wallet-withdraw-button"
                            onClick={() => {setWalletModel(true); setAddTab(false); setWithdrawTab(true)}}
                        >
                            Withdraw
                        </button>

                        {walletModel && <WalletModel
                                            addTab = {addTab}
                                            withdrawTab = {withdrawTab}
                                            setWalletModel = {setWalletModel}
                                            setAddTab = {setAddTab}
                                            setWithdrawTab = {setWithdrawTab}
                                        />}
                    </div>
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