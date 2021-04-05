import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation, NavigationDesktop } from "../components";
import { Home, Categories, Products, WishList, Cart } from "../pages";

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Navigation />
			<NavigationDesktop />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/categories">
					<Categories />
				</Route>
				<Route exact path="/products">
					<Products />
				</Route>
				<Route exact path="/wishlist">
					<WishList />
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
