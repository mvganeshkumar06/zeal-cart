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
import categories from "../utils/Categories";

const ProductOptions = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
		display: none;
		
		.title {
			font-size: 1rem;
			text-align: center;
		}
		
		.inputItem {
			margin: 1rem 0rem;
		}
		
		.inputContainer {
			margin: 0.25rem 0rem;
		}
		
        .inputContainer input{
            margin-right:0.5rem;
        }

		.btnClear {
            padding:0rem 0.25rem;
		}

        .divider{
            margin-bottom:0.25rem;
        }

        .categoriesTitle{
            margin:1rem 0rem 0.5rem 0rem;
        }
		
		@media (min-width: 1024px) {
            display: flex;
            background-color:${theme === "light" ? style.colors.gray[0] : style.colors.gray[2]};
            border-radius: ${style.common.borderRadius};
            position: fixed;
            top: 8rem;
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
            filterOptions: { priceRange, category },
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
                if (key === "SORT") {
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
                    color="blue"
                >
                    Clear
                </Button>
            </Container>
            <Divider className="divider" />
            <Container type="col" width="80%" className="inputItem">
                <Container
                    type="row"
                    width="100%"
                    colCenter
                    className="inputContainer"
                >
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
                            parsedQuery.SORT = "PRICE_LOW_TO_HIGH";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                    <label htmlFor="input-low-to-high">Price Low to High</label>
                </Container>
                <Container
                    type="row"
                    width="100%"
                    colCenter
                    className="inputContainer"
                >
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
                            parsedQuery.SORT = "PRICE_HIGH_TO_LOW";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                    <label htmlFor="input-high-to-low">Price High to Low</label>
                </Container>
                <Container
                    type="row"
                    width="100%"
                    colCenter
                    className="inputContainer"
                >
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
                            parsedQuery.SORT = "TRENDING_FIRST";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                    <label htmlFor="input-trending"> Trending First </label>
                </Container>
                <Container
                    type="row"
                    width="100%"
                    colCenter
                    className="inputContainer"
                >
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
                            parsedQuery.SORT = "RATING";
                            history.replace(
                                `/products?${queryString.stringify(
                                    parsedQuery
                                )}`
                            );
                        }}
                    />
                    <label htmlFor="input-rating"> Rating </label>
                </Container>
            </Container>
            <Text bold color="orange">
                FILTERS
            </Text>
            <Divider className="divider" />
            <Container type="col" width="80%" className="inputItem">
                <Container
                    type="col"
                    colCenter
                    width="100%"
                    className="inputContainer"
                >
                    <label htmlFor="input-range">
                        <Text bold color="orange">
                            Price Range ({priceRange})
                        </Text>
                    </label>
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
                </Container>
                <Text color="orange" bold className="categoriesTitle">
                    Categories
                </Text>
                {categories.map(({ id, name, query }) => (
                    <Container
                        type="row"
                        colCenter
                        width="100%"
                        className="inputContainer"
                        key={id}
                    >
                        <input
                            id="input-category"
                            type="radio"
                            name="category"
                            checked={category === query}
                            onChange={() => {
                                dispatch({
                                    type: "SET_CATEGORY",
                                    payload: query,
                                });
                                parsedQuery.CATEGORY = query;
                                history.replace(
                                    `/products?${queryString.stringify(
                                        parsedQuery
                                    )}`
                                );
                            }}
                        />
                        <label htmlFor="input-category">{name}</label>
                    </Container>
                ))}
            </Container>
        </Container>
    );
};

export default ProductOptions;
