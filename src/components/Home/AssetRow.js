import React from 'react'
import { connect } from 'react-redux'
import AddToWatchlist from './AddToWatchlist'
import "./AssetRow.css"

function AssetRow(props) {

    const index = props.mapCompanyToIndex[props.company];

    return (
        <div className="table-row">
            <p className="company-name">{props.company}</p>
            <p className="average-price">{props.price}</p>
            <p className="quantity">{props.quantity}</p>
            <p className="total">{props.total}</p>

            <AddToWatchlist width={{width: "17%"}} company={props.company} index={index}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mapCompanyToIndex: state.stockData.mapCompanyToIndex,
    }
}

export default connect(mapStateToProps, null)(AssetRow)