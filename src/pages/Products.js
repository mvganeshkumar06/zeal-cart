import React, { useState, useEffect, useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Products.module.css";
import {
    ProductItem,
    ProductFilter,
    ProductOptions,
    ProductSort,
} from "../components";
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
        state: { products, sortOption, filterOptions },
        dispatch,
    } = useContext(ProductContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
            setIsLoading(true);
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
            fetchData();
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    const sortProducts = (sortOption) => {
        switch (sortOption) {
            case "LOW_TO_HIGH":
                return sortInIncreasingOrder(products);
            case "HIGH_TO_LOW":
                return sortInDecreasingOrder(products);
            case "TRENDING_FIRST":
                return sortByTrending(products);
            case "RATING":
                return sortByRating(products);
            default:
                return products;
        }
    };

    const filterProducts = (sortedProducts, filterOptions) => {
        let filteredProducts = [];
        if (filterOptions.priceRange > 0) {
            filteredProducts = filterByRange(
                sortedProducts,
                filterOptions.priceRange
            );
        }
        return filteredProducts;
    };

    const sortedProducts = sortProducts(sortOption);
    const filteredProducts = filterProducts(sortedProducts, filterOptions);

    return (
        <div className={`align-items-col ${styles.productsContainer}`}>
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
            <div className={`grid grid-col-1 ${styles.productsItem}`}>
                {filteredProducts.map((product) => {
                    return <ProductItem key={product.id} details={product} />;
                })}
            </div>
            {filteredProducts.length === 0 && (
                <p
                    className={`alert alert-danger sub-heading-2 ${styles.alertContainer}`}
                >
                    Sorry no products avaialble based on current filters
                </p>
            )}
        </div>
    );
};

export default Products;
