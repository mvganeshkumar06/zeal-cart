import React, { useReducer, useEffect } from 'react';
import ProductContext from './product-context';
import reducer from '../reducer/reducer';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		products: [],
		product: {},
		productToast: {
			isOpen: false,
			text: '',
		},
		categories: [],
		user: undefined,
		accessToken: '',
		wishList: [],
		cart: [],
		sortOption: '',
		filterOptions: {
			priceRange: 1500,
			category: '',
		},
		isLoading: {
			products: true,
			product: true,
			categories: true,
			authentication: false,
			wishList: true,
			cart: true,
		},
		isError: {
			products: false,
			product: false,
			categories: false,
			authentication: undefined,
			wishList: false,
			cart: false,
		},
	});

	useEffect(() => {
		const accessToken = localStorage.getItem('user-access-token');

		if (accessToken) {
			dispatch({
				type: 'SET_ACCESS_TOKEN',
				payload: accessToken,
			});

			const user = jwtDecode(accessToken);

			dispatch({
				type: 'SET_USER',
				payload: user,
			});
		}

		const fetchProducts = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: 'https://zeal-cart.herokuapp.com/products',
				});
				dispatch({
					type: 'SET_PRODUCTS',
					payload: response.data,
				});
			} catch (err) {
				console.log(err.response?.data.errorMessage);
				dispatch({ type: 'SET_IS_ERROR', payload: { products: true } });
			} finally {
				dispatch({
					type: 'SET_IS_LOADING',
					payload: { products: false },
				});
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		const fetchUserWishList = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `https://zeal-cart.herokuapp.com/wishlists/${state.user.id}`,
					headers: {
						Authorization: state.accessToken,
					},
				});
				dispatch({
					type: 'SET_WISHLIST',
					payload: response.data,
				});
			} catch (err) {
				console.log(err.response?.data.errorMessage);
				dispatch({ type: 'SET_IS_ERROR', payload: { wishList: true } });
			} finally {
				dispatch({
					type: 'SET_IS_LOADING',
					payload: { wishList: false },
				});
			}
		};
		const fetchUserCart = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `https://zeal-cart.herokuapp.com/carts/${state.user.id}`,
					headers: {
						Authorization: state.accessToken,
					},
				});
				dispatch({
					type: 'SET_CART',
					payload: response.data,
				});
			} catch (err) {
				console.log(err.response?.data.errorMessage);
				dispatch({ type: 'SET_IS_ERROR', payload: { cart: true } });
			} finally {
				dispatch({ type: 'SET_IS_LOADING', payload: { cart: false } });
			}
		};
		if (state.user) {
			fetchUserWishList();
			fetchUserCart();
		} else {
			dispatch({
				type: 'SET_WISHLIST',
				payload: [],
			});
			dispatch({
				type: 'SET_CART',
				payload: [],
			});
		}
	}, [state.accessToken, state.user]);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>
	);
};

export default ProductProvider;
