import React, { useEffect } from 'react';
import { Container, Text, SlideShow, Button, useMediaQuery, Alert, Spinner } from '@zeal-ui/core';
import { HomeStyled } from '../styles';
import axios from 'axios';
import useProductContext from '../hooks/use-product-context';
import { ProductItem } from '../components';
import { Link } from 'react-router-dom';

const Home = () => {
	const {
		state: { products, categories, isLoading, isError },
		dispatch,
	} = useProductContext();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: 'https://zeal-cart.herokuapp.com/categories',
				});
				dispatch({
					type: 'SET_CATEGORIES',
					payload: response.data,
				});
			} catch (err) {
				console.log(err.response?.data.errorMessage);
				dispatch({
					type: 'SET_IS_ERROR',
					payload: { categoires: true },
				});
			} finally {
				dispatch({
					type: 'SET_IS_LOADING',
					payload: { categories: false },
				});
			}
		};
		fetchCategories();
	}, [dispatch]);

	const getSlides = (products) => {
		return products.map((productDetails) => (
			<ProductItem details={productDetails} key={productDetails._id} onSlideShow />
		));
	};

	const trendingProducts = products.filter((product) => product.trending);

	const query = useMediaQuery([
		'(max-width:768px)',
		'(max-width:1024px)',
		'(max-width:1440px)',
		'(min-width:1440px)',
	]);
	const isMobile = query[0];
	const isDesktop = query[1];
	const isDesktopMedium = query[2];
	const isDesktopLarge = query[3];

	const getSlidesCount = () => {
		if (isMobile) {
			return 1;
		}
		if (isDesktop) {
			return 2;
		}
		if (isDesktopMedium) {
			return 3;
		}
		if (isDesktopLarge) {
			return 4;
		}
	};

	return (
		<HomeStyled type="col" width="100%" rowCenter>
			<Container type="row" rowCenter width="100%" className="feedbackContainer">
				{isLoading.categories && <Spinner />}
				{isError.categories && (
					<Alert type="error">
						<Text>Error while getting products</Text>
					</Alert>
				)}
			</Container>
			{!isLoading.categoires && !isError.categoires && (
				<Container type="col" width="100%" className="contentContainer">
					<Container type="row" colCenter>
						<Text type="subHeading1">Trending products</Text>
						<Link to="/products?SORT=TRENDING_FIRST">
							<Button className="showMoreBtn">Show More</Button>
						</Link>
					</Container>
					<SlideShow
						slides={getSlides(trendingProducts)}
						slidesCount={getSlidesCount()}
						width="100%"
						height="22rem"
						colCenter
						className="slideShow"
					/>
					{categories.map(({ name, products }) => {
						return (
							<Container type="col" width="100%" height="auto" key={name}>
								<Container type="row" colCenter>
									<Text type="subHeading1">{name}</Text>
									<Link
										to={`/products?CATEGORY=${name
											.toUpperCase()
											.replace(' ', '_')}`}
									>
										<Button className="showMoreBtn">Show more</Button>
									</Link>
								</Container>
								<SlideShow
									slides={getSlides(products)}
									slidesCount={getSlidesCount()}
									width="100%"
									height="22rem"
									className="slideShow"
								/>
							</Container>
						);
					})}
				</Container>
			)}
		</HomeStyled>
	);
};

export default Home;
