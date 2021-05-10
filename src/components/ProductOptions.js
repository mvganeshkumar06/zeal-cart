import React, { useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
import {
    Container,
    Text,
    useStyleContext,
    useThemeContext,
    Button,
    Divider,
} from "@zeal-ui/core";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
const ProductOptions = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
		display: none;
		
		.title {
			font-size: 1rem;
			text-align: center;
		}
		
		.input {
			margin-bottom: 2rem;
		}
		
		.inputContainer {
			margin-bottom: 0.25rem;
		}
		
		.btnClear {
            padding:0.25rem 0.5rem;
		}
		
		@media (min-width: 1024px) {
			border-right: 1px solid ${
                theme === "light" ? style.colors.gray[2] : style.colors.gray[3]
            };
            display: flex;
            position: fixed;
            top: 6.2rem;
            left: 0rem;
            bottom: 0rem;
            padding: 0rem 1rem;
            width: 18%;          
		}
        
        @media(min-width:1440px){
            width:15%;
        }
	`;

    const {
        state: {
            sortOption,
            filterOptions: { priceRange },
        },
        dispatch,
    } = useProductContext();

    const location = useLocation();
    const history = useHistory();
    const parsedQuery = queryString.parse(location.search);

    useEffect(() => {
        const parsedQueryKeys = Object.keys(parsedQuery);
        if (parsedQueryKeys.length > 0) {
            for (let key of parsedQueryKeys) {
                if (key === "sort") {
                    dispatch({
                        type: `SET_${parsedQuery[key]}`,
                        payload: parsedQuery[key],
                    });
                } else {
                    dispatch({
                        type: `SET_${key}`,
                        payload: parsedQuery[key],
                    });
                }
            }
        } else {
            dispatch({
                type: "RESET_SORT_AND_FILTER",
            });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Container type="col" scrollAuto customStyles={styles}>
            <Container type="row" width="100%" rowBetween colCenter>
                <Text bold color="orange">
                    SORT
                </Text>
                <Button
                    className="btnClear"
                    onClick={() => {
                        dispatch({
                            type: "RESET_SORT_AND_FILTER",
                        });
                        history.replace("/products");
                    }}
                >
                    Clear
                </Button>
            </Container>
            <Divider />
            <Container type="col" width="80%" className="input">
                <Container
                    type="row"
                    width="100%"
                    rowBetween
                    colCenter
                    className="inputContainer"
                >
                    <label htmlFor="input-low-to-high">Price Low to High</label>
                    <input
                        id="input-low-to-high"
                        type="radio"
                        name="sort"
                        checked={sortOption === "PRICE_LOW_TO_HIGH"}
                        onChange={() => {
                            dispatch({
                                type: "SET_PRICE_LOW_TO_HIGH",
                                payload: "PRICE_LOW_TO_HIGH",
                            });
                            parsedQuery.sort = "PRICE_LOW_TO_HIGH";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                </Container>
                <Container
                    type="row"
                    width="100%"
                    rowBetween
                    colCenter
                    className="inputContainer"
                >
                    <label htmlFor="input-high-to-low">Price High to Low</label>
                    <input
                        id="input-high-to-low"
                        type="radio"
                        name="sort"
                        checked={sortOption === "PRICE_HIGH_TO_LOW"}
                        onChange={() => {
                            dispatch({
                                type: "SET_PRICE_HIGH_TO_LOW",
                                payload: "PRICE_HIGH_TO_LOW",
                            });
                            parsedQuery.sort = "PRICE_HIGH_TO_LOW";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                </Container>
                <Container
                    type="row"
                    width="100%"
                    rowBetween
                    colCenter
                    className="inputContainer"
                >
                    <label htmlFor="input-trending"> Trending First </label>
                    <input
                        id="input-trending"
                        type="radio"
                        name="sort"
                        checked={sortOption === "TRENDING_FIRST"}
                        onChange={() => {
                            dispatch({
                                type: "SET_TRENDING_FIRST",
                                payload: "TRENDING_FIRST",
                            });
                            parsedQuery.sort = "TRENDING_FIRST";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                </Container>
                <Container
                    type="row"
                    width="100%"
                    rowBetween
                    colCenter
                    className="inputContainer"
                >
                    <label htmlFor="input-rating"> Rating </label>
                    <input
                        id="input-rating"
                        type="radio"
                        name="sort"
                        checked={sortOption === "RATING"}
                        onChange={() => {
                            dispatch({
                                type: "SET_RATING",
                                payload: "RATING",
                            });
                            parsedQuery.sort = "RATING";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                </Container>
            </Container>
            <Divider />
            <Container type="col" width="80%" className="input">
                <Text bold color="orange">
                    FILTERS
                </Text>
                <Container type="col" width="100%" className="input">
                    <label htmlFor="input-range">Price Range</label>
                    <input
                        id="input-range"
                        type="range"
                        name="price-range"
                        min="0"
                        max="1500"
                        value={priceRange}
                        onChange={(event) => {
                            dispatch({
                                type: "SET_PRICE_RANGE",
                                payload: parseInt(event.target.value),
                            });
                            parsedQuery.PRICE_RANGE = event.target.value;
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                    <span>Upto {priceRange}</span>
                </Container>
            </Container>
        </Container>
    );
};

export default ProductOptions;
