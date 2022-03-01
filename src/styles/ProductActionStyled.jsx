import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const ProductActionStyled = styled(Container)`
	margin: 0.5rem 0rem;

	.actionContainer {
		margin: 0.75rem 0rem;
	}

	.actionBtn {
		margin: 0rem;
	}

	.actionIcon {
		margin-right: 0.5rem;
	}

	.actionIconActive {
		color: var(--zeal-color-error-main);
	}

	.quantityInput {
		margin: 0rem;
		margin-right: 0.5rem;
	}

	.quantityInput::-webkit-inner-spin-button,
	.quantityInput::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
`;

export default ProductActionStyled;
