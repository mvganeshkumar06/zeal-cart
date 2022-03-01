import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const sidebarContents = [
	{
		id: 1,
		name: 'Home',
		url: '/',
		icon: <HomeIcon />,
	},
	{
		id: 2,
		name: 'Products',
		url: '/products',
		icon: <LocalMallIcon />,
	},
];

export default sidebarContents;
