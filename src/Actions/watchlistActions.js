import { WatchlistActionTypes } from "../Types"

export const createWatchlist = (id, watchlistName) => {
    return {
        type: WatchlistActionTypes.CREATE_WATCHLIST,
        id,
        watchlistName,
    }
}

export const deleteWatchlist = id => {
    return {
        type: WatchlistActionTypes.DELETE_WATCHLIST,
        id,
    }
}

export const renameWatchlist = (id, watchlistName) => {
    return {
        type: WatchlistActionTypes.RENAME_WATCHLIST,
        id,
        watchlistName,
    }
}

export const addCompanyToWatchlist = (id, company) => {
    return {
        type: WatchlistActionTypes.ADD_COMPANY_TO_WATCHLIST,
        id,
        company,
    }
}

export const removeCompanyFromWatchlist = (id, company) => {
    return {
        type: WatchlistActionTypes.REMOVE_COMPANY_FROM_WATCHLIST,
        id,
        company,
    }
}