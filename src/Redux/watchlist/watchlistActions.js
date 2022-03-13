export const addToWatchlist = (payload) => {
    return {
        type: "ADD_TO_WATCHLIST",
        payload,
    }
}

export const removeFromWatchlist = (payload) => {
    return {
        type: "REMOVE_FROM_WATCHLIST",
        payload,
    }
}

// New

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