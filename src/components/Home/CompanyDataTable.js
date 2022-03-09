import React from "react";
import CompanyDataRow from "./CompanyDataRow";
import "./CompanyDataTable.css";
import { connect } from "react-redux";

function CompanyDataTable(props) {
	const stocksData = props.stocksData;

	return (
		<div className="company-data">
			<div className="heading">
				<p className="top-heading">Top by Market Cap</p>
				<p className="nifty">NIFTY50</p>
			</div>

			<div className="table">
				<div className="table-heading">
					<p className="company">Company</p>
					<p className="market-price">Market Price</p>
					<p className="watchlist">Watchlist</p>
				</div>

				<div className="table-content">

					{
						props.loading 
						? (
							<div className="loading-error">
								Loading...
							</div>
						)
						: props.error !== ""
							? (
								<div className="loading-error">
									{props.message}
								</div>
							)
							: (
								stocksData.map((obj, index) => {
									return <CompanyDataRow 
												key={obj.company} 
												index={index}
												company={obj.company} 
												ltp={obj.ltp} 
												ptsChange={obj.ptsChange} 
												percentageChange={obj.percentageChange}
											/>
								})
							)
					}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loading: state.stockData.loading,
		stocksData: state.stockData.stocksData,
		error: state.stockData.error,
	};
};

export default connect(mapStateToProps, null)(CompanyDataTable);
