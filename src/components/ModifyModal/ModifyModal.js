import React from 'react'
import BuySellForm from '../BuySellForm/BuySellForm';
import "./ModifyModal.css"

function ModifyModal(props) {
    return (
        <div className="modify-modal">
            <div className="modify-modal-container">
                <BuySellForm 
                    isModify={true}
                    setModifyModal={props.setModifyModal}
                    id = {props.id}
                    type = {props.type}
                    transactionType = {props.transactionType}
                    company={props.company}
                    price={props.price}
                    quantity={props.quantity}
                    total={props.total}
                />
            </div>
        </div>
    )
}

export default ModifyModal