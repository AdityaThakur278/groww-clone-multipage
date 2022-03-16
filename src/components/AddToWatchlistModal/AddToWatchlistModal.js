import React from 'react'
import { connect } from 'react-redux'
import "./AddToWatchlistModal.css"
import CheckBoxRow from './CheckBoxRow'

function AddToWatchlistModal(props) {
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watchlistID: state.watchlist.watchlistID,
    }
}

export default connect(mapStateToProps, null)(AddToWatchlistModal)