import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addCompanyToWatchlist, removeCompanyFromWatchlist } from '../../Actions/watchlistActions';
import "./CheckBoxRow.css"

function CheckBoxRow(props) {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const compantPresent = isCompanyPresent();
        setIsChecked(compantPresent);
    }, [])

    function isCompanyPresent() {
        const watchlistID = props.watchlistID;
        const company = props.company;

        const companies = props.watchlists[watchlistID].companies;
        let isPresent = false;
        for(let i=0; i<companies.length; i++) {
            if(companies[i] === company) {
                isPresent = true;
                break;
            }
        }
        return isPresent;
    }

    function handleCheckboxChange(event) {
        if(event.target.value === "true") {
            props.removeCompanyFromWatchlist(props.watchlistID, props.company);
        }
        else if(event.target.value === "false") {
            props.addCompanyToWatchlist(props.watchlistID, props.company);
        }

        setIsChecked(event.target.value === "true" ? false : true);

        /*
        // Not working
        setIsChecked((prev) => {
            if(prev) {
                props.removeCompanyFromWatchlist(props.watchlistID, props.company);
            }
            else {
                props.addCompanyToWatchlist(props.watchlistID, props.company);
            }
            return !prev
        })
        */
    }

    return (
        <div className='check-box-row'>
            <div className='check-box-watchlist-name'>{props.watchlists[props.watchlistID].watchlistName}</div>
            <input 
                className='check-box-input'
                type="checkbox"
                id={props.watchlistID}
                value={isChecked}
                defaultChecked={isCompanyPresent()}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watchlists: state.watchlist.watchlists,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCompanyToWatchlist: (watchlistID, company) => dispatch(addCompanyToWatchlist(watchlistID, company)),
        removeCompanyFromWatchlist: (watchlistID, company) => dispatch(removeCompanyFromWatchlist(watchlistID, company)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxRow)