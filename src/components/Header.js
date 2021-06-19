import React from "react";
import {
    Container,
    useStyleContext,
    useThemeContext,
    Text,
} from "@zeal-ui/core";
import { Link } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const Header = () => {
    const style = useStyleContext();
    const { theme, toggleTheme } = useThemeContext();

    const styles = `
        width: 100%;
        height: 4.5rem;
        background-color: ${theme === "light" ? style.colors.gray[1] : style.colors.gray[3]};
        color: ${theme === "light" ? "black" : "white"};
        z-index: ${style.zIndex[2]};
        position: fixed;
        top: 0;

        .zealCartLink{
            display: none;
        }

        .title{
            font-size:1.25rem;
            margin-left: 4rem;
        }

        .iconsContainer{
            margin-right:1rem;
        }

        .icon{
            width:1.25rem;
            height:1.25rem;
            margin: 0rem 0.75rem;
        }

        .icon:hover, .iconText:hover, .themeIconItem:hover{
            cursor:pointer;
        }

        .iconItem, .iconText, .productsIconItem, .authItem{
            display:none;
        }

        .themeIconItem{
            display:flex;
        }

        .wishIconItem, .cartIconItem{
            display:inline;
        }

        .wishIconContainer,.cartIconContainer{
            position:relative;
        }

        .wishCount,
        .cartCount{
            width: 0.75rem;
            height: 0.75rem;
            border: 2px solid  ${theme === "light" ? "black" : "white"};
            background-color: ${style.colors.red[4]};
            color: white;
            font-size: 0.75rem;
            font-weight: bold;
            padding: 1px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius:50%;
        }

        .wishCount,.cartCount{   
            bottom: 0.75rem;
            left: 1.5rem;
        }

        @media(min-width:768px){
            .iconsContainer{
                margin:0.5rem 5rem 0rem auto;
            }
        }

        @media (min-width: 1024px) {
            .zealCartLink {
                display: initial;
            }
            .zealCartIcon {
                width: 2.5rem;
                height: 2.5rem;
                margin-left: 1.5rem;
            }
            .title {
                font-size: 1.5rem;
                margin-left: 1rem;
            }
            .authItem{
                display:flex;
            }
            .iconItem{
                display:flex;
                margin:0rem 1.5rem;
            }
            .iconText{
                display:initial;
                margin:0.25rem 0rem 0rem 0rem;
                font-size:0.85rem;
            }
            .wishCount, .cartCount{
                bottom:2.25rem;
                left:1.65rem;
            }
        }
    `;

    const {
        state: { user, wishList, cart },
        dispatch,
    } = useProductContext();

    const logoutUser = () => {
        localStorage.removeItem("user-access-token");
        dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
        dispatch({ type: "SET_USER", payload: undefined });
    };

    return (
        <Container type="row" rowBetween colCenter customStyles={styles}>
            <Container type="row" rowCenter colCenter>
                <a
                    href="https://zeal-cart.netlify.app/"
                    className="zealCartLink"
                >
                    <ShopIcon className="zealCartIcon" />
                </a>
                <Text className="title">Zeal Cart</Text>
            </Container>
            <Container
                type="row"
                rowCenter
                colCenter
                className="iconsContainer"
            >
                <Container
                    type="col"
                    rowCenter
                    colCenter
                    className="iconItem themeIconItem"
                    onClick={toggleTheme}
                >
                    <Brightness4Icon className="icon themeIcon" />
                    <Text className="iconText">Theme</Text>
                </Container>
                <Link to="/" className="iconItem">
                    <Container type="col" rowCenter colCenter>
                        <HomeIcon className="icon" />
                        <Text className="iconText">Home</Text>
                    </Container>
                </Link>
                <Link to="/products" className="iconItem productsIconItem">
                    <Container type="col" rowCenter colCenter>
                        <LocalMallIcon className="icon" />
                        <Text className="iconText">Products</Text>
                    </Container>
                </Link>
                <Link to="/wishlist" className="iconItem wishIconItem">
                    <Container
                        type="col"
                        rowCenter
                        colCenter
                        className="wishIconContainer"
                    >
                        <FavoriteBorder className="icon" />
                        <Text className="iconText">Wishlist</Text>
                        {wishList.length > 0 && (
                            <span className="wishCount">{wishList.length}</span>
                        )}
                    </Container>
                </Link>
                <Link to="/cart" className="iconItem cartIconItem">
                    <Container
                        type="col"
                        rowCenter
                        colCenter
                        className="cartIconContainer"
                    >
                        <ShoppingCartIcon className="icon" />
                        <Text className="iconText">Cart</Text>
                        {cart.length > 0 && (
                            <span className="cartCount">{cart.length}</span>
                        )}
                    </Container>
                </Link>
                {user ? (
                    <Container
                        type="col"
                        rowCenter
                        colCenter
                        className="iconItem authItem"
                        onClick={logoutUser}
                    >
                        <PersonIcon className="icon" />
                        <Text className="iconText">Logout</Text>
                    </Container>
                ) : (
                    <Link
                        to={{
                            pathname: "/login",
                            state: { pathAfterLogin: "/" },
                        }}
                        className="iconItem authItem"
                    >
                        <Container type="col" rowCenter colCenter>
                            <PersonIcon className="icon" />
                            <Text className="iconText">Login</Text>
                        </Container>
                    </Link>
                )}
            </Container>
        </Container>
    );
};

export default Header;
