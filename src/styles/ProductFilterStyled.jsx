import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductFilterStyled = styled(Container)`
	.filterTitle {
		margin-left: 0.5rem;
		margin-bottom: 0rem;
	}

	.filterBtn {
		margin: 0rem;
		padding: 0rem;
		border-radius: 0rem;
		border-left: 0.5px solid var(--zeal-color-black);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.filterIcon {
		margin: 0.5rem;
	}

	.filterModalContent {
		padding: 0rem 0.5rem;
	}

	.inputItem {
		margin: 1rem 0rem;
	}

	.input {
		margin-right: 0.5rem;
		accent-color: var(--zeal-color-secondary-main);
	}

	#input-range {
		padding: 0rem;
	}
`;

export default ProductFilterStyled;
