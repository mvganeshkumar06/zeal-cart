import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/WishList.module.css";
import ProductContext from "../context/ProductContext";
import ProductItem from "./ProductItem";
import ProductsHeader from "./ProductsHeader";
import Navigation from "./Navigation";

const WishList = () => {
	const {
		state: { wishList },
	} = useContext(ProductContext);
	return (
		<div className={`align-items-col ${styles.productsContainer}`}>
			<ProductsHeader />
			<Navigation />
			<h1 className="main-heading">
				You have {wishList ? wishList.length : 0} items on your wishlist
			</h1>
			<div className={`grid grid-col-1 ${styles.products}`}>
				{wishList.map((product) => {
					return <ProductItem key={product.id} details={product} />;
				})}
			</div>
		</div>
	);
};

export default WishList;
