import React, { useState, useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductFilter.module.css";
import FilterListIcon from "@material-ui/icons/FilterList";
import ProductContext from "../context/ProductContext";

const ProductFilter = () => {
	const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);

	const {
		state: {
			filterOptions: { priceRange },
		},
		dispatch,
	} = useContext(ProductContext);

	return (
		<div className={`align-items-row center ${styles.filterContainer}`}>
			<FilterListIcon className={styles.filterIcon} />
			<span onClick={() => setIsFilterOptionOpen(!isFilterOptionOpen)}>
				Filter by
			</span>
			<div
				className={` modal-backdrop ${
					isFilterOptionOpen
						? styles.filterOptionOpen
						: styles.filterOptionClose
				}`}
			>
				<div className={`modal modal-center ${styles.modal}`}>
					<div className={`modal-header ${styles.modalHeadPosition}`}>
						<h1 className="sub-heading-2">Filter products by</h1>
						<button
							className="btn btn-action"
							onClick={() => {
								setIsFilterOptionOpen(!isFilterOptionOpen);
							}}
						>
							X
						</button>
					</div>
					<div className={`modal-content`}>
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
					</div>
					<div className="modal-footer">
						<button
							className={`btn btn-action ${styles.btnClear}`}
							onClick={() => dispatch({ type: "RESET_FILTER" })}
						>
							Clear all
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
