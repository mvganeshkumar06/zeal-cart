import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import WishList from "../components/WishList";
import Cart from "../components/Cart";

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/products">
					<Products />
				</Route>
				<Route path="/wishlist">
					<WishList />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
