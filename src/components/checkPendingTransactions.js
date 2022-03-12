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

    for(let i=transactionID.length-1; i>=0; i--) {
        const id = transactionID[i];

        // Check for blocked transaction
        const isBlocked = funcArgs.blockedTransactions[id] === undefined ? false : true;
        if(isBlocked) continue;

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
                currentPrice,
            }); 
        }

        if(targetPrice <= currentPrice && type === "S") {
            sellTransactionSuccessful({
                id,
                company,
                targetPrice,
                quantity,
                total,
                addToTransactions: funcArgs.addToTransactions,
                substractFromAssets: funcArgs.substractFromAssets,
                deletePendingTransaction: funcArgs.deletePendingTransaction,
                addToWallet: funcArgs.addToWallet,
                substractFromPendingBlockedStocks: funcArgs.substractFromPendingBlockedStocks,
                currentPrice,
            });
        }
    }
}

function buyTransactionSuccessful(funcArgs) {

    const newID = v4();
    const company = funcArgs.company;

    funcArgs.addToTransactions(newID, {
        type: "B",
        status: "Successful",
        transactionType: "complete",
        company,
        price: funcArgs.targetPrice,
        quantity: funcArgs.quantity,
        total: funcArgs.total,
    })

    funcArgs.addToAssets(funcArgs.company, {
        company,
        price: funcArgs.targetPrice,
        quantity: funcArgs.quantity,
        total: funcArgs.total,
    }, funcArgs.currentPrice)

    funcArgs.deletePendingTransaction(funcArgs.id);

    funcArgs.withdrawFromWallet(funcArgs.total);

    funcArgs.substractFromPendingBlockedAmount(funcArgs.total);
}

function sellTransactionSuccessful(funcArgs) {

    const newID = v4();

    funcArgs.addToTransactions(newID, {
        type: "S",
        status: "Successful",
        transactionType: "complete",
        company: funcArgs.company,
        price: funcArgs.targetPrice,
        quantity: funcArgs.quantity,
        total: funcArgs.total,
    });

    funcArgs.substractFromAssets(funcArgs.company, {
        company: funcArgs.company,
        price: funcArgs.targetPrice,
        quantity: funcArgs.quantity,
        total: funcArgs.total,
    }, funcArgs.currentPrice);

    funcArgs.deletePendingTransaction(funcArgs.id);

    funcArgs.addToWallet(funcArgs.total);

    funcArgs.substractFromPendingBlockedStocks(funcArgs.company, funcArgs.quantity, newID);
}
