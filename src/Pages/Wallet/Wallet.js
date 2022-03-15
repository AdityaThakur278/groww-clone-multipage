import React, { useState } from 'react'
import { connect } from 'react-redux';
import "./Wallet.css"
import { addToWallet, withdrawFromWallet } from "../../Actions/walletActions"

function WalletModel(props) {

    const [amountInput, setAmountInput] = useState(0)

    const addTabStyle = props.addTab ? "selected" : "";
    const withdrawTabStyle = props.withdrawTab ? "selected" : "";
    const addWithdrawButton = props.addTab ? "Add" : "Withdraw";

    function handleTabClick(value) {
        if(value === "add") {
            props.setAddTab(true);
            props.setWithdrawTab(false);
        }
        else if(value === "withdraw") {
            props.setAddTab(false);
            props.setWithdrawTab(true);
        }
    }

    function handleWalletTransaction() {
        if(props.addTab) {
            props.addToWallet(amountInput);
            alert("Amount added successfully");
        }
        else if(props.withdrawTab) {

            if(parseFloat(props.balance) < parseFloat(amountInput)) {
                alert("Not enough balance!");
                return;
            }
            else if(parseFloat(props.balance) < parseFloat(amountInput) + parseFloat(props.pendingBlockedAmount)) {
                alert("₹" + props.pendingBlockedAmount +  " of wallet balance(₹" + props.balance + ") is blocked in pending transaction");
                return;
            }

            props.withdrawFromWallet(amountInput);
            alert("Amount withdrawn successfully");
        }

        props.setWalletModel(false);
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <p>Add/Withdraw from wallet</p>
                    <button
                        onClick={() => {
                        props.setWalletModel(false);
                        }}
                    >
                        X
                    </button>
                </div>

                <div className="add-withdraw-balance">
                    <div className="add-withdraw">
                        <p className={"add " + addTabStyle} onClick={() => handleTabClick("add")}>ADD</p>
                        <p className={"withdraw " + withdrawTabStyle} onClick={() => handleTabClick("withdraw")}>WITHDRAW</p>
                    </div>
                    <div className="balance">
                        <p className="balance-text">Current Balance</p>
                        <p className="balance-amount">₹{props.balance}</p>
                    </div>
                </div>

                <div className="add-withdraw-amount">
                    <label className="add-withdraw-amt-label" htmlFor="amount">Enter Amount</label>
                    <input 
                        className="add-withdraw-amt-input" 
                        type="text" 
                        name="amount" 
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                    />
                </div>

                <p className="add-withdraw-info"> {"₹" + props.pendingBlockedAmount +  " of wallet balance(₹" + props.balance + ") is blocked in pending transaction"} </p>

                <div className="add-withdraw-cancel-button">
                    <button className="cancel-button" onClick={() => props.setWalletModel(false)}>Cancel</button>
                    <button className="add-withdraw-button" onClick={handleWalletTransaction}>{addWithdrawButton}</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        balance: (state.wallet.balance).toFixed(2),
        pendingBlockedAmount: state.transaction.pendingBlockedAmount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToWallet: (amount) => dispatch(addToWallet(amount)),
        withdrawFromWallet: (amount) => dispatch(withdrawFromWallet(amount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletModel)