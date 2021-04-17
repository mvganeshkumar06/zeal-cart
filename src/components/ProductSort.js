import React, { useState, useContext } from "react";
import { Container, Text, Modal, Button } from "@zeal-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import ProductContext from "../context/ProductContext";

const ProductSort = () => {
    const styles = `
		width: 50%;

		.sortBtn{
			margin:0rem;
			padding:0rem;
            border-radius:0;
		}

		.sortIcon {
			margin: 0.5rem;
		}
		
		.sortOptionOpen {
			display: flex;
		}
		
		.sortOptionClose {
			display: none;
		}
		
		.btnClear {
			padding:0.25rem;
			height: 2rem;
		}	

		.sortModalContent{
			padding:0rem 0.5rem;
		}
	`;

    const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

    const {
        state: { sortOption },
        dispatch,
    } = useContext(ProductContext);

    return (
        <Container type="row" rowCenter colCenter customStyles={styles}>
            <Button
                width="100%"
                className="sortBtn"
                onClick={() => setIsSortOptionOpen(!isSortOptionOpen)}
            >
                <SortIcon className="sortIcon" />
                Sort by
            </Button>
            <Modal
                type="center"
                width="15rem"
                height="20rem"
                isOpen={isSortOptionOpen}
            >
                <Container type="row" rowBetween colCenter>
                    <Text>Sort products by</Text>
                    <Button
                        onClick={() => setIsSortOptionOpen(!isSortOptionOpen)}
                    >
                        X
                    </Button>
                </Container>
                <Container type="col" className="sortModalContent">
                    <Container type="row" rowBetween colCenter width="80%">
                        <label htmlFor="input-low-to-high">
                            Price : Low to High
                        </label>
                        <input
                            id="input-low-to-high"
                            type="radio"
                            name="radio-group"
                            checked={sortOption === "LOW_TO_HIGH"}
                            onChange={() =>
                                dispatch({
                                    type: "SET_PRICE_LOW_TO_HIGH",
                                    payload: "LOW_TO_HIGH",
                                })
                            }
                        />
                    </Container>
                    <Container type="row" rowBetween colCenter width="80%">
                        <label htmlFor="input-high-to-low">
                            Price : High to Low
                        </label>
                        <input
                            id="input-high-to-low"
                            type="radio"
                            name="radio-group"
                            checked={sortOption === "HIGH_TO_LOW"}
                            onChange={() =>
                                dispatch({
                                    type: "SET_PRICE_HIGH_TO_LOW",
                                    payload: "HIGH_TO_LOW",
                                })
                            }
                        />
                    </Container>
                    <Container type="row" rowBetween colCenter width="80%">
                        <label htmlFor="input-trending"> Trending First </label>
                        <input
                            id="input-trending"
                            type="radio"
                            name="radio-group"
                            checked={sortOption === "TRENDING_FIRST"}
                            onChange={() =>
                                dispatch({
                                    type: "SET_TRENDING_FIRST",
                                    payload: "TRENDING_FIRST",
                                })
                            }
                        />
                    </Container>
                    <Container type="row" rowBetween colCenter width="80%">
                        <label htmlFor="input-rating"> Rating </label>
                        <input
                            id="input-rating"
                            type="radio"
                            name="radio-group"
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
                <Button
                    className="btnClear"
                    onClick={() => dispatch({ type: "RESET_SORT" })}
                >
                    Clear all
                </Button>
            </Modal>
        </Container>
    );
};

export default ProductSort;
