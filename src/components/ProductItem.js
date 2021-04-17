import React, { useContext, useState } from "react";
import {
    Container,
    Text,
    Image,
    Badge,
    useStyleContext,
    Toast,
} from "@zeal-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ProductContext from "../context/ProductContext";

const ProductItem = ({ details }) => {
    const style = useStyleContext();

    const styles = `
        margin:1rem 0rem;
        border:1px solid ${style.colors.gray[3]};
		
		.productDetails {
			margin-top: 5%;
		}
		
		.actionsContainer {
			position: relative;
			width:100%;
			margin: 0;
		}
		
		.ratingIcon{
			width: 1.25rem;
			height: 1.25rem;
			margin:0rem 0.25rem;
		}

		.trendingBadge {
			padding:0rem 0.25rem;
		}
		
		.price {
			font-size: 1rem;
		}
		
		.description {
			font-size: 1rem;
			margin: 0.25rem 0rem;
		}
		
		.name {
			font-size: 1.25rem;
		}
		
		.wishIcon,
		.wishIconActive {
			position: absolute;
			right: 2.5rem;
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
			position: absolute;
			right: 0.5rem;
		}
		
		.addIconActive {
			color: ${style.colors.red[4]};
			filter: brightness(120%);
		}

        .productImage{
            margin:0rem;
            border-radius:0;
        }
		
		@media (min-width: 425px) {
			margin: 1rem 0.25rem;

			.name {
				font-size: 1rem;
			}
		}
	
	`;

    const {
        id,
        name,
        image,
        description,
        price,
        rating,
        isTrending,
        discount,
    } = details;

    const {
        state: { wishList, cart },
        dispatch,
    } = useContext(ProductContext);

    const isProductWishListed = (id) => {
        return wishList.find((item) => item.id === id);
    };

    const isProductAddedToCart = (id) => {
        return cart.find((item) => item.id === id);
    };

    const productWishListed = isProductWishListed(id);
    const productAddedToCart = isProductAddedToCart(id);

    const [isProductActionToastOpen, setIsProductActionToastOpen] = useState(
        ""
    );

    const getToast = (text, type) => {
        return (
            <Toast
                type="center"
                isOpen={isProductActionToastOpen === type}
                delay={1500}
                onClose={() => setIsProductActionToastOpen("")}
            >
                {text}
            </Toast>
        );
    };

    return (
        <Container type="col" rowCenter customStyles={styles} key={id}>
            <Image
                src={image}
                alt="product"
                width="100%"
                className="productImage"
            />
            <Container type="col" className="productDetails">
                <Text className="name">{name}</Text>
                <Text className="description">{description}</Text>
                <Text className="price">
                    {price} | {discount}{" "}
                </Text>
                <Container type="row" colCenter className="actionsContainer">
                    <Container
                        type="row"
                        rowCenter
                        colCenter
                        className="ratingContainer"
                    >
                        {rating} <StarSharpIcon className="ratingIcon" />
                    </Container>
                    {isTrending && (
                        <Badge type="new" className="trendingBadge">
                            Trending
                        </Badge>
                    )}
                    {productWishListed ? (
                        <>
                            <Favorite
                                className="wishIconActive"
                                onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_WISHLIST",
                                        payload: id,
                                    });
                                    setIsProductActionToastOpen("WISH_LIST");
                                }}
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
                                onClick={() => {
                                    dispatch({
                                        type: "ADD_TO_WISHLIST",
                                        payload: details,
                                    });
                                    setIsProductActionToastOpen("WISH_LIST");
                                }}
                            />
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
                                onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: id,
                                    });
                                    setIsProductActionToastOpen("CART");
                                }}
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
                                onClick={() => {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: details,
                                    });
                                    setIsProductActionToastOpen("CART");
                                }}
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
