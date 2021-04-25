import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation, NavigationDesktop } from "../components";
import { Home, Categories, Products, WishList, Cart, Login } from "../pages";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Navigation />
            <NavigationDesktop />
            <Switch>
                <Route path="/categories">
                    <Categories />
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
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
