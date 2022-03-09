import React from 'react'
import { connect } from 'react-redux';
import "./WalletModel.css"

function WalletModel(props) {

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
                        value={"100"}
                        onChange={() => {}}
                    />
                </div>

                <div className="add-withdraw-cancel-button">
                    <button className="cancel-button" onClick={() => props.setWalletModel(false)}>Cancel</button>
                    <button className="add-withdraw-button">{addWithdrawButton}</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        balance: (state.wallet.balance).toFixed(2),
    }
}

export default connect(mapStateToProps, null)(WalletModel)