import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Cart.module.css";
import ProductContext from "../context/ProductContext";
import ProductItem from "./ProductItem";
import ProductsHeader from "./ProductsHeader";
import Navigation from "./Navigation";

const WishList = () => {
	const {
		state: { cart },
	} = useContext(ProductContext);
	return (
		<div className={`align-items-col ${styles.productsContainer}`}>
			<ProductsHeader />
			<Navigation />
			<h1 className="main-heading">
				You have {cart ? cart.length : 0} items on your cart
			</h1>
			<div className={`grid grid-col-1 ${styles.products}`}>
				{cart.map((product) => {
					return <ProductItem key={product.id} details={product} />;
				})}
			</div>
		</div>
	);
};

export default WishList;
