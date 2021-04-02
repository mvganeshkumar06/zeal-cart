import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/ProductsHeader.module.css";
import ZealCartIcon from "../assets/zeal-cart.svg";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import ThemeContext from "../context/ThemeContext";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const ProductsHeader = () => {
	const {
		state: { wishList, cart },
	} = useContext(ProductContext);

	const { switchTheme } = useContext(ThemeContext);

	return (
		<div className={`align-items-row ${styles.container}`}>
			<div className="align-items-row center">
				<a href="https://zeal-stream.netlify.app/">
					<img
						src={ZealCartIcon}
						alt="Drift UI"
						className={styles.zealCartIcon}
					/>
				</a>
				<span className={`text-bold ${styles.title}`}>Zeal Cart</span>
			</div>
			<div className={`align-items-row center ${styles.icons}`}>
				<span>
					<Brightness4Icon
						className={styles.themeIcon}
						onClick={() => switchTheme()}
					/>
				</span>
				<Link to="/wishlist">
					<div>
						<FavoriteBorder className={`${styles.wishIcon}`} />
						<span
							className={`badge-icon ${styles.wishCountBadge} ${
								wishList.length > 0 &&
								styles.wishCountBadgeActive
							}`}
						>
							{wishList.length > 0 && wishList.length}
						</span>
					</div>
				</Link>
				<Link to="/cart">
					<div>
						<ShoppingCartIcon className={`${styles.cartIcon}`} />
						<span
							className={`badge-icon ${styles.cartCountBadge} ${
								cart.length > 0 && styles.cartCountBadgeActive
							}`}
						>
							{cart.length > 0 && cart.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ProductsHeader;
