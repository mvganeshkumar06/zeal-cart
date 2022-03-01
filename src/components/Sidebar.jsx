import React, { useState } from 'react';
import useProductContext from '../hooks/use-product-context';
import { SidebarStyled } from '../styles';
import { Container, List, ListItem, Text, Divider } from '@zeal-ui/core';
import sidebarContents from '../utils/sidebar-contents';
import ShopIcon from '@material-ui/icons/Shop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const {
		state: { user },
		dispatch,
	} = useProductContext();

	const logoutUser = () => {
		localStorage.removeItem('user-access-token');
		dispatch({ type: 'SET_ACCESS_TOKEN', payload: '' });
		dispatch({ type: 'SET_USER', payload: undefined });
	};

	return (
		<SidebarStyled type="col">
			<MenuIcon
				className="sidebarOpenIcon"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			{isSidebarOpen && (
				<Container type="col" width="12rem" className="sidebarContainer">
					<Container type="row" rowEven colCenter>
						<a href="https://zeal-cart.netlify.app/" className="zealCartLink">
							<ShopIcon className="zealCartIcon" />
						</a>
						<Text className="title">Zeal Cart</Text>
						<HighlightOffIcon
							className="sidebarCloseIcon"
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						/>
					</Container>
					<Divider />
					<List type="link" className="sidebarList">
						{sidebarContents.map(({ id, name, url, icon }) => {
							return (
								<ListItem key={id} className="sidebarListItem">
									<Link
										to={url}
										onClick={() => setIsSidebarOpen(!isSidebarOpen)}
										className="sidebarLink"
									>
										{icon}
										<Text className="sidebarIconText">{name}</Text>
									</Link>
								</ListItem>
							);
						})}
						<ListItem key={3} className="sidebarListItem">
							{user ? (
								<Container
									type="row"
									colCenter
									className="sidebarAuth"
									onClick={logoutUser}
								>
									<PersonIcon />
									<Text className="sidebarIconText">Logout</Text>
								</Container>
							) : (
								<Link
									to="/login"
									onClick={() => setIsSidebarOpen(!isSidebarOpen)}
									className="sidebarLink"
								>
									<PersonIcon />
									<Text className="sidebarIconText">Login</Text>
								</Link>
							)}
						</ListItem>
					</List>
				</Container>
			)}
		</SidebarStyled>
	);
};

export default Sidebar;
