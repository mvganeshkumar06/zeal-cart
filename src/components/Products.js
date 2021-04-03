import React, { useState, useEffect, useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Products.module.css";
import ProductItem from "./ProductItem";
import Navigation from "./Navigation";
import ProductsHeader from "./ProductsHeader";
import ProductSort from "./ProductSort";
import ProductFilter from "./ProductFilter";
import ProductOptions from "./ProductOptions";
import axios from "axios";
import ProductContext from "../context/ProductContext";
import {
	sortInIncreasingOrder,
	sortInDecreasingOrder,
	sortByTrending,
	sortByRating,
} from "../utils/Sort";
import filterByRange from "../utils/Filter";

const Products = () => {
	const {
		state: {
			products,
			sortOption,
			filterOptions: { priceRange },
		},
		dispatch,
	} = useContext(ProductContext);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const fetchData = async () => {
		const response = await axios({
			method: "Get",
			url: "/products",
		});
		dispatch({
			type: "SET_PRODUCTS",
			payload: response.data.products,
		});
	};

	useEffect(() => {
		try {
			setIsLoading(true);
			fetchData();
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const [modifiedProducts, setModifiedProducts] = useState([]);

	useEffect(() => {
		setModifiedProducts(filterByRange(products, priceRange));

		switch (sortOption) {
			case "LOW_TO_HIGH":
				setModifiedProducts(sortInIncreasingOrder(products));
				break;
			case "HIGH_TO_LOW":
				setModifiedProducts(sortInDecreasingOrder(products));
				break;
			case "TRENDING_FIRST":
				setModifiedProducts(sortByTrending(products));
				break;
			case "RATING":
				setModifiedProducts(sortByRating(products));
				break;
			default:
				break;
		}
	}, [sortOption, priceRange]);

	const productsModified = () => {
		return sortOption !== "" || priceRange > 0;
	};

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
				{productsModified()
					? modifiedProducts.map((product) => {
							return (
								<ProductItem
									key={product.id}
									details={product}
								/>
							);
					  })
					: products.map((product) => {
							return (
								<ProductItem
									key={product.id}
									details={product}
								/>
							);
					  })}
			</div>
		</div>
	);
};

export default Products;
