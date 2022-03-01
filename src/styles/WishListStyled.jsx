import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const WishListStyled = styled(Container)`
	min-height: 100vh;

	.wishListGrid {
		margin-top: 2rem;
		margin-bottom: 4rem;
	}

	@media (min-width: 470px) {
		.wishListGrid {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 1rem;
		}
	}

	@media (min-width: 700px) {
		.wishListGrid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.wishListGrid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 1200px) {
		.wishListGrid {
			width: 80%;
		}
	}

	@media (min-width: 1440px) {
		.wishListGrid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
`;

export default WishListStyled;
