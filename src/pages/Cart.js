import React from "react";
import { Container, Text, Grid, Alert, Spinner } from "@zeal-ui/core";
import useProductContext from "../hooks/useProductContext";
import { ProductItem } from "../components";

const Cart = () => {
    const styles = `
        width: 100%;
        align-items: center;
        margin: 5rem 0rem;

        .feedbackContainer{
            margin-top:2rem;
        }
        
        @media (min-width: 425px) {
            .cartItem {
                grid-template-columns: repeat(2, 1fr);
                grid-gap:1rem 0.5rem;
            }
        }
        
        @media (min-width: 768px) {
            .cartItem {
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap:1rem;
            }
        }
        
        @media (min-width: 1024px) {
            .cartItem {
                width: 80%;
                grid-template-columns: repeat(4, 1fr);
            }
        }
        @media (min-width: 1440px) {
            .cartItem {
                grid-template-columns: repeat(5, 1fr);
            }
        }
    `;

    const {
        state: { cart, isLoading, isError },
    } = useProductContext();

    return (
        <Container type="col" customStyles={styles}>
            <Container
                type="row"
                rowCenter
                width="100%"
                className="feedbackContainer"
            >
                {isLoading.cart && <Spinner />}
                {isError.cart && (
                    <Alert type="danger">Error while getting cart</Alert>
                )}
            </Container>
            {!isLoading.cart && !isError.cart && (
                <>
                    <Text type="mainHeading">Cart</Text>
                    <Text type="subHeading">
                        You have {cart && cart.length > 0 ? cart.length : 0}{" "}
                        item(s) on your cart
                    </Text>
                    <Grid col={1} className="cartItem">
                        {cart.map(({ product }) => {
                            return (
                                <ProductItem
                                    key={product._id}
                                    details={product}
                                    showQuantity
                                />
                            );
                        })}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default Cart;
