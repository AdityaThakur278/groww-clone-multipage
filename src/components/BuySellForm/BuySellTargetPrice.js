import React from 'react'
import "./BuySellTargetPrice.css"

function BuySellTargetPrice() {
  return (
    <div className="buy-sell-target-price">
        <label className="target-price-label" htmlFor="target-price">Target Price</label>
        <input 
            className="target-price-input" 
            type="text" 
            name="target-price" 
        />
    </div>
  )
}

export default BuySellTargetPrice