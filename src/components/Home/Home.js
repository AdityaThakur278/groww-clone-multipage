import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStockData } from "../../Redux/stockData/stockDataAction";

function Home(props) {

    useEffect(() => {
        setTimeout(() => props.fetchStockData(), 3000)
    }, [])

    return (
        <>
            {
                props.loading 
                ? <h1>loading</h1>
                : props.error !== "" 
                    ? <h1>{props.error}</h1>
                    : <h1>Got Data</h1>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.stockData.loading,
        data: state.stockData.data,
        error: state.stockData.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStockData: () => dispatch(fetchStockData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
