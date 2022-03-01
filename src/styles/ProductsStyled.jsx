import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductsStyled = styled(Container)`
	.feedbackContainer {
		position: fixed;
		top: 6.5rem;
	}

	.productsContainer {
		margin: 2rem 0rem;
	}

	.optionsContainerOnLoad {
		position: fixed;
		left: 0rem;
		bottom: 0rem;
	}

	.optionsContainer {
		position: sticky;
		left: 0rem;
		bottom: 0rem;
		margin-left: -1rem;
	}

	@media (min-width: 470px) {
		.productItemsGrid {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 1rem;
		}
	}

	@media (min-width: 700px) {
		.productItemsGrid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 840px) {
		.productsContainer {
			justify-content: flex-start;
		}

		.productItemsGrid {
			width: 60%;
			grid-template-columns: repeat(2, 1fr);
			position: sticky;
			top: 6rem;
			left: 18rem;
		}

		.optionsContainerOnLoad,
		.optionsContainer {
			display: none;
		}
	}

	@media (min-width: 1000px) {
		.productItemsGrid {
			width: 70%;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1000px) {
		.productItemsGrid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1240px) {
		.productItemsGrid {
			width: 75%;
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.desktopLarge}) {
		.productItemsGrid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
`;

export default ProductsStyled;
