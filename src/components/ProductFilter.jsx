import React, { useEffect } from 'react';
import { Container, Text, Button, Modal, useNotify, Input } from '@zeal-ui/core';
import { ProductFilterStyled } from '../styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import useProductContext from '../hooks/use-product-context';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';
import categories from '../utils/categories';

const ProductFilter = () => {
	const { isOpen, onOpen, onClose } = useNotify();

	const {
		state: {
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
				if (key !== 'SORT') {
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
		<ProductFilterStyled width="50%">
			<Button
				width="100%"
				height="2.5rem"
				color="secondary"
				className="filterBtn"
				onClick={onOpen}
			>
				<FilterListIcon className="filterIcon" />
				Filter
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
					<Text bold className="filterTitle">
						Filter Products
					</Text>
					<Button
						color="secondary"
						onClick={() => {
							dispatch({ type: 'RESET_FILTER' });
							const parsedQueryKeys = Object.keys(parsedQuery);
							for (let key of parsedQueryKeys) {
								if (key !== 'SORT') {
									parsedQuery[key] = undefined;
								}
							}
							history.replace(`/products?${queryString.stringify(parsedQuery)}`);
						}}
					>
						Clear
					</Button>
				</Container>
				<Container type="col" className="filterModalContent">
					<Container type="col" width="100%" className="inputItem">
						<Container type="col" width="100%" colCenter>
							<label htmlFor="input-range">Price Range ({priceRange})</label>
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
									history.replace(
										`/products?${queryString.stringify(parsedQuery)}`,
									);
								}}
							/>
						</Container>
						<Text>Categories</Text>
						{categories.map(({ id, name, query }) => (
							<Container
								type="row"
								colCenter
								width="100%"
								className="inputContainer"
								key={id}
							>
								<Input
									id="input-category"
									className="input"
									type="radio"
									name="category-radio-group"
									checked={category === query}
									onChange={() => {
										dispatch({
											type: 'SET_CATEGORY',
											payload: query,
										});
										parsedQuery.CATEGORY = query;
										history.replace(
											`/products?${queryString.stringify(parsedQuery)}`,
										);
									}}
								/>
								<label htmlFor="input-category">{name}</label>
							</Container>
						))}
					</Container>
				</Container>
			</Modal>
		</ProductFilterStyled>
	);
};

export default ProductFilter;
