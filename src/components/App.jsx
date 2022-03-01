import React from 'react';
import { ZealProvider } from '@zeal-ui/core';
import ProductProvider from '../context/ProductProvider';
import Router from '../router/Router';
import footerContents from '../utils/footer-contents';

const App = () => {
	return (
		<ZealProvider disableHeader footerContents={footerContents}>
			<ProductProvider>
				<Router />
			</ProductProvider>
		</ZealProvider>
	);
};

export default App;
