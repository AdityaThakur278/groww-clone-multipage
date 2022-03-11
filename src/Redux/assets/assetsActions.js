export const addToAssets = (company, transactionDetail, currentPrice) => {
    return {
        type: "ADD_TO_ASSETS",
        company,
        transactionDetail,
        currentPrice,
    }
}

export const substractFromAssets = (company, transactionDetail, currentPrice) => {
    return {
        type: "SUBSTRACT_FROM_ASSETS",
        company,
        transactionDetail,
        currentPrice,
    }
}

export const updateCompanyProfitLoss = (company, assetDetail) => {
    return {
        type: "UPDATE_COMPANY_PROFIT_LOSS",
        company,
        assetDetail,
    }
}