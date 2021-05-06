import React, { useContext } from "react";
import {
    Container,
    useStyleContext,
    useThemeContext,
    Text,
    Button,
} from "@zeal-ui/core";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import HomeIcon from "@material-ui/icons/Home";

const Header = () => {
    const style = useStyleContext();
    const { theme, toggleTheme } = useThemeContext();

    const styles = `
        width: 100%;
        height: 4.5rem;
        background-color: ${theme === "light" ? "white" : style.colors.gray[4]};
        color: ${theme === "light" ? "black" : "white"};
        border-bottom: 1px solid  ${theme === "light" ? "black" : "white"};
        z-index: ${style.zIndex[1]};
        position: fixed;
        top: 0;

        .zealCartLink{
            display: none;
        }

        .title{
            font-size: 1.25rem;
            margin-left: 3rem;
        }

        .themeIcon:hover,.wishIcon:hover,.cartIcon:hover{
            cursor:pointer;
        }
        
        .themeIcon,.homeIcon,.bagIcon,.wishIcon,.cartIcon{
            width:1.25rem;
            height:1.25rem;
            margin: 0rem 0.75rem;
        }

        .themeIcon{
            margin:0rem 0.25rem;
        }

        .wishIconContainer,.cartIconContainer{
            position:relative;
        }

        .wishCount,
        .cartCount{
            width: 1rem;
            height: 1rem;
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
            bottom: 0.5rem;
            left: 1.5rem;
        }

        .iconText, .productsIconItem, .authBtn{
            display:none;
        }

        .iconsContainer{
            margin-right:1rem;
        }

        @media(min-width:768px){
            .authBtn{
                display:initial;
                margin-left:1.5rem;
            }
            .iconText{
                display:initial;
                margin:0.25rem 0rem 0rem 0rem;
                font-size:0.85rem;
            }
            .iconsContainer{
                margin:0.5rem 5rem 0rem auto;
            }
            .iconItem{
                display:flex;
                margin:0rem 1.5rem;
            }
            .wishCount, .cartCount{
                bottom:2.25rem;
                left:1.75rem;
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
        }
    `;

    const {
        state: { user, wishList, cart },
        dispatch,
    } = useContext(ProductContext);

    const logoutUser = () => {
        dispatch({ type: "SET_USER", payload: "" });
        localStorage.removeItem("user");
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
                <Container type="col" rowCenter colCenter className="iconItem">
                    <Brightness4Icon
                        className="themeIcon"
                        onClick={toggleTheme}
                    />
                    <Text className="iconText">Theme</Text>
                </Container>
                <Link to="/" className="iconItem">
                    <Container type="col" rowCenter colCenter>
                        <HomeIcon className="homeIcon" />
                        <Text className="iconText">Home</Text>
                    </Container>
                </Link>
                <Link to="/products" className="iconItem productsIconItem">
                    <Container type="col" rowCenter colCenter>
                        <LocalMallIcon className="bagIcon" />
                        <Text className="iconText">Products</Text>
                    </Container>
                </Link>
                <Link to="/wishlist" className="iconItem">
                    <Container
                        type="col"
                        rowCenter
                        colCenter
                        className="wishIconContainer"
                    >
                        <FavoriteBorder className="wishIcon" />{" "}
                        <Text className="iconText">Wishlist</Text>
                        {wishList.length > 0 && (
                            <span className="wishCount">{wishList.length}</span>
                        )}
                    </Container>
                </Link>
                <Link to="/cart" className="iconItem">
                    <Container
                        type="col"
                        rowCenter
                        colCenter
                        className="cartIconContainer"
                    >
                        <ShoppingCartIcon className="cartIcon" />{" "}
                        <Text className="iconText">Cart</Text>
                        {cart.length > 0 && (
                            <span className="cartCount">{cart.length}</span>
                        )}
                    </Container>
                </Link>
                {user ? (
                    <Button className="authBtn" onClick={logoutUser}>
                        Logout
                    </Button>
                ) : (
                    <Link
                        to={{
                            pathname: "/login",
                            state: { pathAfterLogin: "/" },
                        }}
                    >
                        <Button className="authBtn">Login</Button>
                    </Link>
                )}
            </Container>
        </Container>
    );
};

export default Header;
