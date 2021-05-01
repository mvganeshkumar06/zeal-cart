import React from "react";
import {
    Container,
    Text,
    Image,
    Badge,
    useStyleContext,
    useThemeContext,
} from "@zeal-ui/core";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import { Link } from "react-router-dom";
import ProductAction from "./ProductAction";

const ProductItem = ({ details, showQuantity, onSlideShow }) => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        margin:1rem ${onSlideShow ? "2rem" : "0rem"};

		.ratingIcon{
			width: 1.25rem;
			height: 1.25rem;
			margin-left:0.25rem;
		}

		.trendingBadge {
			padding:0rem 0.25rem;
            margin:0rem;
            margin-left:1rem;
		}
		
		.description {
			font-size: 1rem;
			margin: 0.25rem 0rem;
		}
		
        .productImage{
            margin:0rem;
        }
		
        .productPrice,.productDetailsItem{
            margin:0.5rem 0rem;
        }

        .productDetailsContainer{
            margin:1.5rem 0.5rem 1rem 0.5rem;
        }

        .productImageContainer{
            background-color:${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[3]
            };
        }

		@media (min-width: 425px) {
			margin:1rem ${onSlideShow ? "2rem" : "0rem"};
		}
	
	`;

    const { _id, name, imageUrl, price, rating, trending } = details;

    return (
        <Container
            type="col"
            rowCenter={onSlideShow}
            withBorder={!onSlideShow}
            customStyles={styles}
            key={_id}
        >
            <Container
                type="col"
                rowCenter
                colCenter
                width="100%"
                height="15rem"
                className="productImageContainer"
            >
                <Link to={`/products/${_id}`}>
                    <Image
                        src={imageUrl}
                        alt="product"
                        width="auto"
                        height="auto"
                        className="productImage"
                    />
                </Link>
            </Container>
            {onSlideShow ? (
                <Link to={`/products/${_id}`}>
                    <Text className="productName">{name}</Text>
                </Link>
            ) : (
                <Container type="col" className="productDetailsContainer">
                    <Link to={`/products/${_id}`}>
                        <Text className="productName">{name}</Text>
                    </Link>

                    <Text className="productPrice">${price}</Text>
                    <Container
                        type="row"
                        colCenter
                        className="productDetailsItem"
                    >
                        <Container type="row" rowCenter colCenter>
                            {rating} <StarSharpIcon className="ratingIcon" />
                        </Container>
                        {trending && (
                            <Badge type="new" className="trendingBadge">
                                Trending
                            </Badge>
                        )}
                    </Container>
                    <ProductAction
                        _id={_id}
                        name={name}
                        showQuantity={showQuantity}
                    />
                </Container>
            )}
        </Container>
    );
};

export default ProductItem;
