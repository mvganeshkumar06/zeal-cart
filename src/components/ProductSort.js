import React, { useState, useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductSort.module.css";
import SortIcon from "@material-ui/icons/Sort";
import ProductContext from "../context/ProductContext";

const ProductSort = () => {
	const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

	const {
		state: { sortOption },
		dispatch,
	} = useContext(ProductContext);

	const clearAllInput = () => {
		const radioGroup = document.querySelectorAll(
			`input[name = "radio-group"]`
		);
		radioGroup.forEach((radioBtn) => {
			radioBtn.checked = false;
		});
	};

	return (
		<div className={`align-items-row center ${styles.sortContainer}`}>
			<SortIcon className={styles.sortIcon} />
			<span onClick={() => setIsSortOptionOpen(!isSortOptionOpen)}>
				Sort by
			</span>
			<div
				className={` modal-backdrop ${
					isSortOptionOpen
						? styles.sortOptionOpen
						: styles.sortOptionClose
				}`}
			>
				<div className={`modal modal-center ${styles.modal}`}>
					<div
						className={`align-items-row modal-header ${styles.modalHeadPosition}`}
					>
						<h1 className="sub-heading-2">Sort products by</h1>
						<button
							className="btn btn-action"
							onClick={() =>
								setIsSortOptionOpen(!isSortOptionOpen)
							}
						>
							X
						</button>
					</div>
					<div className={`align-items-col ${styles.input}`}>
						<div
							className={`align-items-row ${styles.inputContainer}`}
						>
							<label htmlFor="input-low-to-high">
								Price : Low to High
							</label>
							<input
								id="input-low-to-high"
								type="radio"
								name="radio-group"
								value={sortOption === "LOW_TO_HIGH"}
								onChange={() => {
									dispatch({
										type: "SORT_PRICE_LOW_TO_HIGH",
										payload: "LOW_TO_HIGH",
									});
									clearAllInput();
									setIsSortOptionOpen(!isSortOptionOpen);
								}}
							/>
						</div>
						<div
							className={`align-items-row ${styles.inputContainer}`}
						>
							<label htmlFor="input-high-to-low">
								Price : High to Low
							</label>
							<input
								id="input-high-to-low"
								type="radio"
								name="radio-group"
								value={sortOption === "HIGH_TO_LOW"}
								onChange={() => {
									dispatch({
										type: "SORT_PRICE_HIGH_TO_LOW",
										payload: "HIGH_TO_LOW",
									});
									clearAllInput();
									setIsSortOptionOpen(!isSortOptionOpen);
								}}
							/>
						</div>
						<div
							className={`align-items-row ${styles.inputContainer}`}
						>
							<label htmlFor="input-trending">
								{" "}
								Trending First{" "}
							</label>
							<input
								id="input-trending"
								type="radio"
								name="radio-group"
								value={sortOption === "TRENDING_FIRST"}
								onChange={() => {
									dispatch({
										type: "SORT_TRENDING_FIRST",
										payload: "TRENDING_FIRST",
									});
									clearAllInput();
									setIsSortOptionOpen(!isSortOptionOpen);
								}}
							/>
						</div>
						<div
							className={`align-items-row ${styles.inputContainer}`}
						>
							<label htmlFor="input-rating"> Rating </label>
							<input
								id="input-rating"
								type="radio"
								name="radio-group"
								value={sortOption === "RATING"}
								onChange={() => {
									dispatch({
										type: "SORT_RATING",
										payload: "RATING",
									});
									clearAllInput();
									setIsSortOptionOpen(!isSortOptionOpen);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSort;
