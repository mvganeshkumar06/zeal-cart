import React from "react";
import "../css/DriftUI.css";
import styles from "../css/NavigationDesktop.module.css";
import { Link } from "react-router-dom";

const navigationItems = ["Home", "Categories", "Products", "WishList", "Cart"];

const NavigationDesktop = () => {
    return (
        <div className={`align-items-row ${styles.navigationContainer}`}>
            {navigationItems.map((component) => {
                return (
                    <Link
                        to={`${
                            component === "Home"
                                ? "/"
                                : `/${component.toLowerCase()}`
                        }`}
                    >
                        {component}
                    </Link>
                );
            })}
        </div>
    );
};

export default NavigationDesktop;
