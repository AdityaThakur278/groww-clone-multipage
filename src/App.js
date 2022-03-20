import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import AppNavigator from "./AppNavigator";
import { AuthProvider } from "./utils/auth";

function App() {
  return (
	<Provider store={store}>
		<AuthProvider>
			<AppNavigator/>
		</AuthProvider>
	</Provider>
  );
}

export default App;