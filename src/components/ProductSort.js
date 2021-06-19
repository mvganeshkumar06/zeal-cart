import React, { useState, useEffect } from "react";
import { Container, Text, Modal, Button } from "@zeal-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import useProductContext from "../hooks/useProductContext";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";

const ProductSort = () => {
    const styles = `
		width: 50%;

        .sortTitle{
            margin-left:0.5rem;
            margin-bottom:0rem;
        }

		.sortBtn{
			margin:0rem;
			padding:0rem;
            border-radius:0;
		}

		.sortIcon {
			margin: 0.5rem;
		}
		
        .sortModalContent{
			padding:0rem 0.5rem;
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
	`;

    const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

    const {
        state: { sortOption },
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
        <Container type="row" rowCenter colCenter customStyles={styles}>
            <Button
                width="100%"
                className="sortBtn"
                onClick={() => setIsSortOptionOpen(!isSortOptionOpen)}
            >
                <SortIcon className="sortIcon" />
                Sort
            </Button>
            <Modal
                center
                width="15rem"
                height="fit-content"
                isOpen={isSortOptionOpen}
            >
                <Container type="row" rowBetween colCenter width="100%">
                    <Text bold color="orange" className="sortTitle">
                        Sort products
                    </Text>
                    <HighlightOffIcon
                        onClick={() => setIsSortOptionOpen(!isSortOptionOpen)}
                    />
                </Container>
                <Container type="col" className="sortModalContent">
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
                                name="sort-radio-group"
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
                            <label htmlFor="input-low-to-high">
                                Price Low to High
                            </label>
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
                                name="sort-radio-group"
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
                            <label htmlFor="input-high-to-low">
                                Price High to Low
                            </label>
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
                                name="sort-radio-group"
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
                            <label htmlFor="input-trending">
                                {" "}
                                Trending First{" "}
                            </label>
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
                                name="sort-radio-group"
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
                </Container>
                <Button
                    className="btnClear"
                    onClick={() => {
                        dispatch({ type: "RESET_SORT" });
                        parsedQuery.SORT = undefined;
                        history.replace(
                            `/products?${queryString.stringify(parsedQuery)}`
                        );
                    }}
                    color="blue"
                >
                    Clear
                </Button>
            </Modal>
        </Container>
    );
};

export default ProductSort;
