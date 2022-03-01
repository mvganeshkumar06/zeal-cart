import React from 'react';
import { Container, Text, ColorModeSwitch } from '@zeal-ui/core';
import { HeaderStyled } from '../styles';
import { Link } from 'react-router-dom';
import useProductContext from '../hooks/use-product-context';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

const Header = () => {
	const {
		state: { user, wishList, cart },
		dispatch,
	} = useProductContext();

	const logoutUser = () => {
		localStorage.removeItem('user-access-token');
		dispatch({ type: 'SET_ACCESS_TOKEN', payload: '' });
		dispatch({ type: 'SET_USER', payload: undefined });
	};

	return (
		<HeaderStyled type="row" width="100%" height="4.5rem" rowBetween colCenter>
			<Container type="row" rowCenter colCenter>
				<a href="https://zeal-cart.netlify.app/" className="zealCartLink">
					<ShopIcon className="zealCartIcon" />
				</a>
				<Text className="title">Zeal Cart</Text>
			</Container>
			<Container type="row" rowCenter colCenter className="linksContainer">
				<Link to="/" className="linkItem homeLinkItem">
					<Container type="col" rowCenter colCenter>
						<HomeIcon className="linkIcon" />
						<Text className="linkText">Home</Text>
					</Container>
				</Link>
				<Link to="/products" className="linkItem productsLinkItem">
					<Container type="col" rowCenter colCenter>
						<LocalMallIcon className="linkIcon" />
						<Text className="linkText">Products</Text>
					</Container>
				</Link>
				<Link to="/wishlist" className="linkItem wishLinkItem">
					<Container type="col" rowCenter colCenter className="wishIconContainer">
						<FavoriteBorder className="linkIcon" />
						<Text className="linkText">Wishlist</Text>
						{wishList.length > 0 && (
							<Container
								type="row"
								width="1rem"
								height="1rem"
								rowCenter
								colCenter
								className="wishCount"
							>
								{wishList.length < 10 ? wishList.length : '9+'}
							</Container>
						)}
					</Container>
				</Link>
				<Link to="/cart" className="linkItem cartLinkItem">
					<Container type="col" rowCenter colCenter className="cartIconContainer">
						<ShoppingCartIcon className="linkIcon" />
						<Text className="linkText">Cart</Text>
						{cart.length > 0 && (
							<Container
								type="row"
								width="1rem"
								height="1rem"
								rowCenter
								colCenter
								className="cartCount"
							>
								{cart.length < 10 ? cart.length : '9+'}
							</Container>
						)}
					</Container>
				</Link>
				{user ? (
					<Container
						type="col"
						rowCenter
						colCenter
						className="linkItem authLinkItem"
						onClick={logoutUser}
					>
						<PersonIcon className="linkIcon" />
						<Text className="linkText">Logout</Text>
					</Container>
				) : (
					<Link
						to={{
							pathname: '/login',
							state: { pathAfterLogin: '/' },
						}}
						className="linkItem authLinkItem"
					>
						<Container type="col" rowCenter colCenter>
							<PersonIcon className="linkIcon" />
							<Text className="linkText">Login</Text>
						</Container>
					</Link>
				)}
				<ColorModeSwitch className="linkItem themeLinkItem" />
			</Container>
		</HeaderStyled>
	);
};

export default Header;
