import React, { useEffect } from 'react';
import {
	Container,
	Text,
	List,
	ListItem,
	Image,
	Divider,
	Spinner,
	Badge,
	Alert,
} from '@zeal-ui/core';
import { ProductToast } from '../components';
import { ProductStyled } from '../styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import ProductAction from '../components/ProductAction';
import useProductContext from '../hooks/use-product-context';

const Product = () => {
	const { productId } = useParams();

	const {
		state: { product, isLoading, isError },
		dispatch,
	} = useProductContext();

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `https://zeal-cart.herokuapp.com/products/${productId}`,
				});
				dispatch({ type: 'SET_PRODUCT', payload: response.data });
			} catch (err) {
				console.log(err.response?.data.errorMessage);
				dispatch({ type: 'SET_IS_ERROR', payload: { product: true } });
			} finally {
				dispatch({
					type: 'SET_IS_LOADING',
					payload: { product: false },
				});
			}
		};

		fetchProductDetails();
	}, [dispatch, productId]);

	return (
		<ProductStyled type="col" width="100%" rowCenter>
			<Container type="row" width="100%" rowCenter className="feedbackContainer">
				{isLoading.product && <Spinner />}
				{isError.product && (
					<Alert as="p" type="error">
						Error while getting product
					</Alert>
				)}
			</Container>
			{!isLoading.product && !isError.product && (
				<Container type="col" width="100%" rowCenter className="productContainer">
					<Container
						type="col"
						width="100%"
						height="15rem"
						rowCenter
						colCenter
						className="productImageContainer"
					>
						<Image
							src={product.imageUrl}
							alt="product"
							width="auto"
							height="auto"
							className="productImage"
						/>
					</Container>
					<Container
						type="col"
						width="100%"
						colCenter
						className="productDetailsContainer"
					>
						<Text type="mainHeading">{product.name}</Text>
						<Container
							type="row"
							width="100%"
							colCenter
							className="productDetailHeader"
						>
							<Text className="productDetail">${product.price}</Text>|
							<Text className="productDetail productRating">
								{product.rating}
								<StarSharpIcon className="ratingIcon" />
							</Text>
							|<Text className="productDetail">{product.category.name}</Text>
							{product.trending && (
								<>
									|
									<Badge color="warning" width="auto" className="trendingBadge">
										Trending
									</Badge>
								</>
							)}
						</Container>
						<Divider />
						{product.description && (
							<>
								<Text type="subHeading2">Description</Text>
								<Text className="productDescription">{product.description}</Text>
							</>
						)}
						<Text type="subHeading2">Features</Text>
						<List>
							{product.features.map((feature) => (
								<ListItem key={feature}>{feature}</ListItem>
							))}
						</List>
						<Container type="row" colCenter>
							<ProductAction _id={productId} name={product.name} showQuantity />
						</Container>
					</Container>
				</Container>
			)}
			<ProductToast />
		</ProductStyled>
	);
};

export default Product;
