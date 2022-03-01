import React from 'react';
import { Text, Button } from '@zeal-ui/core';
import { NotFoundStyled } from '../styles';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<NotFoundStyled type="col" width="100%" rowCenter>
			<Text type="mainHeading">The page you are looking for is not found!</Text>
			<Link to="/">
				<Button>Go back to home</Button>
			</Link>
		</NotFoundStyled>
	);
};

export default NotFound;
