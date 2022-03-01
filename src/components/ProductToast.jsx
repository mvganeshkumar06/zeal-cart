import React from 'react';
import { Text } from '@zeal-ui/core';
import { ProductToastStyled } from '../styles';
import useProductContext from '../hooks/use-product-context';

const ProductToast = () => {
	const { state, dispatch } = useProductContext();

	const { isOpen, text } = state.productToast;

	const onClose = () => {
		dispatch({
			type: 'SET_PRODUCT_TOAST',
			payload: { ...state.productToast, isOpen: false },
		});
	};

	return (
		<ProductToastStyled
			width="15rem"
			height="auto"
			isOpen={isOpen}
			onClose={onClose}
			bottom="4rem"
			left="50%"
			color="accent"
		>
			<Text width="100%" center>
				{text}
			</Text>
		</ProductToastStyled>
	);
};

export default ProductToast;
