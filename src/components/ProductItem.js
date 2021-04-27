import React, { useContext } from "react";
import {
    Container,
    Text,
    Image,
    Badge,
    useStyleContext,
    Toast,
    useNotify,
} from "@zeal-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ProductContext from "../context/ProductContext";
import axios from "axios";
import { useHistory } from "react-router";

const ProductItem = ({ details }) => {
    const style = useStyleContext();

    const styles = `
        margin:1rem 0rem;

		.ratingIcon{
			width: 1.25rem;
			height: 1.25rem;
			margin-left:0.25rem;
		}

		.trendingBadge {
			padding:0rem 0.25rem;
		}
		
		.description {
			font-size: 1rem;
			margin: 0.25rem 0rem;
		}
		
		.wishIcon,
		.wishIconActive {
			margin:0rem 0rem;
		}
		
		.wishIconActive {
			color: ${style.colors.red[4]};
			filter: brightness(120%);
		}
		
		.wishIcon:hover,
		.wishIconActive:hover,
		.addIcon:hover,
		.addIconActive:hover {
			cursor: pointer;
		}
		
		.addIcon,.addIconActive {
			margin:0rem 1rem;
		}
		
		.addIconActive {
			color: ${style.colors.red[4]};
			filter: brightness(120%);
		}

        .productImage{
            margin:0rem;
            margin-right:1rem;
            width:auto;
            height:auto;
        }
		
        .productName{
            margin-top:0rem;
            margin-left:0rem;
        }

        .productPrice,.productDetailsItem{
            margin:0.25rem 0rem;
        }

		@media (min-width: 425px) {
			margin: 1rem 0.25rem;

			.name {
				font-size: 1rem;
			}
		}
	
	`;

    const { _id, name, imageUrl, price, rating, trending } = details;

    const {
        state: { wishList, cart, user },
        dispatch,
    } = useContext(ProductContext);

    const isProductWishListed = (id) => {
        return wishList.find((item) => item._id === id);
    };

    const isProductAddedToCart = (id) => {
        return cart.find((item) => item.product._id === id);
    };

    const productWishListed = isProductWishListed(_id);
    const productAddedToCart = isProductAddedToCart(_id);

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

    const history = useHistory();

    const updateWishList = () => {
        if (user) {
            const updateWishListOnDb = async () => {
                try {
                    const response = await axios({
                        method: "Post",
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
                    console.log(err);
                }
            };
            updateWishListOnDb();
        } else {
            history.push({
                pathname: "/login",
                state: { pathAfterLogin: "/products" },
            });
        }
    };

    const updateCart = () => {
        if (user) {
            const updateCartOnDb = async () => {
                try {
                    const response = await axios({
                        method: "Post",
                        url: `https://zeal-cart.herokuapp.com/carts/${user.id}`,
                        data: {
                            productId: _id,
                            quantity: 1,
                        },
                    });
                    dispatch({
                        type: "SET_CART",
                        payload: response.data,
                    });
                    onOpen("CART");
                } catch (err) {
                    console.log(err);
                }
            };
            updateCartOnDb();
        } else {
            history.push({
                pathname: "/login",
                state: { pathAfterLogin: "/products" },
            });
        }
    };

    return (
        <Container type="row" customStyles={styles} key={_id}>
            <Image src={imageUrl} alt="product" className="productImage" />
            <Container type="col">
                <Text className="productName">{name}</Text>
                <Text className="productPrice">${price}</Text>
                <Container type="row" colCenter className="productDetailsItem">
                    <Container type="row" rowCenter colCenter>
                        {rating} <StarSharpIcon className="ratingIcon" />
                    </Container>
                    {trending && (
                        <Badge type="new" className="trendingBadge">
                            Trending
                        </Badge>
                    )}
                </Container>
                <Container
                    type="row"
                    width="100%"
                    colCenter
                    className="productDetailsItem"
                >
                    {productWishListed ? (
                        <>
                            <Favorite
                                className="wishIconActive"
                                onClick={updateWishList}
                            />
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
                            />{" "}
                            {getToast(
                                `${name} is removed from your wish list !`,
                                "WISH_LIST"
                            )}
                        </>
                    )}
                    {productAddedToCart ? (
                        <>
                            <ShoppingCartIcon
                                className="addIconActive"
                                onClick={updateCart}
                            />
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

export default ProductItem;
