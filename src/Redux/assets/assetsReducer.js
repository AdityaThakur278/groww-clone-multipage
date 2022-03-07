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

        default:
            return state;
    }
}

export default reducer;