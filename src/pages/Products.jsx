import React from 'react';
import { Container, Alert, Text, Grid, Spinner } from '@zeal-ui/core';
import { ProductsStyled } from '../styles';
import {
	ProductItem,
	ProductFilter,
	ProductOptions,
	ProductSort,
	ProductToast,
} from '../components';
import useProductContext from '../hooks/use-product-context';
import {
	sortInIncreasingOrder,
	sortInDecreasingOrder,
	sortByTrending,
	sortByRating,
} from '../utils/sort';
import { filterByRange, filterByCategory } from '../utils/filter';

const Products = () => {
	const {
		state: { products, sortOption, filterOptions, isLoading, isError },
	} = useProductContext();

	const sortProducts = (sortOption) => {
		switch (sortOption) {
			case 'PRICE_LOW_TO_HIGH':
				return sortInIncreasingOrder(products);
			case 'PRICE_HIGH_TO_LOW':
				return sortInDecreasingOrder(products);
			case 'TRENDING_FIRST':
				return sortByTrending(products);
			case 'RATING':
				return sortByRating(products);
			default:
				return products;
		}
	};

	const filterProducts = (sortedProducts, filterOptions) => {
		let filteredProducts = [];
		if (filterOptions.priceRange > 0) {
			filteredProducts = filterByRange(sortedProducts, filterOptions.priceRange);
		}
		if (filterOptions.category) {
			filteredProducts = filterByCategory(filteredProducts, filterOptions.category);
		}
		return filteredProducts;
	};

	const sortedProducts = sortProducts(sortOption);
	const filteredProducts = filterProducts(sortedProducts, filterOptions);

	return (
		<ProductsStyled type="col" width="100%">
			<Container type="col" width="100%" rowCenter className="feedbackContainer">
				{isLoading.products && <Spinner />}
				{isError.products && (
					<Alert type="error">
						<Text>Error while getting products</Text>
					</Alert>
				)}
				{filteredProducts.length === 0 && products.length !== 0 && (
					<Alert type="error">
						<Text>No products found based on current filters</Text>
					</Alert>
				)}
			</Container>
			<Container type="row" width="100%" rowCenter className="productsContainer">
				<ProductOptions />
				{!isLoading.products && !isError.products && (
					<Grid col={1} className="productItemsGrid">
						{filteredProducts.map((product) => {
							return <ProductItem key={product._id} details={product} />;
						})}
					</Grid>
				)}
			</Container>
			<ProductToast />
			<Container
				type="row"
				width="100vw"
				rowBetween
				className={isLoading.products ? 'optionsContainerOnLoad' : 'optionsContainer'}
			>
				<ProductSort />
				<ProductFilter />
			</Container>
		</ProductsStyled>
	);
};

export default Products;
