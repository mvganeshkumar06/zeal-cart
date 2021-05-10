import React, { useEffect } from "react";
import {
    Container,
    Text,
    List,
    ListItem,
    Image,
    Divider,
    Spinner,
    Badge,
    Alert,
    useStyleContext,
    useThemeContext,
} from "@zeal-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import ProductAction from "../components/ProductAction";
import useProductContext from "../hooks/useProductContext";

const Product = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        margin:5rem 1.5rem;
        
        .feedbackContainer{
            margin-top:2rem;
        }

        .productImageContainer{
            background-color:${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[3]
            };
            margin: 1.5rem 1rem 2rem 0rem;
            border-radius:0.25rem;
            padding:1rem;
            box-sizing:border-box;
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
        }

        @media(min-width:1024px){
            .productContainer{
                width:60%;
            }
        }

    `;

    const { productId } = useParams();

    const {
        state: { product, isLoading, isError },
        dispatch,
    } = useProductContext();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-cart.herokuapp.com/products/${productId}`,
                });
                dispatch({ type: "SET_PRODUCT", payload: response.data });
            } catch (err) {
                console.log(err);
                dispatch({ type: "SET_IS_ERROR", payload: { product: true } });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { product: false },
                });
            }
        };

        fetchProductDetails();
    }, [dispatch, productId]);

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Container
                type="row"
                rowCenter
                width="100%"
                className="feedbackContainer"
            >
                {isLoading.product && <Spinner />}
                {isError.product && (
                    <Alert type="danger">Error while getting product</Alert>
                )}
            </Container>
            {!isLoading.product && !isError.product && (
                <Container type="col" rowCenter className="productContainer">
                    <Container
                        type="col"
                        width="15rem"
                        height="15rem"
                        rowCenter
                        colCenter
                        className="productImageContainer"
                    >
                        <Image
                            src={product.imageUrl}
                            alt="product"
                            width="auto"
                            height="auto"
                            className="productImage"
                        />
                    </Container>
                    <Container type="col" colCenter className="productDetails">
                        <Text type="mainHeading">{product.name}</Text>
                        <Divider />
                        <Text>{product.category.ame}</Text>
                        <Text>${product.price}</Text>
                        <Container type="row" colCenter>
                            <Container type="row" colCenter>
                                <Text>{product.rating}</Text>
                                <StarSharpIcon className="ratingIcon" />
                            </Container>
                            {product.trending && (
                                <Badge type="new" className="trendingBadge">
                                    Trending
                                </Badge>
                            )}
                        </Container>
                        <br />
                        {product.description && (
                            <>
                                <Text type="subHeading">Description</Text>
                                <Text className="productDescription">
                                    {product.description}
                                </Text>
                            </>
                        )}
                        <Text type="subHeading">Features</Text>
                        <List>
                            {product.features.map((feature) => (
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
                                name={product.name}
                                showQuantity
                            />
                        </Container>
                    </Container>
                </Container>
            )}
        </Container>
    );
};

export default Product;
