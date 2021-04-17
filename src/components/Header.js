import React, { useContext } from "react";
import {
    Container,
    Image,
    useStyleContext,
    useThemeContext,
    Text,
} from "@zeal-ui/core";
import ZealCartIcon from "../assets/zeal-cart.svg";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
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
        
        .icons{
            margin: 0.25rem 1.5rem 0rem 0.5rem;
        }
        
        .title{
            font-size: 1.25rem;
            margin-left: 3.25rem;
        }

        .themeIcon:hover,.wishIcon:hover,.cartIcon:hover{
            cursor:pointer;
        }
        
        .themeIcon,.wishIcon,.cartIcon{
            margin: 0rem 0.75rem;
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
            bottom: 0.75rem;
            left: 1.75rem;
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
            .icons {
                margin-left: auto;
                margin-right: 5rem;
            }
            .title {
                font-size: 1.5rem;
                margin-left: 1rem;
            }
            .wishCountBadgeActive {
                right: 7.25rem;
            }
            .cartCountBadgeActive {
                right: 4.75rem;
            }
        }
    `;

    const {
        state: { wishList, cart },
    } = useContext(ProductContext);

    return (
        <Container type="row" rowBetween colCenter customStyles={styles}>
            <Container type="row" rowCenter colCenter>
                <a
                    href="https://zeal-cart.netlify.app/"
                    className="zealCartLink"
                >
                    <Image
                        src={ZealCartIcon}
                        alt="Drift UI"
                        className="zealCartIcon"
                    />
                </a>
                <Text className="title">Zeal Cart</Text>
            </Container>
            <Container className="icons">
                <Brightness4Icon className="themeIcon" onClick={toggleTheme} />
                <Link to="/wishlist">
                    <Container type="row" className="wishIconContainer">
                        <FavoriteBorder className="wishIcon" />
                        {wishList.length > 0 && (
                            <span className="wishCount">{wishList.length}</span>
                        )}
                    </Container>
                </Link>
                <Link to="/cart">
                    <Container type="row" className="cartIconContainer">
                        <ShoppingCartIcon className="cartIcon" />
                        {cart.length > 0 && (
                            <span className="cartCount">{cart.length}</span>
                        )}
                    </Container>
                </Link>
            </Container>
        </Container>
    );
};

export default Header;
