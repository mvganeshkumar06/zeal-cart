import React, { useState, useEffect } from "react";
import {
    Container,
    Text,
    List,
    ListItem,
    Image,
    Divider,
    Spinner,
    Badge,
} from "@zeal-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import ProductAction from "../components/ProductAction";

const Product = () => {
    const styles = `
        margin:5rem 1.5rem;
        
        .productImageContainer{
            background-color:white;
            margin: 1.5rem 1rem 2rem 0rem;
        }
        
        .ratingIcon{
            width:1.25rem;
            height:1.25rem;
            margin-left:0.25rem;
        }

		.trendingBadge {
			padding:0rem 0.25rem;
            margin:0rem;
            margin-left:1rem;
		}

        .productDescription{
            margin-bottom: 2rem;
        }

        @media(min-width:425px){
            .productContainer{
                width:75%;
            }
        }

        @media(min-width:768px){
            .productContainer{
                flex-direction:row;
                align-items:flex-start;
            }

            .productImageContainer{
                margin:1.5rem 5rem 0rem 0rem;
            }
            
            .productImage{
                width:15rem;
                height:auto;
            }
        }

        @media(min-width:1024px){
            .productContainer{
                width:60%;
            }
        }

    `;

    const { productId } = useParams();

    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-cart.herokuapp.com/products/${productId}`,
                });
                setProduct(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (isLoading) {
        return (
            <Container type="col" rowCenter customStyles={styles}>
                <Spinner />
            </Container>
        );
    }

    const {
        category: { name: categoryName },
        description,
        features,
        imageUrl,
        name,
        price,
        rating,
        trending,
    } = product;

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Container type="col" rowCenter className="productContainer">
                <Container type="col" className="productImageContainer">
                    <Image
                        src={imageUrl}
                        alt="product"
                        className="productImage"
                    />
                </Container>
                <Container type="col" colCenter className="productDetails">
                    <Text type="mainHeading">{name}</Text>
                    <Divider />
                    <Text>{categoryName}</Text>
                    <Text>${price}</Text>
                    <Container type="row" colCenter>
                        <Container type="row" colCenter>
                            <Text>{rating}</Text>
                            <StarSharpIcon className="ratingIcon" />
                        </Container>
                        {trending && (
                            <Badge type="new" className="trendingBadge">
                                Trending
                            </Badge>
                        )}
                    </Container>
                    <br />
                    {description && (
                        <>
                            <Text type="subHeading">Description</Text>
                            <Text className="productDescription">
                                {description}
                            </Text>
                        </>
                    )}
                    <Text type="subHeading">Features</Text>
                    <List>
                        {features.map((feature) => (
                            <ListItem key={feature}>{feature}</ListItem>
                        ))}
                    </List>
                    <Container
                        type="row"
                        width="100%"
                        colCenter
                        className="productActionContainer"
                    >
                        <ProductAction
                            _id={productId}
                            name={name}
                            showQuantity
                        />
                    </Container>
                </Container>
            </Container>
        </Container>
    );
};

export default Product;
