import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import AppNavigator from "./AppNavigator";

function App() {
  return (
	<Provider store={store}>
		<AppNavigator/>
	</Provider>
  );
}

export default App;