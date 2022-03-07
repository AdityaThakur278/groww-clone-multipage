import React from 'react'
import { connect } from 'react-redux'
import AssetRow from './AssetRow';
import "./AssetTable.css"

function AssetTable(props) {

    const assets = props.assets;

    return (
        <div className="table">
            <div className="table-heading">
                <p className="company-name">Company</p>
                <p className="average-price">Price</p>
                <p className="quantity">Units</p>
                <p className="total">Total</p>
                <p className="watchlist">Watchlist</p>
            </div>

            {
                Object.keys(assets).length === 0 
                ? (
                    <div className="no-asset">
                        No Assets
                    </div>
                )
                : Object.keys(assets).map(company => {
                    return  <AssetRow 
                                key={company}
                                company={company}
                                price={assets[company].price}
                                quantity={assets[company].quantity}
                                total={assets[company].total}
                            />
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        assets: state.assets,
    }
}

export default connect(mapStateToProps, null)(AssetTable)