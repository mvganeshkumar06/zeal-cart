import React, { useEffect } from 'react';
import { Container, Text, Button, Modal, useNotify, Input } from '@zeal-ui/core';
import { ProductSortStyled } from '../styles';
import SortIcon from '@material-ui/icons/Sort';
import useProductContext from '../hooks/use-product-context';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';

const ProductSort = () => {
	const { isOpen, onOpen, onClose } = useNotify(false);

	const {
		state: { sortOption },
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
		<ProductSortStyled width="50%">
			<Button
				width="100%"
				height="2.5rem"
				color="secondary"
				className="sortBtn"
				onClick={onOpen}
			>
				<SortIcon className="sortIcon" />
				Sort
			</Button>
			<Modal
				type="col"
				width="18rem"
				height="auto"
				isOpen={isOpen}
				onClickAway={onClose}
				position="center"
			>
				<Container type="row" width="100%" rowBetween colCenter>
					<Text bold className="sortTitle">
						Sort Products
					</Text>
					<Button
						onClick={() => {
							dispatch({ type: 'RESET_SORT' });
							parsedQuery.SORT = undefined;
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
						color="secondary"
					>
						Clear
					</Button>
				</Container>
				<Container type="col" className="sortModalContent">
					<Container type="col" width="100%" className="inputItem">
						<Container type="row" width="100%" colCenter className="inputContainer">
							<Input
								id="input-low-to-high"
								type="radio"
								name="sort-radio-group"
								checked={sortOption === 'PRICE_LOW_TO_HIGH'}
								onChange={() => {
									dispatch({
										type: 'SET_PRICE_LOW_TO_HIGH',
										payload: 'PRICE_LOW_TO_HIGH',
									});
									parsedQuery.SORT = 'PRICE_LOW_TO_HIGH';
									history.replace(
										`/products?${queryString.stringify(parsedQuery)}`,
									);
								}}
							/>
							<label htmlFor="input-low-to-high">Price Low to High</label>
						</Container>
						<Container type="row" width="100%" colCenter className="inputContainer">
							<Input
								id="input-high-to-low"
								type="radio"
								name="sort-radio-group"
								checked={sortOption === 'PRICE_HIGH_TO_LOW'}
								onChange={() => {
									dispatch({
										type: 'SET_PRICE_HIGH_TO_LOW',
										payload: 'PRICE_HIGH_TO_LOW',
									});
									parsedQuery.SORT = 'PRICE_HIGH_TO_LOW';
									history.replace(
										`/products?${queryString.stringify(parsedQuery)}`,
									);
								}}
							/>
							<label htmlFor="input-high-to-low">Price High to Low</label>
						</Container>
						<Container type="row" width="100%" colCenter className="inputContainer">
							<Input
								id="input-trending"
								type="radio"
								name="sort-radio-group"
								checked={sortOption === 'TRENDING_FIRST'}
								onChange={() => {
									dispatch({
										type: 'SET_TRENDING_FIRST',
										payload: 'TRENDING_FIRST',
									});
									parsedQuery.SORT = 'TRENDING_FIRST';
									history.replace(
										`/products?${queryString.stringify(parsedQuery)}`,
									);
								}}
							/>
							<label htmlFor="input-trending"> Trending First </label>
						</Container>
						<Container type="row" width="100%" colCenter className="inputContainer">
							<Input
								id="input-rating"
								type="radio"
								name="sort-radio-group"
								checked={sortOption === 'RATING'}
								onChange={() => {
									dispatch({
										type: 'SET_RATING',
										payload: 'RATING',
									});
									parsedQuery.SORT = 'RATING';
									history.replace(
										`/products?${queryString.stringify(parsedQuery)}`,
									);
								}}
							/>
							<label htmlFor="input-rating"> Rating </label>
						</Container>
					</Container>
				</Container>
			</Modal>
		</ProductSortStyled>
	);
};

export default ProductSort;
