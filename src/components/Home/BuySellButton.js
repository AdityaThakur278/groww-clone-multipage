import React from 'react'
import "./BuySellButton.css"

function BuySellButton(props) {

    const buttonStyle = props.type + "-button";
    const innerHtml = props.type.charAt(0).toUpperCase();

  return (
    <p className={props.type}>
        <button className={buttonStyle}>{innerHtml}</button>
    </p>
  )
}

export default BuySellButton