import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
import { fetchStockData, updateStockData } from "../../Redux/stockData/stockDataAction";
import { connect } from 'react-redux';
import { checkPendingTransactions } from '../checkPendingTransactions';
import { addToTransactions, deletePendingTransaction, substractFromPendingBlockedAmount, substractFromPendingBlockedStocks } from "../../Redux/transaction/transactionAction"
import { addToAssets, substractFromAssets } from "../../Redux/assets/assetsActions"
import { addToWallet, withdrawFromWallet } from "../../Redux/wallet/walletActions"
import WalletModel from './WalletModel';

function NavBar(props) {

    const [walletModel, setWalletModel] = useState(false);
    const [addTab, setAddTab] = useState(false);
    const [withdrawTab, setWithdrawTab] = useState(false);

    // Fetching data here to solve re-rendering issue
    // Call fetchStockData on 1st render, then updateStockData on further renders
    useEffect(() => {
        setTimeout(() => {
            props.fetchStockData();

            setInterval(() => {
                props.updateStockData();
            }, 5000);
        }, 3000);
    }, [])
 
    useEffect(() => {
        const funcArguments = {
            stocksData: props.stocksData,
            transactions: props.transactions,
            transactionID: props.transactionID,
            addToTransactions: props.addToTransactions,
            addToAssets: props.addToAssets,
            deletePendingTransaction: props.deletePendingTransaction,
            withdrawFromWallet: props.withdrawFromWallet,
            substractFromPendingBlockedAmount: props.substractFromPendingBlockedAmount,
            substractFromAssets: props.substractFromAssets,
            addToWallet: props.addToWallet,
            substractFromPendingBlockedStocks: props.substractFromPendingBlockedStocks,
        }
        checkPendingTransactions(funcArguments);

    }, [props.stocksData])

    const navLinkStyle = ({ isActive }) => {
        return {
            color: isActive ? "#00d09c" : "black",
            borderBottom: isActive ? "3px solid #00d09c" : "none",
        }
    }

    return (
        <nav className="navbar">
            <div className='groww-name'>
                <NavLink style={{color: "#00d09c", fontWeight: "bold"}} className="element" to="/">Groww</NavLink>
            </div>
            <div className='remaining-element'>
                <NavLink style={navLinkStyle} className="element" to="/">Home</NavLink>
                <NavLink style={navLinkStyle} className="element" to="/watchlist">Watchlist</NavLink>
                <NavLink style={navLinkStyle} className="element" to="/transactions">Transactions</NavLink>
                <NavLink style={navLinkStyle} className="element" to="/portfolio">Portfolio</NavLink>
                <div 
                    className="element element-hover"
                    onClick={() => {setWalletModel(true); setAddTab(true); setWithdrawTab(false)}}
                >
                    Funds
                </div>

                {walletModel && <WalletModel
                                    addTab = {addTab}
                                    withdrawTab = {withdrawTab}
                                    setWalletModel = {setWalletModel}
                                    setAddTab = {setAddTab}
                                    setWithdrawTab = {setWithdrawTab}
                                />}
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        stocksData: state.stockData.stocksData,
        transactions: state.transaction.transactions,
        transactionID: state.transaction.transactionID,
        loading: state.stockData.loading,
        walletBalance: state.wallet.balance,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockData: () => dispatch(fetchStockData()),
        updateStockData: () => dispatch(updateStockData()),
        addToTransactions: (id, transaction) => dispatch(addToTransactions(id, transaction)),
        addToAssets: (company, transactionDetail) => dispatch(addToAssets(company, transactionDetail)),
        deletePendingTransaction: (id) => dispatch(deletePendingTransaction(id)),
        withdrawFromWallet: (amount) => dispatch(withdrawFromWallet(amount)),
        substractFromPendingBlockedAmount: (amount) => dispatch(substractFromPendingBlockedAmount(amount)),
        substractFromAssets: (company, transactionDetail) => dispatch(substractFromAssets(company, transactionDetail)),
        addToWallet: amount => dispatch(addToWallet(amount)),
        substractFromPendingBlockedStocks: (company, units) => dispatch(substractFromPendingBlockedStocks(company, units)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)