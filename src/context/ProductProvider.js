import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import reducer from "../reducer/Reducer";

const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		products: [],
		wishList: [],
		cart: [],
		sortOption: "",
		filterOptions: {
			priceRange: 1500,
		},
	});

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;
