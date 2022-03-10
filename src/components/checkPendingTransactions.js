import { v4 } from "uuid";

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}

// Call from NavBar.js
export const checkPendingTransactions = (funcArgs) => {

    const transactions = funcArgs.transactions;
    const transactionID = funcArgs.transactionID;

    console.log(transactions)
    console.log(transactionID)

    for(let i=transactionID.length-1; i>=0; i--) {
        const id = transactionID[i];
        const transactionType = transactions[id].transactionType;
        if(transactionType !== "pending") continue;

        const type = transactions[id].type;
        const company = transactions[id].company;
        const targetPrice = parseFloat(transactions[id].price);
        const quantity = transactions[id].quantity;
        const total = parseFloat(transactions[id].total);

        const index = getCompanyIndex(funcArgs.stocksData, company);
        const currentPrice = parseFloat(funcArgs.stocksData[index].ltp);

        if(targetPrice >= currentPrice && type === "B") {
            buyTransactionSuccessful({
                i,
                id,
                company,
                targetPrice,
                quantity,
                total,
                addToTransactions: funcArgs.addToTransactions,
                addToAssets: funcArgs.addToAssets,
                deletePendingTransaction: funcArgs.deletePendingTransaction,
                withdrawFromWallet: funcArgs.withdrawFromWallet,
                substractFromPendingBlockedAmount: funcArgs.substractFromPendingBlockedAmount,
            }); 
        }
    }
}

function buyTransactionSuccessful(funcArgs) {

    const newID = v4();

    funcArgs.addToTransactions(newID, {
        type: "B",
        transactionType: "complete",
        company: funcArgs.company,
        price: funcArgs.targetPrice,
        quantity: funcArgs.quantity,
        total: funcArgs.total,
    })

    funcArgs.addToAssets(funcArgs.company, {
        company: funcArgs.company,
        price: funcArgs.targetPrice,
        quantity: funcArgs.quantity,
        total: funcArgs.total,
    })

    funcArgs.deletePendingTransaction(funcArgs.id);

    funcArgs.withdrawFromWallet(funcArgs.total);

    funcArgs.substractFromPendingBlockedAmount(funcArgs.total);
}
