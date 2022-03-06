import React from 'react'
import { connect } from 'react-redux'

function Watchlist(props) {
	return (
		<>
			{
				props.watchlistCompany.map(name => <h3 key={name}>{name}</h3>)
			}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		watchlistCompany: state.watchlist.watchlistCompany
	}
} 

export default connect(mapStateToProps, null)(Watchlist) 