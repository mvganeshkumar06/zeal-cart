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

	const clearAllInput = () => {
		dispatch({
			type: "SET_PRICE_RANGE",
			payload: 0,
		});
	};

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
					<div
						className={`align-items-row modal-header ${styles.modalHeadPosition}`}
					>
						<h1 className="sub-heading-2">Filter products by</h1>
						<button
							className="btn btn-action"
							onClick={() =>
								setIsFilterOptionOpen(!isFilterOptionOpen)
							}
						>
							X
						</button>
					</div>
					<div className={`align-items-col ${styles.input}`}>
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
						<span>0 to {priceRange}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
