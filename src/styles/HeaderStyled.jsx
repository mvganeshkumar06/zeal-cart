import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const HeaderStyled = styled(Container)`
	background-color: var(--zeal-color-background-base-main);
	box-shadow: var(--zeal-shadow-medium);
	z-index: var(--zeal-z-index-banner);
	position: fixed;
	top: 0rem;

	.zealCartLink {
		display: none;
	}

	.title {
		font-size: 1.125rem;
		margin-left: 3.5rem;
	}

	.linkItem {
		margin: 0rem 0.75rem;
	}

	.linkItem:hover {
		cursor: pointer;
	}

	.linkIcon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.linkText,
	.homeLinkItem,
	.productsLinkItem,
	.authLinkItem {
		display: none;
	}

	.wishIconContainer,
	.cartIconContainer {
		position: relative;
	}

	.wishCount,
	.cartCount {
		background-color: var(--zeal-color-error-main);
		color: var(--zeal-color-on-error);
		font-size: 0.75rem;
		border-radius: 0.125rem;
		position: absolute;
		bottom: 1.125rem;
		left: 1rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.tabletPotrait}) {
		.title {
			font-size: 1.25rem;
			margin-left: 4.5rem;
		}

		.linksContainer {
			margin: 0rem 0.5rem 0rem auto;
		}

		.linkItem {
			margin: 0rem 1.25rem;
			text-decoration: none;
		}

		.linkText {
			display: inline;
			font-size: 0.85rem;
			margin: 0rem;
			margin-top: 0.125rem;
		}

		.wishCount {
			bottom: 2.35rem;
			left: 1.85rem;
		}

		.cartCount {
			bottom: 2.35rem;
			left: 1.25rem;
		}
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
		.zealCartIcon {
			width: 2.5rem;
			height: 2.5rem;
			margin-left: 1.5rem;
		}

		.zealCartLink {
			display: inline;
		}

		.title {
			font-size: 1.5rem;
			margin: 0rem 0rem 0.25rem 1.25rem;
		}

		.linksContainer {
			margin-right: 1.5rem;
		}

		.homeLinkItem,
		.productsLinkItem,
		.authLinkItem {
			display: flex;
		}
	}
`;

export default HeaderStyled;
