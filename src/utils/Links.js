import HomeIcon from "@material-ui/icons/Home";
import LocalMallIcon from "@material-ui/icons/LocalMall";

const navigationItems = [
    {
        id:1,
        name: "Home",
        url: "/",
        icon:<HomeIcon/>,
    },
    {
        id:2,
        name: "Products",
        url: "/products",
        icon:<LocalMallIcon/>,
    },
];

export { navigationItems };
