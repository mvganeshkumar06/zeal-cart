import React from 'react';
import { Container, Text, Image, Badge } from '@zeal-ui/core';
import { ProductItemStyled } from '../styles';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import { Link } from 'react-router-dom';
import ProductAction from './ProductAction';

const ProductItem = ({ details, onSlideShow, showQuantity }) => {
	const { _id, name, imageUrl, price, rating, trending } = details;

	return (
		<ProductItemStyled
			type="col"
			width={onSlideShow ? '14rem' : 'auto'}
			height={onSlideShow ? '90%' : 'auto'}
			rowCenter={onSlideShow}
			onSlideShow={onSlideShow}
		>
			<Container
				type="col"
				rowCenter
				colCenter
				width="100%"
				height="15rem"
				className="productImageContainer"
			>
				<Link to={`/products/${_id}`}>
					<Image
						src={imageUrl}
						alt="product"
						width="auto"
						height="auto"
						className="productImage"
					/>
				</Link>
			</Container>
			{onSlideShow ? (
				<Link to={`/products/${_id}`} className="productLink">
					<Text className="productName">{name}</Text>
				</Link>
			) : (
				<Container
					type="col"
					width="100%"
					height="calc(100% - 15rem)"
					rowCenter
					colBetween
					className="productDetailsContainer"
				>
					<Container
						type="col"
						width="100%"
						height="100%"
						rowCenter
						colEven
						className="productDetailItem"
					>
						<Link to={`/products/${_id}`}>
							<Text width="100%" center className="productName">
								{name}
							</Text>
						</Link>
						<Container
							type="row"
							width="100%"
							rowCenter
							colCenter
							className="productDetail"
						>
							${price} | {rating} <StarSharpIcon className="ratingIcon" />{' '}
							{trending && (
								<>
									|
									<Badge color="warning" width="auto" className="trendingBadge">
										Trending
									</Badge>
								</>
							)}
						</Container>
					</Container>
					<ProductAction _id={_id} showQuantity={showQuantity} />
				</Container>
			)}
		</ProductItemStyled>
	);
};

export default ProductItem;
