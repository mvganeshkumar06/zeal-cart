import React, { useState } from 'react';
import { Container, Input, Button } from '@zeal-ui/core';
import { ProductActionStyled } from '../styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useProductContext from '../hooks/use-product-context';

const ProductAction = ({ _id, showQuantity }) => {
	const {
		state: { wishList, cart, user, accessToken },
		dispatch,
	} = useProductContext();

	const checkProductAddedToWishList = (id) => {
		return wishList.find((item) => item._id === id);
	};

	const checkProductAddedToCart = (id) => {
		return cart.find((item) => item.product._id === id);
	};

	const isProductAddedToWishList = checkProductAddedToWishList(_id);
	const isProductAddedToCart = checkProductAddedToCart(_id);

	const getProductQuantity = (id) => {
		const product = cart.find((item) => item.product._id === id);
		return product ? product.quantity : 1;
	};

	const [productQuantity, setProductQuantity] = useState(getProductQuantity(_id));

	const productsMatch = useRouteMatch('/products');
	const productMatch = useRouteMatch('/products/:productId');
	const wishlistMatch = useRouteMatch('/wishlist');
	const cartMatch = useRouteMatch('/cart');

	const getPathAfterLogin = () => {
		if (productMatch) {
			return productMatch.url;
		}
		if (productsMatch) {
			return productsMatch.url;
		}
		if (wishlistMatch) {
			return wishlistMatch.url;
		}
		if (cartMatch) {
			return cartMatch.url;
		}
		return '/';
	};

	const history = useHistory();

	const updateWishList = (productToastText) => {
		if (user) {
			const updateWishListOnDb = async () => {
				try {
					const response = await axios({
						method: 'post',
						url: `https://zeal-cart.herokuapp.com/wishlists/${user.id}`,
						data: {
							productId: _id,
						},
						headers: {
							Authorization: accessToken,
						},
					});
					dispatch({
						type: 'SET_WISHLIST',
						payload: response.data,
					});
					dispatch({
						type: 'SET_PRODUCT_TOAST',
						payload: { isOpen: true, text: productToastText },
					});
				} catch (err) {
					console.log(err.response?.data.errorMessage);
				}
			};
			updateWishListOnDb();
		} else {
			history.push({
				pathname: '/login',
				state: { pathAfterLogin: getPathAfterLogin() },
			});
		}
	};

	const updateCart = (productToastText) => {
		if (user) {
			const updateCartOnDb = async () => {
				try {
					const response = await axios({
						method: 'post',
						url: showQuantity
							? `https://zeal-cart.herokuapp.com/carts/${user.id}/updateQuantity`
							: `https://zeal-cart.herokuapp.com/carts/${user.id}`,
						data: {
							productId: _id,
							quantity: productQuantity,
						},
						headers: {
							Authorization: accessToken,
						},
					});
					dispatch({
						type: 'SET_CART',
						payload: response.data,
					});
					dispatch({
						type: 'SET_PRODUCT_TOAST',
						payload: { isOpen: true, text: productToastText },
					});
				} catch (err) {
					console.log(err.response?.data.errorMessage);
				}
			};
			updateCartOnDb();
		} else {
			history.push({
				pathname: '/login',
				state: { pathAfterLogin: getPathAfterLogin() },
			});
		}
	};

	return (
		<ProductActionStyled type="col" width="100%" rowCenter>
			<Container type="row" width="100%" rowCenter colCenter className="actionContainer">
				{isProductAddedToWishList ? (
					<Favorite className="actionIcon actionIconActive" />
				) : (
					<FavoriteBorderIcon className="actionIcon" />
				)}
				<Button
					width="10rem"
					className="actionBtn"
					onClick={() =>
						updateWishList(
							isProductAddedToWishList
								? 'Removed from your Wishlist'
								: 'Added to your Wishlist',
						)
					}
				>
					{isProductAddedToWishList ? 'Remove from wishlist' : 'Add to wishlist'}
				</Button>
			</Container>
			<Container type="row" width="100%" rowCenter colCenter className="actionContainer">
				{showQuantity ? (
					<Input
						width="2.75rem"
						height="2rem"
						type="number"
						value={productQuantity}
						onChange={(event) => setProductQuantity(event.target.value)}
						className="quantityInput"
						min={0}
					/>
				) : isProductAddedToCart ? (
					<ShoppingCartIcon className="actionIcon actionIconActive" />
				) : (
					<AddShoppingCartIcon className="actionIcon" />
				)}
				<Button
					width="10rem"
					className="actionBtn"
					onClick={() =>
						updateCart(
							showQuantity
								? 'Updated your cart'
								: isProductAddedToCart
								? 'Removed from your Cart'
								: 'Added to your Cart',
						)
					}
				>
					{showQuantity
						? 'Update cart'
						: isProductAddedToCart
						? 'Remove from cart'
						: 'Add to cart'}
				</Button>
			</Container>
		</ProductActionStyled>
	);
};

export default ProductAction;
