import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductItem.module.css";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ProductContext from "../context/ProductContext";

const ProductItem = ({ details }) => {
	const {
		id,
		name,
		image,
		description,
		price,
		rating,
		isTrending,
		discount,
	} = details;

	const {
		state: { wishList, cart },
		dispatch,
	} = useContext(ProductContext);

	const isProductWishListed = (id) => {
		return wishList.find((item) => item.id === id);
	};

	const isProductAddedToCart = (id) => {
		return cart.find((item) => item.id === id);
	};

	const productWishListed = isProductWishListed(id);
	const productAddedToCart = isProductAddedToCart(id);

	return (
		<div className={`card align-items-col ${styles.productItem}`} key={id}>
			<img className="img img-row" src={image} alt="product" />
			<div className={`${styles.productDetails}`}>
				<p className={styles.name}>{name}</p>
				<p className={styles.description}>{description}</p>
				<p className={styles.price}>
					{price} | {discount}{" "}
				</p>
				<div className={`align-items-row ${styles.badgeContainer}`}>
					<span className={`badge badge-success ${styles.rating}`}>
						{rating} <StarSharpIcon className={styles.ratingIcon} />
					</span>
					{isTrending && (
						<span className={`badge badge-new ${styles.trending}`}>
							Trending
						</span>
					)}

					{productWishListed ? (
						<Favorite
							className={`${styles.wishIconActive}`}
							onClick={() =>
								dispatch({
									type: "REMOVE_FROM_WISHLIST",
									payload: id,
								})
							}
						/>
					) : (
						<FavoriteBorderIcon
							className={`${styles.wishIcon}`}
							onClick={() =>
								dispatch({
									type: "ADD_TO_WISHLIST",
									payload: details,
								})
							}
						/>
					)}
					{productAddedToCart ? (
						<ShoppingCartIcon
							className={styles.addIcon}
							onClick={() =>
								dispatch({
									type: "REMOVE_FROM_CART",
									payload: id,
								})
							}
						/>
					) : (
						<AddShoppingCartIcon
							className={styles.addIcon}
							onClick={() =>
								dispatch({
									type: "ADD_TO_CART",
									payload: details,
								})
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
