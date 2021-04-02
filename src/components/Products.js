import React, { useState, useEffect, useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Products.module.css";
import axios from "axios";
import ProductItem from "./ProductItem";
import Navigation from "./Navigation";
import ProductsHeader from "./ProductsHeader";
import ProductContext from "../context/ProductContext";
import ProductSort from "./ProductSort";
import ProductFilter from "./ProductFilter";
import ProductOptions from "./ProductOptions";

const Products = () => {
	const {
		state: { products },
		dispatch,
	} = useContext(ProductContext);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		try {
			setIsLoading(true);
			const fetchData = async () => {
				const response = await axios({
					method: "get",
					url: "/products",
				});
				dispatch({
					type: "SET_PRODUCTS",
					payload: response.data.products,
				});
			};
			fetchData();
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [dispatch]);

	return (
		<div className={`align-items-col ${styles.productsContainer}`}>
			<ProductsHeader />
			<Navigation />
			<div className={styles.optionsContainer}>
				<ProductSort />
				<ProductFilter />
			</div>
			<div>
				{isLoading && (
					<h2 className="alert alert-info">Loading products...</h2>
				)}
				{isError && (
					<h2 className="alert alert-danger">
						Something went wrong !
					</h2>
				)}
			</div>
			<ProductOptions />
			<div className={`grid grid-col-1 ${styles.products}`}>
				{products.map((product) => {
					return <ProductItem key={product.id} details={product} />;
				})}
			</div>
		</div>
	);
};

export default Products;
