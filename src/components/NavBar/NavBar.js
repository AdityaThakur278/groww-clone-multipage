import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
import { fetchStockData, updateStockData } from "../../Redux/stockData/stockDataAction";
import { connect } from 'react-redux';
import { checkPendingTransactions } from '../checkPendingTransactions';
import { addToCompleteTransaction, deletePendingTransaction } from "../../Redux/transaction/transactionAction"
import { addToAssets } from "../../Redux/assets/assetsActions"

function NavBar(props) {

    // Fetching data here to solve re-rendering issue
    // Call fetchStockData on 1st render, then updateStockData on further renders
    useEffect(() => {
        setTimeout(() => {
            props.fetchStockData();

            setInterval(() => {
                props.updateStockData();
            }, 3000);
        }, 3000);
    }, [])
 
    useEffect(() => {
        checkPendingTransactions(
            props.data,
            props.mapCompanyToIndex,
            props.pendingTransaction,
            props.walletBalance,
            props.addToCompleteTransaction,
            props.addToAssets,
            props.deletePendingTransaction,
        );
    }, [props.data])

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
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.stockData.data,
        mapCompanyToIndex: state.stockData.mapCompanyToIndex,
        pendingTransaction: state.transaction.pendingTransaction,
        loading: state.stockData.loading,
        walletBalance: state.wallet.balance,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockData: () => dispatch(fetchStockData()),
        updateStockData: (data, mapCompanyToIndex) => dispatch(updateStockData(data, mapCompanyToIndex)),
        addToCompleteTransaction: transaction => dispatch(addToCompleteTransaction(transaction)),
        addToAssets: (company, transactionDetail) => dispatch(addToAssets(company, transactionDetail)),
        deletePendingTransaction: (index) => dispatch(deletePendingTransaction(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)