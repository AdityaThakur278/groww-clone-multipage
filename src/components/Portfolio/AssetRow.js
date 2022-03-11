import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AddToWatchlist from '../Home/AddToWatchlist';
import { updateCompanyProfitLoss } from "../../Redux/assets/assetsActions"
import "./AssetRow.css"

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function AssetRow(props) {

    const profitLossStyle = parseFloat(props.profitLoss) < 0 ? "loss" : "profit";
    const index = getCompanyIndex(props.stocksData, props.company);

    useEffect(() => {
        const currentPrice = parseFloat(props.stocksData[index].ltp);
        const targetPrice = parseFloat(props.price);
        const quantity = parseFloat(props.quantity);

        const profitLoss = (currentPrice - targetPrice) * quantity;
        const shallowCopyCompany = {...props.assets[props.company]};
        shallowCopyCompany.profitLoss = profitLoss.toFixed(2);
        props.updateCompanyProfitLoss(props.company, shallowCopyCompany);

    }, [props.stocksData]);

    return (
        <div className="table-row">
            <p className="company-name">{props.company}</p>
            <p className="average-price">{"₹"+props.price}</p>
            <p className="quantity">{props.quantity}</p>
            <p className="total">{"₹"+props.total}</p>
            <p className={"profit-loss " + profitLossStyle}>{"₹"+Math.abs(props.profitLoss)}</p>

            <AddToWatchlist 
                company={props.company} 
                index={index}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stocksData: state.stockData.stocksData,
        assets: state.assets,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCompanyProfitLoss: (company, assetDetail) => dispatch(updateCompanyProfitLoss(company, assetDetail)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetRow)