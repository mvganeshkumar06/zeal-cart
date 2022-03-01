import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductOptionsStyled = styled(Container)`
	display: none;

	.input {
		margin-right: 0.5rem;
		accent-color: var(--zeal-color-secondary-main);
	}

	#input-range {
		padding: 0rem;
	}

	@media (min-width: 840px) {
		display: flex;
		background-color: var(--zeal-color-background-base-dark);
		box-shadow: var(--zeal-shadow-light);
		border-radius: 0.125rem;
		width: 14rem;
		height: auto;
		padding: 0.5rem 1rem;
		position: sticky;
		top: 7.5rem;
		left: 2rem;
	}
`;

export default ProductOptionsStyled;
