import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import "../css/DriftUI.css";
import styles from "../css/ProductOptions.module.css";

const ProductOptions = () => {
	const {
		state: {
			sortOption,
			filterOptions: { priceRange },
		},
		dispatch,
	} = useContext(ProductContext);

	const clearAllInput = () => {
		const radioGroup = document.querySelectorAll(
			`input[name = "radio-group"]`
		);
		radioGroup.forEach((radioBtn) => {
			radioBtn.checked = false;
		});
		dispatch({
			type: "SET_PRICE_RANGE",
			payload: 0,
		});
	};

	return (
		<div
			className={`align-items-col scroll-auto ${styles.productOptionsContainer}`}
		>
			<div className={`align-items-row ${styles.optionsHeader}`}>
				<h2 className="sub-heading-2">Sort by</h2>
				<button
					className={`btn btn-action ${styles.btnClear}`}
					onClick={() => {
						clearAllInput();
					}}
				>
					Clear All
				</button>
			</div>
			<span className="divider" />
			<div className={`align-items-col ${styles.input}`}>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="input-low-to-high">
						Price : Low to High
					</label>
					<input
						id="input-low-to-high"
						type="radio"
						name="radio-group"
						value={sortOption === "LOW_TO_HIGH"}
						onChange={() =>
							dispatch({
								type: "SORT_PRICE_LOW_TO_HIGH",
								payload: "LOW_TO_HIGH",
							})
						}
					/>
				</div>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="input-high-to-low">
						Price : High to Low
					</label>
					<input
						id="input-high-to-low"
						type="radio"
						name="radio-group"
						value={sortOption === "HIGH_TO_LOW"}
						onChange={() =>
							dispatch({
								type: "SORT_PRICE_HIGH_TO_LOW",
								payload: "HIGH_TO_LOW",
							})
						}
					/>
				</div>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="input-trending"> Trending First </label>
					<input
						id="input-trending"
						type="radio"
						name="radio-group"
						value={sortOption === "TRENDING_FIRST"}
						onChange={() =>
							dispatch({
								type: "SORT_TRENDING_FIRST",
								payload: "TRENDING_FIRST",
							})
						}
					/>
				</div>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="input-rating"> Rating </label>
					<input
						id="input-rating"
						type="radio"
						name="radio-group"
						value={sortOption === "RATING"}
						onChange={() =>
							dispatch({
								type: "SORT_RATING",
								payload: "RATING",
							})
						}
					/>
				</div>
			</div>
			<div className={`align-items-col ${styles.input}`}>
				<h2 className="sub-heading-2">Filters</h2>
				<span className="divider" />
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
	);
};

export default ProductOptions;
