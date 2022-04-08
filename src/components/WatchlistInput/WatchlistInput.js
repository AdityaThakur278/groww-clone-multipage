import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createWatchlist } from "../../Actions/watchlistActions"
import { v4 } from 'uuid';
import "./WatchlistInput.css"

function WatchlistInput(props) {

    const [watchlistInputButton, setWatchlistInputButton] = useState(true);
    const [watchlistName, setWatchlistName] = useState("");

    function handleAddButtonClick() {
        if(watchlistName === "") {
            alert("Watchlist name can't be empty!")
            return;
        }
        if(watchlistName.length > 30) {
            alert("Watchlist name length should be less than 31")
            return;
        }

        const newID = v4();
        props.createWatchlist(newID, watchlistName);

        alert("Watchlist created!")
        setWatchlistInputButton(true)
        setWatchlistName("")
    }

    return (
        <>
        {
            watchlistInputButton 
            ?   <div className="create-watchlist-container create-watchlist-name" onClick={() => setWatchlistInputButton(false)}>CREATE WATCHLIST</div>
            :   <div className="create-watchlist-container create-watchlist-input">
                    <input className="watchlist-input" type="text" value={watchlistName} onChange={e => setWatchlistName(e.target.value)}></input>
                    <button className="watchlist-add-button" onClick={handleAddButtonClick}>Add</button>
                    <button className="watchlist-cancel-button" onClick={() => setWatchlistInputButton(true)}>Cancel</button>
                </div>
        }
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createWatchlist: (id, watchlistName) => dispatch(createWatchlist(id, watchlistName)),
    }
}

export default connect(null, mapDispatchToProps)(WatchlistInput)