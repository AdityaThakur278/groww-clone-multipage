import { AssetActionTypes } from "../Types"

export const addToAssets = (company, transactionDetail, currentPrice) => {
    return {
        type: AssetActionTypes.ADD_TO_ASSETS,
        company,
        transactionDetail,
        currentPrice,
    }
}

export const substractFromAssets = (company, transactionDetail, currentPrice) => {
    return {
        type: AssetActionTypes.SUBSTRACT_FROM_ASSETS,
        company,
        transactionDetail,
        currentPrice,
    }
}

export const updateCompanyProfitLoss = (company, assetDetail) => {
    return {
        type: AssetActionTypes.UPDATE_COMPANY_PROFIT_LOSS,
        company,
        assetDetail,
    }
}