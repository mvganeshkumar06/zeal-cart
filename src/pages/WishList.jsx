import React from 'react';
import { Container, Text, Grid, Alert, Spinner } from '@zeal-ui/core';
import { WishListStyled } from '../styles';
import useProductContext from '../hooks/use-product-context';
import { ProductItem, ProductToast } from '../components';

const WishList = () => {
	const {
		state: { wishList, isLoading, isError },
	} = useProductContext();

	return (
		<WishListStyled type="col" width="100%" rowCenter>
			<Text type="mainHeading">WishList</Text>
			<Container type="row" rowCenter width="100%" className="feedbackContainer">
				{isLoading.wishList && <Spinner />}
				{isError.wishList && <Alert type="error">Error while getting wishlist</Alert>}
			</Container>
			{!isLoading.wishList && !isError.wishList && (
				<>
					<Text type="subHeading2">
						You have {wishList && wishList.length > 0 ? wishList.length : 0} item(s) on
						your wishlist
					</Text>
					<Grid width="100%" className="wishListGrid">
						{wishList.map((product) => {
							return <ProductItem key={product._id} details={product} />;
						})}
					</Grid>
				</>
			)}
			<ProductToast />
		</WishListStyled>
	);
};

export default WishList;
