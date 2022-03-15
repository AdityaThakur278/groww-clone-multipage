import React from 'react'
import "./RemoveFromWatchlist.css"
import { removeCompanyFromWatchlist, } from "../../Actions/watchlistActions"
import { connect } from 'react-redux'

function RemoveFromWatchlist(props) {
    return (
        <p className="remove">
            <img 
                className="delete-button"
                src={process.env.PUBLIC_URL + "/images/delete.png"}
                width="30px"
                alt="delete"
                onClick={() => props.removeCompanyFromWatchlist(props.watchlistID, props.company)}
            />
        </p>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeCompanyFromWatchlist: (watchlistID, company) => dispatch(removeCompanyFromWatchlist(watchlistID, company)),
    }
}

export default connect(null, mapDispatchToProps)(RemoveFromWatchlist)