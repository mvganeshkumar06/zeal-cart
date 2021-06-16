import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation } from "../components";
import { Home, Products, WishList, Cart, Login, Product, NotFound } from "../pages";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Navigation />
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
                    <Login />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
