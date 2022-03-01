import React, { useState } from 'react';
import { Container, Button } from '@zeal-ui/core';
import { AuthStyled } from '../styles';
import { Login, Signup } from '../components/index';

const Auth = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [userCredentials, setUserCredentials] = useState({
		name: '',
		password: '',
		showPassword: false,
		address: '',
		email: '',
	});
	const [loginAsGuest, setLoginAsGuest] = useState(false);

	return (
		<AuthStyled type="col" width="100%" rowCenter>
			<Container type="col" width="100%" rowCenter className="authContainer">
				<Container type="row" width="100%" rowCenter colCenter className="authNavContainer">
					<Button
						width="50%"
						color="secondary"
						className={`authNavBtn ${showLogin && 'authNavBtnActive'}`}
						onClick={() => setShowLogin(true)}
					>
						Login
					</Button>
					<Button
						width="50%"
						color="secondary"
						className={`authNavBtn ${!showLogin && 'authNavBtnActive'}`}
						onClick={() => setShowLogin(false)}
					>
						Signup
					</Button>
				</Container>
				{showLogin ? (
					<Login
						userCredentials={userCredentials}
						setUserCredentials={setUserCredentials}
						loginAsGuest={loginAsGuest}
					/>
				) : (
					<Signup
						userCredentials={userCredentials}
						setUserCredentials={setUserCredentials}
						setShowLogin={setShowLogin}
						setLoginAsGuest={setLoginAsGuest}
					/>
				)}
			</Container>
		</AuthStyled>
	);
};

export default Auth;
