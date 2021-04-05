import React, { useState } from "react";
import "../css/DriftUI.css";
import styles from "../css/Navigation.module.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const navigationItems = ["Home", "Categories", "Products", "WishList", "Cart"];

const Navigation = () => {
	const [isNavigationOpen, setIsNavigationOpen] = useState(false);

	return (
		<div>
			<span className={styles.menuIcon}>
				<MenuIcon
					className={`scroll-auto ${styles.navigationOpenBtn}`}
					onClick={() => setIsNavigationOpen(!isNavigationOpen)}
					fontSize="large"
				/>
			</span>
			{isNavigationOpen && (
				<div className={`bg-overlay ${styles.container}`}>
					<HighlightOffIcon
						className={styles.navigationCloseBtn}
						fontSize="large"
						onClick={() => setIsNavigationOpen(!isNavigationOpen)}
					/>
					<ul className="list">
						{navigationItems.map((component) => {
							return (
								<li className="list-link" key={component}>
									<Link
										to={`${
											component === "Home"
												? "/"
												: `/${component.toLowerCase()}`
										}`}
										onClick={() => {
											setIsNavigationOpen(
												!isNavigationOpen
											);
										}}
									>
										{component}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Navigation;
