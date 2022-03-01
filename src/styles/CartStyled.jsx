import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const CartStyled = styled(Container)`
	min-height: 100vh;

	.cartGrid {
		margin-top: 2rem;
		margin-bottom: 4rem;
	}

	@media (min-width: 500px) {
		.cartGrid {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 1rem 0.5rem;
		}
	}

	@media (min-width: 760px) {
		.cartGrid {
			grid-template-columns: repeat(3, 1fr);
			grid-column-gap: 1rem;
		}
	}

	@media (min-width: 1024px) {
		.cartGrid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 1200px) {
		.cartGrid {
			width: 80%;
		}
	}

	@media (min-width: 1440px) {
		.cartGrid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
`;

export default CartStyled;
