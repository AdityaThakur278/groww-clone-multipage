const initialState = {}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_ASSETS":
            const company = action.company;
            const transactionDetail = action.transactionDetail;

            if(state[company] === undefined) {
                return {
                    ...state,
                    [company] : transactionDetail,
                }
            }

            const shallowCopy = {...state[company]};
            shallowCopy.quantity = parseInt(shallowCopy.quantity) + parseInt(transactionDetail.quantity)
            shallowCopy.total = parseFloat(shallowCopy.total) + parseFloat(transactionDetail.total);
            shallowCopy.price = shallowCopy.total / shallowCopy.quantity;
            shallowCopy.total = shallowCopy.total.toFixed(2);
            shallowCopy.price = shallowCopy.price.toFixed(2);
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
            shallowCopyCompany.total = shallowCopyCompany.total.toFixed(2);

            shallowCopyAsset[companyName] = shallowCopyCompany;
            
            if(shallowCopyCompany.quantity === 0) {
                delete shallowCopyAsset[companyName];
            }

            return shallowCopyAsset;
        default:
            return state;
    }
}

export default reducer;