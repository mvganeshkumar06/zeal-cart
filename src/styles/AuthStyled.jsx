import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const AuthStyled = styled(Container)`
	margin: 4rem 0rem;

	.authContainer {
		border-radius: 0.125rem;
		background-color: var(--zeal-color-background-base-dark);
		box-shadow: var(--zeal-shadow-light);
	}

	.authNavContainer {
		margin-bottom: 2rem;
	}

	.authNavBtn {
		border-radius: 0rem;
		margin: 0rem;
		font-size: 1rem;
	}

	.authNavBtnActive {
		color: var(--zeal-color-white);
		background-color: var(--zeal-color-secondary-dark);
	}

	.userNameInput,
	.passwordInput {
		margin: 1rem 0rem;
	}

	@media (min-width: 400px) {
		.authContainer {
			width: 25rem;
		}
	}
`;

export default AuthStyled;
