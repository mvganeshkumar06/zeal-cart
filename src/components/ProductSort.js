import React from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductSort.module.css";
import SortIcon from "@material-ui/icons/Sort";

const ProductSort = () => {
	return (
		<div className={`align-items-row center ${styles.sortContainer}`}>
			<SortIcon className={styles.sortIcon} />
			<span>Sort by</span>
			{/* <div className={`navigation ${styles.sortModal}`}>
				<h1>Sort products by</h1>
			</div> */}
		</div>
	);
};

export default ProductSort;
