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

const Header = () => {
    const style = useStyleContext();
    const { theme, toggleTheme } = useThemeContext();

    const styles = `
        width: 100%;
        height: 4rem;
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
            width:6rem;
            margin-left: 3rem;
        }

        .themeIcon:hover,.wishIcon:hover,.cartIcon:hover{
            cursor:pointer;
        }
        
        .themeIcon,.wishIcon,.cartIcon{
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
            left: 1.75rem;
        }

        .authBtn{
            margin:0rem 0rem 0rem 0.5rem;
            padding:0rem 0.25rem;
        }

        .theme, .wishlist, .cart{
            display:none;
        }

        @media(min-width:425px){
            .themeIcon, .wishIcon, .cartIcon{
                width:1.5rem;
                height:1.5rem;
            }
            .themeIcon{
                margin:0rem 0.75rem;
            }
            .wishCount, .cartCount{
                width:1rem;
                height:1rem;
            }
            .authBtn{
                margin:0rem 0rem 0rem 1rem;
            }
        }

        @media(min-width:768px){
            .theme, .wishlist, .cart{
                display:initial;
            }
            .icons{
                margin-left: auto;
                margin-right:5rem;
            }
            .wishCount, .cartCount{
                bottom:0.85rem;
                left:1.65rem;
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
                width:fit-content;
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
            <Container type="row" rowCenter colCenter className="icons">
                <Brightness4Icon className="themeIcon" onClick={toggleTheme} />
                <span className="theme">Theme</span>
                <Link to="/wishlist">
                    <Container type="row" className="wishIconContainer">
                        <FavoriteBorder className="wishIcon" />{" "}
                        <span className="wishlist">Wishlist</span>
                        {wishList.length > 0 && (
                            <span className="wishCount">{wishList.length}</span>
                        )}
                    </Container>
                </Link>
                <Link to="/cart">
                    <Container type="row" className="cartIconContainer">
                        <ShoppingCartIcon className="cartIcon" />{" "}
                        <span className="cart">Cart</span>
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
