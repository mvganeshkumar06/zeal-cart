import React from "react";
import ThemeProvider from "../context/ThemeProvider";
import ProductProvider from "../context/ProductProvider";
import Router from "../router/Router";

const App = () => {
	return (
		<ThemeProvider>
			<ProductProvider>
				<Router />
			</ProductProvider>
		</ThemeProvider>
	);
};

export default App;
