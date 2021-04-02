import React, { useState } from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductOptions.module.css";

const ProductOptions = () => {
	const [input, setInput] = useState({
		lowToHigh: false,
		highToLow: false,
		trending: false,
		range: 0,
	});

	return (
		<div
			className={`align-items-col scroll-auto ${styles.productOptionsContainer}`}
		>
			<h2 className="sub-heading-2">Sort by</h2>
			<span className="divider" />
			<div className={`align-items-col ${styles.input}`}>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="Input_low_to_high">
						Price : Low to High
					</label>
					<input
						id="Input_low_to_high"
						type="checkbox"
						value={input.lowToHigh}
						onChange={() =>
							setInput({
								...input,
								lowToHigh: !input.lowToHigh,
							})
						}
					/>
				</div>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="Input_high_to_low">
						Price : High to Low
					</label>
					<input
						id="Input_high_to_low"
						type="checkbox"
						value={input.highToLow}
						onChange={() =>
							setInput({
								...input,
								highToLow: !input.highToLow,
							})
						}
					/>
				</div>
				<div className={`align-items-row ${styles.inputContainer}`}>
					<label htmlFor="Input_trending"> Discount</label>
					<input
						id="Input_trending"
						type="checkbox"
						value={input.trending}
						onChange={() =>
							setInput({
								...input,
								trending: !input.trending,
							})
						}
					/>
				</div>
			</div>
			<div className={`align-items-col ${styles.input}`}>
				<h2 className="sub-heading-2">Filters</h2>
				<span className="divider" />
				<label htmlFor="Input_range" min="0" max="100000">
					Price Range
				</label>
				<input
					id="Input_range"
					type="range"
					value={input.range}
					onChange={(event) =>
						setInput({
							...input,
							range: Number.parseInt(event.target.value),
						})
					}
				/>
			</div>
		</div>
	);
};

export default ProductOptions;
