const initialState = {}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_ASSETS":
            const company = action.company;
            const transactionDetail = action.transactionDetail;

            if(state[company] === undefined) {
                let profitLoss = (parseFloat(action.currentPrice) - parseFloat(transactionDetail.price)) * parseFloat(transactionDetail.quantity);
                profitLoss = profitLoss.toFixed(2);
                transactionDetail.profitLoss = profitLoss;

                return {
                    ...state,
                    [company] : transactionDetail,
                }
            }

            const shallowCopy = {...state[company]};
            shallowCopy.quantity = parseInt(shallowCopy.quantity) + parseInt(transactionDetail.quantity)
            shallowCopy.total = parseFloat(shallowCopy.total) + parseFloat(transactionDetail.total);
            shallowCopy.price = shallowCopy.total / shallowCopy.quantity;
            shallowCopy.profitLoss = (parseFloat(action.currentPrice) - shallowCopy.price) * shallowCopy.quantity;
            shallowCopy.total = shallowCopy.total.toFixed(2);
            shallowCopy.price = shallowCopy.price.toFixed(2);
            shallowCopy.profitLoss = shallowCopy.profitLoss.toFixed(2);
            return {
                ...state,
                [company] : shallowCopy,
            }
        case "SUBSTRACT_FROM_ASSETS":
            const companyName = action.company;
            const transactionDetails = action.transactionDetail;
            const shallowCopyAsset = {...state};
            const shallowCopyCompany = {...state[companyName]}
 
            shallowCopyCompany.quantity = parseInt(shallowCopyCompany.quantity) - parseInt(transactionDetails.quantity);
            shallowCopyCompany.total = parseFloat(shallowCopyCompany.quantity) * parseFloat(shallowCopyCompany.price);
            shallowCopyCompany.profitLoss = (parseFloat(action.currentPrice) - parseFloat(shallowCopyCompany.price)) * shallowCopyCompany.quantity;
            shallowCopyCompany.total = shallowCopyCompany.total.toFixed(2);
            shallowCopyCompany.profitLoss = shallowCopyCompany.profitLoss.toFixed(2);

            shallowCopyAsset[companyName] = shallowCopyCompany;
            
            if(shallowCopyCompany.quantity === 0) {
                delete shallowCopyAsset[companyName];
            }

            return shallowCopyAsset;
            
        case "UPDATE_COMPANY_PROFIT_LOSS":
            return {
                ...state,
                [action.company]: action.assetDetail,
            }
        default:
            return state;
    }
}

export default reducer;