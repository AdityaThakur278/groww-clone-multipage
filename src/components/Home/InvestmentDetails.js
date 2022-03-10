import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import "./InvestmentDetails.css"

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function InvestmentDetails(props) {

    const [totalInvestment, setTotalInvestment] = useState(0);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [profitLoss, setProfitLoss] = useState(0);

    const profitLossStyle = parseFloat(profitLoss) < 0 ? "loss" : "profit";

    useEffect(() => {
        let totalInvestment = 0;
        let currentTotal = 0;

        for (var company of Object.keys(props.assets)) {
            totalInvestment += parseFloat(props.assets[company].total);

            const index = getCompanyIndex(props.stocksData, company);
            const price = parseFloat(props.stocksData[index].ltp);
            const units = parseFloat(props.assets[company].quantity);
            currentTotal += price * units;
        }
        setTotalInvestment(totalInvestment.toFixed(2));

        let profitLoss = currentTotal - totalInvestment;
        profitLoss = profitLoss.toFixed(2);
        currentTotal = currentTotal.toFixed(2);
        setCurrentTotal(currentTotal);
        setProfitLoss(profitLoss);

    }, [props.stocksData, props.assets])

    return (
        <div className="investment-detail">
            <div className="investment-detail-top">
                <div className="top-card">
                    <p className="top-card-text">Total Investment</p>
                    <p className="top-card-value">₹{totalInvestment}</p>
                </div>
                <div className="top-card">
                    <p className="top-card-text">Current Total</p>
                    <p className="top-card-value">₹{currentTotal}</p>
                </div>
                <div className="top-card">
                    <p className="top-card-text">{parseFloat(profitLoss) < 0 ? "Loss" : "Profit"}</p>
                    <p className={"top-card-value " + profitLossStyle}>₹{Math.abs(parseFloat(profitLoss))}</p>
                </div>
                <div className="top-card">
                    <p className="top-card-text">Wallet Balance</p>
                    <p className="top-card-value">₹{props.walletBalance}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		walletBalance: state.wallet.balance,
        assets: state.assets,
        stocksData: state.stockData.stocksData,
	}
}

export default connect(mapStateToProps, null)(InvestmentDetails)