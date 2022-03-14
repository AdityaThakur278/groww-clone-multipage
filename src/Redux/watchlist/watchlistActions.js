export const createWatchlist = (id, watchlistName) => {
    return {
        type: "CREATE_WATCHLIST",
        id,
        watchlistName,
    }
}

export const deleteWatchlist = id => {
    return {
        type: "DELETE_WATCHLIST",
        id,
    }
}

export const renameWatchlist = (id, watchlistName) => {
    return {
        type: "RENAME_WATCHLIST",
        id,
        watchlistName,
    }
}

export const addCompanyToWatchlist = (id, company) => {
    return {
        type: "ADD_COMPANY_TO_WATCHLIST",
        id,
        company,
    }
}

export const removeCompanyFromWatchlist = (id, company) => {
    return {
        type: "REMOVE_COMPANY_FROM_WATCHLIST",
        id,
        company,
    }
}