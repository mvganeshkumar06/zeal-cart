import React, { useEffect } from 'react';
import useProductContext from '../hooks/use-product-context';
import { Container, Text, Button, Input } from '@zeal-ui/core';
import { ProductOptionsStyled } from '../styles';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';
import categories from '../utils/categories';

const ProductOptions = () => {
	const {
		state: {
			sortOption,
			filterOptions: { priceRange, category },
		},
		dispatch,
	} = useProductContext();

	const location = useLocation();
	const history = useHistory();
	const parsedQuery = queryString.parse(location.search);

	useEffect(() => {
		const parsedQueryKeys = Object.keys(parsedQuery);
		if (parsedQueryKeys.length > 0) {
			for (let key of parsedQueryKeys) {
				if (key === 'SORT') {
					dispatch({
						type: `SET_${parsedQuery[key]}`,
						payload: parsedQuery[key],
					});
				} else {
					dispatch({
						type: `SET_${key}`,
						payload: parsedQuery[key],
					});
				}
			}
		} else {
			dispatch({
				type: 'RESET_SORT_AND_FILTER',
			});
		}
		//eslint-disable-next-line
	}, []);

	return (
		<ProductOptionsStyled type="col" scrollAuto>
			<Container type="row" width="100%" rowBetween colCenter>
				<Text bold>SORT</Text>
				<Button
					color="secondary"
					onClick={() => {
						dispatch({
							type: 'RESET_SORT_AND_FILTER',
						});
						history.replace('/products');
					}}
				>
					Clear
				</Button>
			</Container>
			<Container type="col" width="100%">
				<Container type="row" width="100%" colCenter>
					<Input
						id="input-low-to-high"
						className="input"
						type="radio"
						name="sort"
						checked={sortOption === 'PRICE_LOW_TO_HIGH'}
						onChange={() => {
							dispatch({
								type: 'SET_PRICE_LOW_TO_HIGH',
								payload: 'PRICE_LOW_TO_HIGH',
							});
							parsedQuery.SORT = 'PRICE_LOW_TO_HIGH';
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
					/>
					<label htmlFor="input-low-to-high">Price Low to High</label>
				</Container>
				<Container type="row" width="100%" colCenter>
					<Input
						id="input-high-to-low"
						className="input"
						type="radio"
						name="sort"
						checked={sortOption === 'PRICE_HIGH_TO_LOW'}
						onChange={() => {
							dispatch({
								type: 'SET_PRICE_HIGH_TO_LOW',
								payload: 'PRICE_HIGH_TO_LOW',
							});
							parsedQuery.SORT = 'PRICE_HIGH_TO_LOW';
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
					/>
					<label htmlFor="input-high-to-low">Price High to Low</label>
				</Container>
				<Container type="row" width="100%" colCenter>
					<Input
						id="input-trending"
						className="input"
						type="radio"
						name="sort"
						checked={sortOption === 'TRENDING_FIRST'}
						onChange={() => {
							dispatch({
								type: 'SET_TRENDING_FIRST',
								payload: 'TRENDING_FIRST',
							});
							parsedQuery.SORT = 'TRENDING_FIRST';
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
					/>
					<label htmlFor="input-trending"> Trending First </label>
				</Container>
				<Container type="row" width="100%" colCenter>
					<Input
						id="input-rating"
						className="input"
						type="radio"
						name="sort"
						checked={sortOption === 'RATING'}
						onChange={() => {
							dispatch({
								type: 'SET_RATING',
								payload: 'RATING',
							});
							parsedQuery.SORT = 'RATING';
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
					/>
					<label htmlFor="input-rating"> Rating </label>
				</Container>
			</Container>
			<br />
			<Text bold>FILTERS</Text>
			<Container type="col" width="100%">
				<Container type="col" colCenter width="100%">
					<label htmlFor="input-range">Price Range [{priceRange}]</label>
					<Input
						id="input-range"
						className="input"
						type="range"
						name="price-range"
						min="0"
						max="1500"
						value={priceRange}
						onChange={(event) => {
							dispatch({
								type: 'SET_PRICE_RANGE',
								payload: parseInt(event.target.value),
							});
							parsedQuery.PRICE_RANGE = event.target.value;
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
					/>
				</Container>
				<Text>Categories</Text>
				{categories.map(({ id, name, query }) => (
					<Container type="row" colCenter width="100%" key={id}>
						<Input
							id="input-category"
							className="input"
							type="radio"
							name="category"
							checked={category === query}
							onChange={() => {
								dispatch({
									type: 'SET_CATEGORY',
									payload: query,
								});
								parsedQuery.CATEGORY = query;
								history.replace(`/products?${queryString.stringify(parsedQuery)}`);
							}}
						/>
						<label htmlFor="input-category">{name}</label>
					</Container>
				))}
			</Container>
		</ProductOptionsStyled>
	);
};

export default ProductOptions;
