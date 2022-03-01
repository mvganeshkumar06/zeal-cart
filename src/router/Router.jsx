import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '@zeal-ui/core';
import { Header, Sidebar } from '../components';
import { Home, Products, WishList, Cart, Auth, Product, NotFound } from '../pages';
import PrivateRoute from './PrivateRoute';

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Sidebar />
			<Layout>
				<Switch>
					<Route path="/products/:productId">
						<Product />
					</Route>
					<Route path="/products">
						<Products />
					</Route>
					<PrivateRoute path="/wishlist">
						<WishList />
					</PrivateRoute>
					<PrivateRoute path="/cart">
						<Cart />
					</PrivateRoute>
					<Route path="/login">
						<Auth />
					</Route>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default Router;
