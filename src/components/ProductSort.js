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
					<div className={`modal-header ${styles.modalHeadPosition}`}>
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
					<div className={`modal-content`}>
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
								checked={sortOption === "LOW_TO_HIGH"}
								onChange={() =>
									dispatch({
										type: "SET_PRICE_LOW_TO_HIGH",
										payload: "LOW_TO_HIGH",
									})
								}
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
								checked={sortOption === "HIGH_TO_LOW"}
								onChange={() =>
									dispatch({
										type: "SET_PRICE_HIGH_TO_LOW",
										payload: "HIGH_TO_LOW",
									})
								}
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
								checked={sortOption === "TRENDING_FIRST"}
								onChange={() =>
									dispatch({
										type: "SET_TRENDING_FIRST",
										payload: "TRENDING_FIRST",
									})
								}
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
								checked={sortOption === "RATING"}
								onChange={() =>
									dispatch({
										type: "SET_RATING",
										payload: "RATING",
									})
								}
							/>
						</div>
					</div>
					<div className={`modal-footer`}>
						<button
							className={`btn btn-action ${styles.btnClear}`}
							onClick={() => dispatch({ type: "RESET_SORT" })}
						>
							Clear all
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSort;
