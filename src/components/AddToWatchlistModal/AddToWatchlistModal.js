import React, { useState } from 'react'
import { connect } from 'react-redux'
import "./AddToWatchlistModal.css"
import CheckBoxRow from './CheckBoxRow'
import { v4 } from 'uuid'
import { createWatchlist } from '../../Actions/watchlistActions'

function AddToWatchlistModal(props) {

    const [watchlistInputButton, setWatchlistInputButton] = useState(true);
    const [watchlistName, setWatchlistName] = useState("");

    function handleAddToWatchlist() {
        if(watchlistName === "") {
            alert("Watchlist name can't be empty!")
            return;
        }
        if(watchlistName.length > 30) {
            alert("Watchlist name length should be less than 31")
            return;
        }

        const newId = v4();
        props.createWatchlist(newId, watchlistName);
        setWatchlistInputButton(true);
        setWatchlistName("");
    }

    return (
        <div className="add-to-watchlist-modal">
            <div className="add-to-watchlist-container">
                <div className="titleCloseBtn">
                    <p>Add {props.company} to...</p>
                    <button className='cross-button' onClick={() => props.setAddToWatchlistModal(false)}>X</button>
                </div>
                {
                    props.watchlistID.length === 0
                    ? <div className="no-watchlist">No Watchlist Present</div>
                    : props.watchlistID.map(id => {
                        return  <CheckBoxRow key={id} watchlistID={id} company={props.company}/>
                    })
                }
                <div className="create-watchlist-wrapper">
                    {
                        watchlistInputButton  
                        ?   <button className="create-watchlist-button" onClick={() => setWatchlistInputButton(false)}>Create Watchlist</button>
                        :   <div>
                                <input className="new-watchlist-input" value={watchlistName} onChange={e => setWatchlistName(e.target.value)}></input>
                                <div>
                                    <button className="add-button-watchlist" onClick={handleAddToWatchlist}>Add</button>
                                    <button className="cancel-button-watchlist" onClick={() => setWatchlistInputButton(true)}>Cancel</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watchlistID: state.watchlist.watchlistID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createWatchlist: (id, watchlistName) => dispatch(createWatchlist(id, watchlistName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToWatchlistModal)