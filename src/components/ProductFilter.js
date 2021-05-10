import React, { useState, useEffect } from "react";
import { Container, Text, Button, Modal } from "@zeal-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import useProductContext from "../hooks/useProductContext";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";

const ProductFilter = () => {
    const styles = `
		width: 50%;
		
		.filterBtn{
			margin:0rem;
			padding:0rem;
			border-radius:0;
		}

		.filterIcon {
			margin: 0.5rem;
		}
		
		.btnClear {
			padding: 0.25rem;
			height: 2rem;
		}

		.filterModalContent{
			padding:0rem 0.5rem;
		}
	`;

    const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);

    const {
        state: {
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
                if (key !== "sort") {
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
        <Container type="row" rowCenter colCenter customStyles={styles}>
            <Button
                width="100%"
                className="filterBtn"
                onClick={() => setIsFilterOptionOpen(!isFilterOptionOpen)}
            >
                <FilterListIcon className="filterIcon" />
                Filter by
            </Button>
            <Modal
                type="center"
                width="15rem"
                height="auto"
                isOpen={isFilterOptionOpen}
            >
                <Container type="row" rowBetween colCenter>
                    <Text>Filter products by</Text>
                    <HighlightOffIcon
                        onClick={() =>
                            setIsFilterOptionOpen(!isFilterOptionOpen)
                        }
                    />
                </Container>
                <Container type="col" className="filterModalContent">
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
                    <Text>Upto {priceRange}</Text>
                </Container>
                <Button
                    className="btnClear"
                    onClick={() => {
                        dispatch({ type: "RESET_FILTER" });
                        const parsedQueryKeys = Object.keys(parsedQuery);
                        for (let key of parsedQueryKeys) {
                            if (key !== "sort") {
                                parsedQuery[key] = undefined;
                            }
                        }
                        history.replace(
                            `/products?${queryString.stringify(parsedQuery)}`
                        );
                    }}
                >
                    Clear
                </Button>
            </Modal>
        </Container>
    );
};

export default ProductFilter;
