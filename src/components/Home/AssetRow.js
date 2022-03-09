import React from 'react'
import { connect } from 'react-redux'
import AddToWatchlist from './AddToWatchlist'
import "./AssetRow.css"

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function AssetRow(props) {
    return (
        <div className="table-row">
            <p className="company-name">{props.company}</p>
            <p className="average-price">{props.price}</p>
            <p className="quantity">{props.quantity}</p>
            <p className="total">{props.total}</p>

            <AddToWatchlist 
                width={{width: "17%"}} 
                company={props.company} 
                index={getCompanyIndex(props.stocksData, props.company)}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stocksData: state.stockData.stocksData,
    }
}

export default connect(mapStateToProps, null)(AssetRow)