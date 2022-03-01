import styled from 'styled-components';
import { Container } from '@zeal-ui/core';

const SidebarStyled = styled(Container)`
	.sidebarContainer {
		position: fixed;
		top: 0rem;
		left: 0rem;
		bottom: 0rem;
		padding: 0.75rem;
		background-color: var(--zeal-color-background-base-main);
		z-index: var(--zeal-z-index-drawer);
		box-shadow: var(--zeal-shadow-medium);
	}

	.zealCartIcon {
		width: 2rem;
		height: 2rem;
	}

	.title {
		font-size: 1.125rem;
		margin-left: 0.85rem;
	}

	.sidebarOpenIcon {
		width: 2rem;
		height: 2rem;
		position: fixed;
		top: 1.125rem;
		left: 0.5rem;
		z-index: var(--zeal-z-index-banner);
	}

	.sidebarCloseIcon {
		width: 1.75rem;
		height: 1.75rem;
		position: absolute;
		top: 1.35rem;
		right: 0.5rem;
		z-index: var(--zeal-z-index-banner);
	}

	.sidebarOpenIcon:hover,
	.sidebarCloseIcon:hover {
		cursor: pointer;
	}

	.sidebarList,
	.sidebarListItem {
		width: 100%;
	}

	.sidebarLink {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sidebarIconText {
		margin: 0.25rem 0.5rem;
	}

	.sidebarAuth {
		margin: 0.75rem 0.5rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.tabletPotrait}) {
		.sidebarOpenIcon {
			margin-left: 0.75rem;
		}
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
		display: none;
	}
`;

export default SidebarStyled;
