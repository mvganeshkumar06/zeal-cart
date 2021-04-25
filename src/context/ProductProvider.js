import React, { useReducer, useEffect } from "react";
import ProductContext from "./ProductContext";
import reducer from "../reducer/Reducer";
import axios from "axios";

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        products: [],
        wishList: [],
        cart: [],
        sortOption: "",
        filterOptions: {
            priceRange: 1500,
        },
        user: "",
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
            type: "SET_USER",
            payload: user,
        });

        const source = axios.CancelToken.source();
        const fetchProducts = async () => {
            try {
                const response = await axios({
                    method: "Get",
                    url: "https://zeal-cart.herokuapp.com/products",
                    timeout: 5000,
                    cancelToken: source.token,
                });
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: response.data,
                });
            } catch (err) {
                dispatch({ type: "SET_IS_ERROR", payload: true });
            } finally {
                dispatch({ type: "SET_IS_LOADING", payload: false });
            }
        };
        const fetchUserWishList = async () => {
            try {
                const response = await axios({
                    method: "Get",
                    url: `http://zeal-cart.herokuapp.com/wishlists/${user.id}`,
                    timeout: 5000,
                    cancelToken: source.token,
                });
                dispatch({
                    type: "SET_WISHLIST",
                    payload: response.data,
                });
            } catch (err) {
                dispatch({ type: "SET_IS_ERROR", payload: true });
            } finally {
                dispatch({ type: "SET_IS_LOADING", payload: false });
            }
        };
        const fetchUserCart = async () => {
            try {
                const response = await axios({
                    method: "Get",
                    url: `http://zeal-cart.herokuapp.com/carts/${user.id}`,
                    timeout: 5000,
                    cancelToken: source.token,
                });
                dispatch({
                    type: "SET_CART",
                    payload: response.data,
                });
            } catch (err) {
                dispatch({ type: "SET_IS_ERROR", payload: true });
            } finally {
                dispatch({ type: "SET_IS_LOADING", payload: false });
            }
        };
        fetchProducts();
        if (user) {
            fetchUserWishList();
            fetchUserCart();
        }
        return () => source.cancel("Component unmounted");
    }, []);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
