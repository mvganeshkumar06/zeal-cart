import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import ProductContext from "../context/ProductContext";

const PrivateRoute = ({ path, children, ...rest }) => {
    const {
        state: { user },
    } = useContext(ProductContext);

    if (user) {
        return (
            <Route path={path} {...rest}>
                {children}
            </Route>
        );
    }

    return (
        <Redirect
            to={{ pathname: "/login", state: { pathAfterLogin: path } }}
        />
    );
};

export default PrivateRoute;
