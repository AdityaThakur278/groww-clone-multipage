import React, { useState } from 'react'
import "./TransactionRow.css"
import { deletePendingTransaction, substractFromPendingBlockedAmount, substractFromPendingBlockedStocks, addToTransactions } from "../../Actions/transactionAction"
import { buySellCompanyChange, marketPriceValueChange, buyTabChange, shareQuantityValueChange, targetPriceChange } from "../../Actions/buySellAction"
import { addToBlockedTransaction } from "../../Actions/transactionAction"
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import ModifyModal from '../ModifyModal/ModifyModal';

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

function TransactionRow(props) {

    const [modifyModal, setModifyModal] = useState(false);

    function handleModifyTransaction() {
        // Block this transaction
        props.addToBlockedTransaction(props.id)

        // Change BuySellForm data
        props.buySellCompanyChange(props.company);
        const index = getCompanyIndex(props.stocksData, props.company);
        const marketPrice = props.stocksData[index].ltp;
        props.marketPriceValueChange(marketPrice);
        props.buyTabChange(props.type === "B" ? true : false);
        props.shareQuantityValueChange(props.quantity);
        props.targetPriceChange(props.price);

        // Open Modal
        setModifyModal(true);
    }

    function handleCancelTransaction() {
        props.deletePendingTransaction(props.id);
        if(props.type === "B") props.substractFromPendingBlockedAmount(props.total);
        if(props.type === "S") props.substractFromPendingBlockedStocks(props.company, props.quantity, props.id);

        const newId = v4();
        props.addToTransactions(newId, {
            type: props.type,
            status: "Cancelled",
            transactionType: "complete",
            company: props.company,
            price: props.price,
            quantity: props.quantity,
            total: props.total,
        })
    }

    const transactionStatusStyle = props.status === "Successful" ? "successful" : "cancelled";
    const transactionTypeStyle = props.type === "B" ? "transaction-type-buy" : "transaction-type-sell";

    return (
        <div className="company-row">
            <p className={"transaction-type " + transactionTypeStyle}>{props.type}</p>
            <p className="companyname">{props.company}</p>
            <p className="target-price">{props.price}</p>
            <p className="quantity">{props.quantity}</p>
            <p className="total">{props.total}</p>
            {
                props.transactionType === "pending"
                ? (
                    <p className='cancel-modify-status cancel-modify'>
                        <button onClick={handleCancelTransaction} className="cancel-button">C</button>
                        <button onClick={handleModifyTransaction} className="modify-button">M</button>
                    </p>
                )
                : (
                    <div className='cancel-modify-status'>
                        <p className={transactionStatusStyle}>{props.status}</p>
                    </div>
                )
            }

            {
                modifyModal &&  <ModifyModal
                                    setModifyModal={setModifyModal}
                                    id = {props.id}
                                    type = {props.type}
                                    transactionType = {props.transactionType}
                                    company={props.company}
                                    price={props.price}
                                    quantity={props.quantity}
                                    total={props.total}
                                />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        stocksData: state.stockData.stocksData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePendingTransaction: index => dispatch(deletePendingTransaction(index)),
        substractFromPendingBlockedAmount: amount => dispatch(substractFromPendingBlockedAmount(amount)),
        substractFromPendingBlockedStocks: (company, units, id) => dispatch(substractFromPendingBlockedStocks(company, units, id)),
        addToTransactions: (id, transaction) => dispatch(addToTransactions(id, transaction)),
        buySellCompanyChange: value => dispatch(buySellCompanyChange(value)),
        marketPriceValueChange: value => dispatch(marketPriceValueChange(value)),
        buyTabChange: value => dispatch(buyTabChange(value)),
        shareQuantityValueChange: value => dispatch(shareQuantityValueChange(value)),
        targetPriceChange: value => dispatch(targetPriceChange(value)),
        addToBlockedTransaction: id => dispatch(addToBlockedTransaction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionRow)