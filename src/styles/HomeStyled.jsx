import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const HomeStyled = styled(Container)`
	margin: 5rem 0rem;

	.feedbackContainer {
		margin-top: 1rem;
	}

	.showMoreBtn {
		padding: 0.25rem 0.5rem;
		margin: 0rem 1rem;
	}

	.slideShow {
		padding: 0rem;
		background-color: var(--zeal-color-background-base-dark);
		box-shadow: var(--zeal-shadow-light);
	}

	.slideShow .slideContainer {
		justify-content: space-evenly;
		align-items: center;
	}

	.slideContainer div {
		width: 13.5rem;
	}

	.slideShow .prevArrow {
		left: 0rem;
	}

	.slideShow .nextArrow {
		right: 0rem;
	}

	@media (min-width: 340px) {
		.slideContainer div {
			width: 14rem;
		}

		.slideShow .prevArrow {
			left: 0.5rem;
		}

		.slideShow .nextArrow {
			right: 0.5rem;
		}
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
		.contentContainer {
			width: 80%;
		}
	}
`;

export default HomeStyled;
