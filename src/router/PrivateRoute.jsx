import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ path, children, ...rest }) => {
	const savedAccessToken = localStorage.getItem('user-access-token');
	return (
		<Route path={path} {...rest}>
			{savedAccessToken ? (
				children
			) : (
				<Redirect to={{ pathname: '/login', state: { pathAfterLogin: path } }} />
			)}
		</Route>
	);
};

export default PrivateRoute;
