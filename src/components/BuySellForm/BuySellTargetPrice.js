import React from 'react'
import "./BuySellTargetPrice.css"
import {targetPriceChange} from "../../Actions/buySellAction"
import { connect } from 'react-redux'

function BuySellTargetPrice(props) {
  return (
    <div className="buy-sell-target-price">
        <label className="target-price-label" htmlFor="target-price">Target Price</label>
        <input 
            className="target-price-input" 
            type="text" 
            name="target-price" 
            value={props.targetPrice}
            onChange={e => props.targetPriceChange(e.target.value)}
        />
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        targetPrice: state.buySellForm.targetPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        targetPriceChange: (value) => dispatch(targetPriceChange(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellTargetPrice)