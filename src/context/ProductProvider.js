import React, { useReducer, useEffect } from "react";
import ProductContext from "./ProductContext";
import reducer from "../reducer/Reducer";
import axios from "axios";

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        products: [],
        categories: [],
        user: "",
        wishList: [],
        cart: [],
        sortOption: "",
        filterOptions: {
            priceRange: 1500,
        },
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
            type: "SET_USER",
            payload: user,
        });

        const fetchProducts = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "https://zeal-cart.herokuapp.com/products",
                    timeout: 5000,
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

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchUserWishList = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-cart.herokuapp.com/wishlists/${state.user.id}`,
                    timeout: 5000,
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
                    method: "get",
                    url: `https://zeal-cart.herokuapp.com/carts/${state.user.id}`,
                    timeout: 5000,
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
        if (state.user) {
            fetchUserWishList();
            fetchUserCart();
        } else {
            dispatch({
                type: "SET_WISHLIST",
                payload: [],
            });
            dispatch({
                type: "SET_CART",
                payload: [],
            });
        }
    }, [state.user]);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
