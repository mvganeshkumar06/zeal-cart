import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const SignupStyled = styled(Container)`
	.feedbackToast {
		padding: 0rem 0.5rem;
	}

	.input {
		margin: 1rem 0rem;
	}

	.authBtn {
		margin: 1rem 0rem 2rem 0rem;
	}

	.passwordIndicator {
		margin: 0rem;
	}

	.passwordIndicator:hover {
		cursor: pointer;
	}

	.showHideIcon {
		margin-right: 0.5rem;
	}

	.showHideIcon:hover {
		cursor: pointer;
	}

	.loginAsGuestBtn {
		margin-bottom: 2rem;
	}
`;

export default SignupStyled;
