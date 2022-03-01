import React, { useEffect } from 'react';
import { Container, Alert, Spinner, Button, Text, Input, Toast, useNotify } from '@zeal-ui/core';
import { LoginStyled } from '../styles';
import axios from 'axios';
import useProductContext from '../hooks/use-product-context';
import { useLocation, useHistory } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import jwtDecode from 'jwt-decode';

const Login = ({ userCredentials, setUserCredentials, loginAsGuest }) => {
	const { name, password, showPassword } = userCredentials;

	const {
		state: { user, isLoading, isError },
		dispatch,
	} = useProductContext();

	const { isOpen, onOpen, onClose } = useNotify();

	const location = useLocation();
	const pathAfterLogin = location.state?.pathAfterLogin || '/';
	const history = useHistory();

	const authenticateUser = () => {
		const authenticate = async () => {
			try {
				const response = await axios({
					method: 'post',
					url: 'https://zeal-cart.herokuapp.com/users/login',
					data: {
						userName: name,
						password: password,
					},
				});
				setUserCredentials({
					...userCredentials,
					name: '',
					password: '',
					showPassword: false,
				});
				const accessToken = response.data.accessToken;
				dispatch({
					type: 'SET_ACCESS_TOKEN',
					payload: accessToken,
				});
				localStorage.setItem('user-access-token', accessToken);
				const decodedUser = jwtDecode(accessToken);
				dispatch({
					type: 'SET_USER',
					payload: decodedUser,
				});
				onOpen();
			} catch (error) {
				console.log(error.response?.data.errorMessage);
				dispatch({
					type: 'SET_IS_ERROR',
					payload: {
						authentication: error.response
							? error.response.data.errorMessage
							: 'Something went wrong',
					},
				});
				setTimeout(() => {
					dispatch({
						type: 'SET_IS_ERROR',
						payload: { authentication: undefined },
					});
				}, 5000);
			} finally {
				dispatch({
					type: 'SET_IS_LOADING',
					payload: { authentication: false },
				});
			}
		};
		if (name.length === 0 || password.length === 0) {
			dispatch({
				type: 'SET_IS_ERROR',
				payload: { authentication: 'Please fill all the fields' },
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_IS_ERROR',
					payload: { authentication: undefined },
				});
			}, 5000);
		} else {
			dispatch({
				type: 'SET_IS_LOADING',
				payload: { authentication: true },
			});
			authenticate();
		}
	};

	useEffect(() => {
		let timerId;
		if (isOpen && user) {
			timerId = setTimeout(() => {
				history.push(pathAfterLogin);
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isOpen, user, history, pathAfterLogin]);

	useEffect(() => {
		if (loginAsGuest) {
			setUserCredentials({
				...userCredentials,
				name: process.env.REACT_APP_GUEST_NAME,
				password: process.env.REACT_APP_GUEST_PASSWORD,
			});
		}
		// eslint-disable-next-line
	}, [loginAsGuest]);

	useEffect(() => {
		if (loginAsGuest && name.length > 0 && password.length > 0) {
			authenticateUser();
		}
		// eslint-disable-next-line
	}, [loginAsGuest, name, password]);

	return (
		<LoginStyled type="col" width="100%" rowCenter>
			{isLoading.authentication && <Spinner />}
			{isError.authentication && <Alert type="error">{isError.authentication}</Alert>}
			<Toast
				width="auto"
				height="auto"
				isOpen={isOpen}
				onClose={onClose}
				color="success"
				bottom="1rem"
				left="auto"
				right="auto"
				className="feedbackToast"
			>
				<Text>Successfully logged in</Text>
			</Toast>
			<Input
				type="text"
				placeholder="Enter your username"
				value={name}
				onChange={(event) =>
					setUserCredentials({ ...userCredentials, name: event.target.value })
				}
				className="input"
			/>
			<Input
				type={showPassword ? 'text' : 'password'}
				placeholder="Enter your password"
				value={password}
				onChange={(event) =>
					setUserCredentials({ ...userCredentials, password: event.target.value })
				}
				className="input"
			/>
			<Container
				type="row"
				colCenter
				className="passwordIndicator"
				onClick={() => {
					if (showPassword) {
						setUserCredentials({ ...userCredentials, showPassword: false });
					} else {
						setUserCredentials({ ...userCredentials, showPassword: true });
					}
				}}
			>
				{showPassword ? (
					<>
						<VisibilityIcon className="showHideIcon" />
						<Text>Hide password</Text>
					</>
				) : (
					<>
						<VisibilityOffIcon className="showHideIcon" />
						<Text>Show password</Text>
					</>
				)}
			</Container>
			<Button className="authBtn" onClick={authenticateUser}>
				Login
			</Button>
		</LoginStyled>
	);
};

export default Login;
