import React, { useContext } from "react";
import { Container, Text, Grid } from "@zeal-ui/core";
import ProductContext from "../context/ProductContext";
import { ProductItem } from "../components";

const Cart = () => {
    const styles = `
        width: 100%;
        align-items: center;
        margin: 5rem 0rem;
        
        @media (min-width: 425px) {
            .cartItem {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (min-width: 768px) {
            .cartItem {
                width: 80%;
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        @media (min-width: 1024px) {
            .cartItem {
                width: 80%;
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { cart },
    } = useContext(ProductContext);
    return (
        <Container type="col" customStyles={styles}>
            <Text type="mainHeading">
                You have {cart ? cart.length : 0} items on your cart
            </Text>
            <Grid col={1} className="cartItem">
                {cart.map((product) => {
                    return <ProductItem key={product.id} details={product} />;
                })}
            </Grid>
        </Container>
    );
};

export default Cart;
