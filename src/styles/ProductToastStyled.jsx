import styled from 'styled-components';
import { Toast } from '@zeal-ui/core';

const ProductToastStyled = styled(Toast)`
	padding: 0rem 0.5rem;
	transform: translate(-50%, 0);

	@media (min-width: 840px) {
		bottom: 1rem;
	}
`;

export default ProductToastStyled;
