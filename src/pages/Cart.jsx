import React from 'react';
import { Container, Text, Grid, Alert, Spinner } from '@zeal-ui/core';
import { CartStyled } from '../styles';
import useProductContext from '../hooks/use-product-context';
import { ProductItem, ProductToast } from '../components';

const Cart = () => {
	const {
		state: { cart, isLoading, isError },
	} = useProductContext();

	return (
		<CartStyled type="col" width="100%" rowCenter>
			<Text type="mainHeading">Cart</Text>
			<Container type="row" rowCenter width="100%" className="feedbackContainer">
				{isLoading.cart && <Spinner />}
				{isError.cart && <Alert type="error">Error while getting cart</Alert>}
			</Container>
			{!isLoading.cart && !isError.cart && (
				<>
					<Text type="subHeading2">
						You have {cart && cart.length > 0 ? cart.length : 0} item(s) on your cart
					</Text>
					<Grid className="cartGrid">
						{cart.map(({ product }) => {
							return <ProductItem key={product._id} details={product} showQuantity />;
						})}
					</Grid>
				</>
			)}
			<ProductToast />
		</CartStyled>
	);
};

export default Cart;
