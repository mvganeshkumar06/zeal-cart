import React, { useState } from "react";
import {
    Container,
    Text,
    Input,
    useStyleContext,
    Toast,
    useNotify,
} from "@zeal-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";

const ProductAction = ({ _id, name, showQuantity }) => {
    const style = useStyleContext();

    const styles = `
        margin-top:2rem;

        .wishIcon,
		.wishIconActive,
		.addIcon,
		.addIconActive{
            margin-right:0.5rem;
        }

        .wishIcon:hover,
		.wishIconActive:hover,
		.addIcon:hover,
		.addIconActive:hover {
			cursor: pointer;
		}
		
		.wishIconActive, .addIconActive {
			color: ${style.colors.red[4]};
		}

        .cartContainer{
            margin-top:1rem;
        }

        .cartActionItem{
            margin-top:2.5rem;
            margin-left:1.5rem;
        }

        .quantityInput{
            width:2.5rem;
            height:1rem;
        }
    
    `;

    const {
        state: { wishList, cart, user },
        dispatch,
    } = useProductContext();

    const isProductWishListed = (id) => {
        return wishList.find((item) => item._id === id);
    };

    const isProductAddedToCart = (id) => {
        return cart.find((item) => item.product._id === id);
    };

    const productWishListed = isProductWishListed(_id);
    const productAddedToCart = isProductAddedToCart(_id);

    const getProductQuantity = (id) => {
        const product = cart.find((item) => item.product._id === id);
        return product ? product.quantity : 1;
    };

    const [productQuantity, setProductQuantity] = useState(
        getProductQuantity(_id)
    );

    const { isOpen, onOpen, onClose } = useNotify();

    const getToast = (text, type) => {
        return (
            <Toast
                type="center"
                isOpen={isOpen === type}
                delay={1500}
                onClose={onClose}
            >
                {text}
            </Toast>
        );
    };

    const productsMatch = useRouteMatch("/products");
    const productMatch = useRouteMatch("/products/:productId");
    const wishlistMatch = useRouteMatch("/wishlist");
    const cartMatch = useRouteMatch("/cart");

    const getPathAfterLogin = () => {
        if (productMatch) {
            return productMatch.url;
        }
        if (productsMatch) {
            return productsMatch.url;
        }
        if (wishlistMatch) {
            return wishlistMatch.url;
        }
        if (cartMatch) {
            return cartMatch.url;
        }
        return "/";
    };

    const history = useHistory();

    const updateWishList = () => {
        if (user) {
            const updateWishListOnDb = async () => {
                try {
                    const response = await axios({
                        method: "post",
                        url: `https://zeal-cart.herokuapp.com/wishlists/${user.id}`,
                        data: {
                            productId: _id,
                        },
                    });
                    dispatch({
                        type: "SET_WISHLIST",
                        payload: response.data,
                    });
                    onOpen("WISH_LIST");
                } catch (err) {
                    console.log(err.response?.data.errorMessage);
                }
            };
            updateWishListOnDb();
        } else {
            history.push({
                pathname: "/login",
                state: { pathAfterLogin: getPathAfterLogin() },
            });
        }
    };

    const updateCart = () => {
        if (user) {
            const updateCartOnDb = async () => {
                try {
                    const response = await axios({
                        method: "post",
                        url: showQuantity
                            ? `https://zeal-cart.herokuapp.com/carts/${user.id}/updateQuantity`
                            : `https://zeal-cart.herokuapp.com/carts/${user.id}`,
                        data: {
                            productId: _id,
                            quantity: productQuantity,
                        },
                    });
                    dispatch({
                        type: "SET_CART",
                        payload: response.data,
                    });
                    onOpen("CART");
                } catch (err) {
                    console.log(err.response?.data.errorMessage);
                }
            };
            updateCartOnDb();
        } else {
            history.push({
                pathname: "/login",
                state: { pathAfterLogin: getPathAfterLogin() },
            });
        }
    };

    return (
        <Container type="col" width="100%" colCenter customStyles={styles}>
            <Container type="row" colCenter>
                {productWishListed ? (
                    <>
                        <Favorite
                            className="wishIconActive"
                            onClick={updateWishList}
                        />
                        <Text>Remove from wishlist</Text>
                        {getToast(
                            `${name} is added to your wish list !`,
                            "WISH_LIST"
                        )}
                    </>
                ) : (
                    <>
                        <FavoriteBorderIcon
                            className="wishIcon"
                            onClick={updateWishList}
                        />
                        <Text>Add to wishlist</Text>
                        {getToast(
                            `${name} is removed from your wish list !`,
                            "WISH_LIST"
                        )}
                    </>
                )}
            </Container>
            <Container type="row" colCenter className="cartContainer">
                {showQuantity && (
                    <Container type="col" colCenter>
                        <Text>Quantity</Text>
                        <Input
                            type="number"
                            value={productQuantity}
                            onChange={(event) =>
                                setProductQuantity(event.target.value)
                            }
                            className="quantityInput"
                            min={0}
                        />
                    </Container>
                )}
                <Container
                    type="row"
                    colCenter
                    className={`${showQuantity ? "cartActionItem" : ""}`}
                >
                    {productAddedToCart ? (
                        <>
                            <ShoppingCartIcon
                                className="addIconActive"
                                onClick={updateCart}
                            />
                            <Text>
                                {showQuantity
                                    ? "Update cart"
                                    : "Remove from cart"}
                            </Text>
                            {getToast(
                                `${name} is added to your cart !`,
                                "CART"
                            )}
                        </>
                    ) : (
                        <>
                            <AddShoppingCartIcon
                                className="addIcon"
                                onClick={updateCart}
                            />
                            <Text>
                                {showQuantity ? "Update cart" : "Add to cart"}
                            </Text>
                            {getToast(
                                `${name} is removed from your cart !`,
                                "CART"
                            )}
                        </>
                    )}
                </Container>
            </Container>
        </Container>
    );
};

export default ProductAction;
