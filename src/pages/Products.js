import React, { useState, useEffect, useContext } from "react";
import {
    Container,
    Text,
    Alert,
    Grid,
    useStyleContext,
    useThemeContext,
    Spinner,
} from "@zeal-ui/core";
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
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        margin: 5rem 0rem;

        .optionsContainer {
            width: 100%;
            height: 3rem;
            display: flex;
            justify-content: space-evenly;
            background-color: ${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[4]
            };
            z-index: ${style.zIndex[2]};
            border-top: 5px solid ${
                theme === "light" ? "white" : style.colors.gray[4]
            };
            position: fixed;
            bottom: 0;
        }
        
        .alertContainer {
            max-width: 100%;
            margin-top: 6rem;
        }
        
        @media (min-width: 425px) {
            .productsItem {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (min-width: 768px) {
            .productsItem {
                margin:0rem;
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        @media (min-width: 1024px) {
            .productsItem {
                width: 80%;
                grid-template-columns: repeat(4, 1fr);
            }        
        
            .optionsContainer {
                display: none;
            }
        }

        @media(min-width:1440px){
            .productsItem{
                width: 60%;
                margin-right:12rem;
            }
        }
    `;

    const {
        state: { products, sortOption, filterOptions },
        dispatch,
    } = useContext(ProductContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
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
        }
    }, [dispatch]);

    useEffect(() => {
        if (products.length !== 0) {
            setIsLoading(false);
        }
    }, [products]);

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
        <Container type="col" customStyles={styles}>
            <Container type="row" className="optionsContainer">
                <ProductSort />
                <ProductFilter />
            </Container>
            <ProductOptions />
            <Container type="col" rowEnd width="100%">
                <Container type="row" rowCenter width="100%">
                    {isLoading && <Spinner />}
                    {isError && (
                        <Alert type="danger">
                            <Text>Something went wrong !</Text>
                        </Alert>
                    )}
                    {filteredProducts.length === 0 && !isLoading && (
                        <Alert type="danger" className="alertContainer">
                            <Text>
                                Sorry no products avaialble based on current
                                filters
                            </Text>
                        </Alert>
                    )}
                </Container>
                <Grid col={1} className="productsItem">
                    {filteredProducts.map((product) => {
                        return (
                            <ProductItem key={product.id} details={product} />
                        );
                    })}
                </Grid>
            </Container>
        </Container>
    );
};

export default Products;
