const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

// Call from NavBar.js
export const checkPendingTransactions = (
    stocksData,
    pendingTransaction,
    walletBalance,
    addToCompleteTransaction,
    addToAssets,
    deletePendingTransaction,
    withdrawFromWallet,
    ) => {

    for(let i=pendingTransaction.length-1; i>=0; i--) {
        const type = pendingTransaction[i].type;
        const company = pendingTransaction[i].company;
        const targetPrice = parseFloat(pendingTransaction[i].price);
        const quantity = pendingTransaction[i].quantity;
        const total = parseFloat(pendingTransaction[i].total);

        const index = getCompanyIndex(stocksData, company);
        const currentPrice = parseFloat(stocksData[index].ltp);

        if(targetPrice >= currentPrice && total <= walletBalance && type === "B") {
            buyTransactionSuccessful(i, company, targetPrice, quantity, total, addToCompleteTransaction, addToAssets, deletePendingTransaction, withdrawFromWallet);
        }
    }
}

function buyTransactionSuccessful(
    index, 
    company, 
    targetPrice, 
    quantity, 
    total, 
    addToCompleteTransaction,
    addToAssets,
    deletePendingTransaction,
    withdrawFromWallet) {

    addToCompleteTransaction({
        type: "B",
        company,
        price: targetPrice,
        quantity,
        total,
    })

    addToAssets(company, {
        company,
        price : targetPrice,
        quantity,
        total
    })

    deletePendingTransaction(index);

    withdrawFromWallet(total)
}
