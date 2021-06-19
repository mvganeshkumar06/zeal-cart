import React, { useState, useEffect } from "react";
import { Container, Text, Button, Modal } from "@zeal-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import useProductContext from "../hooks/useProductContext";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import categories from "../utils/Categories";

const ProductFilter = () => {
    const styles = `
		width: 50%;
		
        .filterTitle{
            margin-left:0.5rem;
            margin-bottom:0rem;
        }

		.filterBtn{
			margin:0rem;
			padding:0rem;
			border-radius:0;
		}

		.filterIcon {
			margin: 0.5rem;
		}

		.filterModalContent{
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
            margin:0.5rem 0rem 1rem 0.5rem;
		}

        .categoriesTitle{
            margin:1rem 0rem 0.5rem 0rem;
        }
	`;

    const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);

    const {
        state: {
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
                if (key !== "SORT") {
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
                Filter
            </Button>
            <Modal
                center
                width="15rem"
                height="fit-content"
                isOpen={isFilterOptionOpen}
            >
                <Container type="row" rowBetween colCenter width="100%">
                    <Text color="orange" bold className="filterTitle">
                        Filter products
                    </Text>
                    <HighlightOffIcon
                        onClick={() =>
                            setIsFilterOptionOpen(!isFilterOptionOpen)
                        }
                    />
                </Container>
                <Container type="col" className="filterModalContent">
                    <Container type="col" width="80%" className="inputItem">
                        <Container
                            type="col"
                            colCenter
                            width="100%"
                            className="inputContainer"
                        >
                            <label htmlFor="input-range">
                                <Text color="orange" bold>
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
                                    parsedQuery.PRICE_RANGE =
                                        event.target.value;
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
                                    name="category-radio-group"
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
                <Button
                    className="btnClear"
                    onClick={() => {
                        dispatch({ type: "RESET_FILTER" });
                        const parsedQueryKeys = Object.keys(parsedQuery);
                        for (let key of parsedQueryKeys) {
                            if (key !== "SORT") {
                                parsedQuery[key] = undefined;
                            }
                        }
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

export default ProductFilter;
