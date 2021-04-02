import React from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductFilter.module.css";
import FilterListIcon from "@material-ui/icons/FilterList";

const ProductFilter = () => {
	return (
		<div className={`align-items-row center ${styles.filterContainer}`}>
			<FilterListIcon className={styles.filterIcon} /> Filter by
		</div>
	);
};

export default ProductFilter;
