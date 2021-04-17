import React, { useState, useContext } from "react";
import { Container, Text, Button, Modal } from "@zeal-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ProductContext from "../context/ProductContext";

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
		
		.filterOptionOpen {
			display: flex;
		}
		
		.filterOptionClose {
			display: none;
		}
		
		.modalHeadPosition {
			justify-content: space-between;
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
    } = useContext(ProductContext);

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
                height="20rem"
                isOpen={isFilterOptionOpen}
            >
                <Container type="row" rowBetween colCenter>
                    <Text>Filter products by</Text>
                    <Button
                        onClick={() =>
                            setIsFilterOptionOpen(!isFilterOptionOpen)
                        }
                    >
                        X
                    </Button>
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
                        onChange={(event) =>
                            dispatch({
                                type: "SET_PRICE_RANGE",
                                payload: parseInt(event.target.value),
                            })
                        }
                    />
                    <Text>Upto {priceRange}</Text>
                </Container>
                <Button
                    className="btnClear"
                    onClick={() => dispatch({ type: "RESET_FILTER" })}
                >
                    Clear all
                </Button>
            </Modal>
        </Container>
    );
};

export default ProductFilter;
