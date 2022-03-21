import React, {useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./NavBar.css"
import { connect } from 'react-redux';
import { checkPendingTransactions } from './NavBar.helper';
import { addToTransactions, deletePendingTransaction, substractFromPendingBlockedAmount, substractFromPendingBlockedStocks } from "../../Actions/transactionAction"
import { addToAssets, substractFromAssets } from "../../Actions/assetsActions"
import { addToWallet, withdrawFromWallet } from "../../Actions/walletActions"
import WalletModel from '../../Pages/Wallet/Wallet';
import { fetchStockData, updateStockData } from '../../Actions/stockDataAction';
import { useAuth } from '../../utils/auth';

function NavBar(props) {

    const [walletModel, setWalletModel] = useState(false);
    const [addTab, setAddTab] = useState(false);
    const [withdrawTab, setWithdrawTab] = useState(false);
    const [dropDown, setDropDown] = useState(false);

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
            blockedTransactions: props.blockedTransactions,
        }
        checkPendingTransactions(funcArguments);

    }, [props.stocksData])

    const navLinkStyle = ({ isActive }) => {
        return {
            color: isActive ? "#00d09c" : "black",
            borderBottom: isActive ? "3px solid #00d09c" : "none",
        }
    }

    const navigate = useNavigate();
    function handleNavigateToProfile() {
        setDropDown(false)
        navigate("/profile")
    }

    const auth = useAuth();
    const avatarText = auth.user.userName.charAt(0).toUpperCase();

    return (
        <nav className="navbar">
            <div className='groww-name'>
                <NavLink style={{color: "#00d09c", fontWeight: "bold"}} className="element" to="/">Groww</NavLink>
            </div>
            <div className='remaining-element-wrapper'>
                <div className='remaining-element'>
                    <NavLink style={navLinkStyle} className="element" to="/">Home</NavLink>
                    <NavLink style={navLinkStyle} className="element" to="/watchlist">Watchlist</NavLink>
                    <NavLink style={navLinkStyle} className="element" to="/transactions">Transactions</NavLink>
                    <NavLink style={navLinkStyle} className="element" to="/portfolio">Portfolio</NavLink>
                    <div 
                        className="element element-hover"
                        onClick={() => {setWalletModel(true); setAddTab(true); setWithdrawTab(false)}}
                    >
                        Wallet
                    </div>

                    {walletModel && <WalletModel
                                        addTab = {addTab}
                                        withdrawTab = {withdrawTab}
                                        setWalletModel = {setWalletModel}
                                        setAddTab = {setAddTab}
                                        setWithdrawTab = {setWithdrawTab}
                                    />}
                </div>
                
                <div className="avatar-wrapper">
                    <div className="element avatar" onClick={() => setDropDown(prev => !prev)}>
                        {avatarText}
                    </div>
                    {dropDown && <div className="drop-down-list">
                        <p className="drop-down-item" onClick={handleNavigateToProfile}>Profile</p>
                        <p className="drop-down-item" onClick={auth.logout}>Logout</p>
                    </div>}
                </div>
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
        blockedTransactions: state.transaction.blockedTransactions,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockData: () => dispatch(fetchStockData()),
        updateStockData: () => dispatch(updateStockData()),
        addToTransactions: (id, transaction) => dispatch(addToTransactions(id, transaction)),
        addToAssets: (company, transactionDetail, currentPrice) => dispatch(addToAssets(company, transactionDetail, currentPrice)),
        deletePendingTransaction: (id) => dispatch(deletePendingTransaction(id)),
        withdrawFromWallet: (amount) => dispatch(withdrawFromWallet(amount)),
        substractFromPendingBlockedAmount: (amount) => dispatch(substractFromPendingBlockedAmount(amount)),
        substractFromAssets: (company, transactionDetail, currentPrice) => dispatch(substractFromAssets(company, transactionDetail, currentPrice)),
        addToWallet: amount => dispatch(addToWallet(amount)),
        substractFromPendingBlockedStocks: (company, units, id) => dispatch(substractFromPendingBlockedStocks(company, units, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)