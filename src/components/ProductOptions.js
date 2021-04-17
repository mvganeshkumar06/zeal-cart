import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import {
    Container,
    Text,
    useStyleContext,
    useThemeContext,
    Button,
    Divider,
} from "@zeal-ui/core";
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
			margin: 0rem;
            padding:0.25rem;
		}
		
		@media (min-width: 1024px) {
			border-right: 1px solid ${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[3]
            };
            display: flex;
            position: fixed;
            top: 6.2rem;
            left: 0rem;
            bottom: 0rem;
            padding: 0rem 1rem;
            width: 15%;          
		}	
	`;

    const {
        state: {
            sortOption,
            filterOptions: { priceRange },
        },
        dispatch,
    } = useContext(ProductContext);

    return (
        <Container type="col" scrollAuto customStyles={styles}>
            <Container type="row" width="100%" rowBetween colCenter>
                <Text bold>SORT BY</Text>
                <Button
                    className="btnClear"
                    onClick={() =>
                        dispatch({
                            type: "RESET_SORT_AND_FILTER",
                        })
                    }
                >
                    Clear All
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
                        checked={sortOption === "LOW_TO_HIGH"}
                        onChange={() =>
                            dispatch({
                                type: "SET_PRICE_LOW_TO_HIGH",
                                payload: "LOW_TO_HIGH",
                            })
                        }
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
                        checked={sortOption === "HIGH_TO_LOW"}
                        onChange={() =>
                            dispatch({
                                type: "SET_PRICE_HIGH_TO_LOW",
                                payload: "HIGH_TO_LOW",
                            })
                        }
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
                        onChange={() =>
                            dispatch({
                                type: "SET_TRENDING_FIRST",
                                payload: "TRENDING_FIRST",
                            })
                        }
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
                        onChange={() =>
                            dispatch({
                                type: "SET_RATING",
                                payload: "RATING",
                            })
                        }
                    />
                </Container>
            </Container>
            <Container type="col" width="100%" className="input">
                <Text bold>FILTERS</Text>
                <Divider />
                <label htmlFor="input-range">Price Range</label>
                <input
                    id="input-range"
                    type="range"
                    name="price-range"
                    min="0"
                    max="1500"
                    value={priceRange}
                    onChange={(event) =>
                        dispatch({
                            type: "SET_PRICE_RANGE",
                            payload: parseInt(event.target.value),
                        })
                    }
                />
                <span>Upto {priceRange}</span>
            </Container>
        </Container>
    );
};

export default ProductOptions;
