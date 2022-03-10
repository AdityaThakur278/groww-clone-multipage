export const addToAssets = (company, transactionDetail) => {
    return {
        type: "ADD_TO_ASSETS",
        company,
        transactionDetail,
    }
}

export const substractFromAssets = (company, transactionDetail) => {
    return {
        type: "SUBSTRACT_FROM_ASSETS",
        company,
        transactionDetail,
    }
}