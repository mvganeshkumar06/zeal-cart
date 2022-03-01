import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductItemStyled = styled(Container)`
	background-color: ${({ onSlideShow }) =>
		onSlideShow
			? 'var(--zeal-color-background-base-main)'
			: 'var(--zeal-color-background-base-dark)'};
	border-radius: 0.125rem;
	box-shadow: var(--zeal-shadow-light);
	margin: 0.5rem 0rem;

	.productImageContainer {
		background-color: var(--zeal-color-background-base-light);
		border-radius: 0.125rem;
		margin: 0rem;
	}

	.productDetailsContainer {
		padding: 0rem 0.75rem;
	}

	.productLink,
	.productDetailItem a {
		text-decoration: none;
	}

	.productName {
		padding: ${({ onSlideShow }) => (onSlideShow ? '0rem 0.75rem' : '')};
		margin-bottom: 0.5rem;
	}

	.productName:hover {
		text-decoration: underline;
	}

	.productDetail {
		margin: 0.5rem 0rem;
	}

	.ratingIcon {
		width: 1.125rem;
		margin: 0rem 0.25rem;
	}

	.trendingBadge {
		margin: 0rem;
		margin-left: 0.5rem;
	}
`;

export default ProductItemStyled;
