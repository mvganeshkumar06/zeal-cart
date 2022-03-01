import React from 'react';
import { Container, Alert, Spinner, Button, Text, Input, Toast, useNotify } from '@zeal-ui/core';
import { SignupStyled } from '../styles';
import axios from 'axios';
import useProductContext from '../hooks/use-product-context';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Signup = ({ userCredentials, setUserCredentials, setShowLogin, setLoginAsGuest }) => {
	const { name, password, showPassword, address, email } = userCredentials;

	const {
		state: { isLoading, isError },
		dispatch,
	} = useProductContext();

	const { isOpen, onOpen, onClose } = useNotify();

	const signupUser = () => {
		const signup = async () => {
			try {
				await axios({
					method: 'post',
					url: 'https://zeal-cart.herokuapp.com/users/signup',
					data: {
						userName: name,
						password,
						contact: {
							address,
							email,
						},
					},
				});
				setUserCredentials({
					name: '',
					password: '',
					showPassword: false,
					address: '',
					email: '',
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
		if (
			name.length === 0 ||
			password.length === 0 ||
			email.length === 0 ||
			address.length === 0
		) {
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
			signup();
		}
	};

	const loginUserAsGuest = () => {
		setLoginAsGuest(true);
		setShowLogin(true);
	};

	return (
		<SignupStyled type="col" width="100%" rowCenter>
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
				<Text>Successfully signed up</Text>
			</Toast>
			<Input
				type="text"
				placeholder="Create your username"
				value={name}
				onChange={(event) =>
					setUserCredentials({ ...userCredentials, name: event.target.value })
				}
				className="input"
			/>
			<Input
				type={showPassword ? 'text' : 'password'}
				placeholder="Create your password"
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
			<Input
				type="text"
				placeholder="Enter your email"
				value={email}
				onChange={(event) =>
					setUserCredentials({ ...userCredentials, email: event.target.value })
				}
				className="input"
			/>
			<Input
				type="text"
				placeholder="Enter your address"
				value={address}
				onChange={(event) =>
					setUserCredentials({ ...userCredentials, address: event.target.value })
				}
				className="input"
			/>
			<Button className="authBtn" onClick={signupUser}>
				Signup
			</Button>
			<Alert type="warning">Don't want to sign up? Login in as Guest instead!</Alert>
			<Button color="accent" className="loginAsGuestBtn" onClick={loginUserAsGuest}>
				Login as Guest
			</Button>
		</SignupStyled>
	);
};

export default Signup;
