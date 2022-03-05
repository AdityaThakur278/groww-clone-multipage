import React from 'react'
import "./BuySellQuantity.css"
import {shareQuantityValueChange} from "../../Redux/buySellForm/buySellAction"
import { connect } from 'react-redux'

function BuySellQuantity(props) {
  return (
    <div className="buy-sell-quantity">
        <label className="quantity-label" htmlFor="shareQuantity">Share Quantity</label>
        <input 
            className="quantity-input" 
            type="text" 
            name="shareQuantity" 
            value={props.shareQuantityValue}
            onChange={e => props.shareQuantityChange(e.target.value)}
        />
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        shareQuantityValue: state.buySellForm.shareQuantityValue,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        shareQuantityChange: (value) => dispatch(shareQuantityValueChange(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellQuantity)