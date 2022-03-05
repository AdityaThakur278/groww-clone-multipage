import React from 'react'
import "./BuySellForm.css"
import BuySellPrice from './BuySellPrice'
import BuySellQuantity from './BuySellQuantity'
import BuySellTargetPrice from './BuySellTargetPrice'
import BuySellTransaction from './BuySellTransaction'

function BuySellForm() {
  return (
    <div className="buy-sell-form">
        <div className="company-name">HDFC</div>

        <div className="buy-sell-sub-container">
                <div className="buy-sell-tab">
                    <p className={"buy-sell-tab-item selected" } >BUY</p>
                    <p className={"buy-sell-tab-item " } >SELL</p>
                    <p className="units-owned">Shares Owned - 0</p>
                </div>

                <BuySellQuantity/>
                <BuySellTargetPrice/>
                <BuySellPrice/>

                <p className="buy-sell-info">
                    Order will expire when market closes today
                </p>

                <BuySellTransaction/>
        </div>
    </div>
  )
}

export default BuySellForm