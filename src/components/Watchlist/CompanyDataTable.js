import React from 'react'
import { connect } from 'react-redux';
import CompanyDataRow from './CompanyDataRow';
import "./CompanyDataTable.css"

function CompanyDataTable(props) {
    
	return (
		<div className="company-data">
			<div className="heading">
				<p className="top-heading">Watchlist</p>
			</div>

			<div className="table">
				<div className="table-heading">
					<p className="company">Company</p>
					<p className="market-price">Market Price</p>
					<p className="buy">Buy</p>
					<p className="sell">Sell</p>
					<p className="remove">Remove</p>
				</div>

				<div className="table-content">
					{
						props.defaultWatchlist.length === 0
                        ? (
                            <div className='no-data'>
                                No Companies in Watchlist
                            </div>
                        )
                        : (
                            props.defaultWatchlist.map(company => <CompanyDataRow key={company} company={company}/>)
                        )
					}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		defaultWatchlist: state.watchlist.defaultWatchlist,
	};
};

export default connect(mapStateToProps, null)(CompanyDataTable)