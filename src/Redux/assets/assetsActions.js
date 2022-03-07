export const addToAssets = (company, transactionDetail) => {
    return {
        type: "ADD_TO_ASSETS",
        company,
        transactionDetail,
    }
}