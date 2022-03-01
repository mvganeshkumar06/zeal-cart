import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductStyled = styled(Container)`
	margin-bottom: 5rem;

	.feedbackContainer {
		margin-top: 2rem;
	}

	.productImageContainer {
		background-color: var(--zeal-color-background-base-dark);
		border-radius: 0.25rem;
		padding: 1rem;
	}

	.productDetailsContainer {
		background-color: var(--zeal-color-background-base-dark);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
	}

	.productDetailHeader {
		margin-left: -0.5rem;
		flex-wrap: wrap;
	}

	.productDetail {
		margin: 0rem 0.5rem;
	}

	.productRating {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.ratingIcon {
		width: 1.25rem;
		height: 1.25rem;
		margin-left: 0.25rem;
	}

	.trendingBadge {
		padding: 0rem 0.25rem;
		margin: 0rem;
		margin-left: 0.5rem;
	}

	@media (min-width: 500px) {
		.productContainer {
			width: 75%;
		}
	}

	@media (min-width: 900px) {
		.productContainer {
			flex-direction: row;
			align-items: flex-start;
		}

		.productImageContainer {
			width: 20rem;
			margin-right: 5rem;
		}
	}
`;

export default ProductStyled;
