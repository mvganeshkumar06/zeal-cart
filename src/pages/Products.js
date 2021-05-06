import React, { useContext } from "react";
import {
    Container,
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

        .feedbackContainer{
            margin-top:2rem;
        }

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
        
        .productsContainer{
            align-items:center;
        }

        .alertContainer {
            max-width: 100%;
            margin-top: 6rem;
        }

        .productsItem{
            margin:0.5rem 0rem;
            padding:0.5rem 0rem;
        }

        @media(min-width:425px){
            .productsItem {
                grid-template-columns: repeat(2, 1fr);
                grid-gap:1rem 0.5rem;
            }
        }

        @media (min-width: 768px) {
            .productsItem {
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap:1rem;
            }
        }
        
        @media (min-width: 1024px) {
            .productsContainer{
                align-items:flex-end;
            }
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
                grid-template-columns: repeat(5, 1fr);
            }
        }
    `;

    const {
        state: { products, sortOption, filterOptions, isLoading, isError },
    } = useContext(ProductContext);

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
            <Container type="col" width="100%" className="productsContainer">
                <Container
                    type="row"
                    rowCenter
                    width="100%"
                    className="feedbackContainer"
                >
                    {isLoading.products && <Spinner />}
                    {isError.products && (
                        <Alert type="danger">
                            Error while getting products
                        </Alert>
                    )}
                    {filteredProducts.length === 0 && products.length !== 0 && (
                        <Alert type="danger" className="alertContainer">
                            Sorry no products avaialble based on current filters
                        </Alert>
                    )}
                </Container>
                {!isLoading.products && !isError.products && (
                    <Grid col={1} className="productsItem">
                        {filteredProducts.map((product) => {
                            return (
                                <ProductItem
                                    details={product}
                                    key={product._id}
                                />
                            );
                        })}
                    </Grid>
                )}
            </Container>
        </Container>
    );
};

export default Products;
