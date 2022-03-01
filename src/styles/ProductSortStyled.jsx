import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductSortStyled = styled(Container)`
	.sortTitle {
		margin-left: 0.5rem;
		margin-bottom: 0rem;
	}

	.sortBtn {
		margin: 0rem;
		padding: 0rem;
		border-radius: 0rem;
		border-right: 0.5px solid var(--zeal-color-black);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.sortIcon {
		margin: 0.5rem;
	}

	.sortModalContent {
		padding: 0rem 0.5rem;
	}

	.inputItem {
		margin: 1rem 0rem;
	}

	.inputContainer {
		margin: 0.25rem 0rem;
	}

	.inputContainer input {
		margin-right: 0.5rem;
	}
`;

export default ProductSortStyled;
