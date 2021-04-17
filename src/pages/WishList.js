import React, { useContext } from "react";
import { Container, Text, Grid } from "@zeal-ui/core";
import ProductContext from "../context/ProductContext";
import { ProductItem } from "../components";

const WishList = () => {
    const styles = `    
        width: 100%;
        align-items: center;
        margin-top: 5rem;

        @media (min-width: 425px) {
            .wishListItem {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {
            .wishListItem {
                width: 80%;
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .wishListItem {
                width: 80%;
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { wishList },
    } = useContext(ProductContext);
    return (
        <Container type="col" customStyles={styles}>
            <Text type="mainHeading">
                You have {wishList ? wishList.length : 0} items on your wishlist
            </Text>
            <Grid className="wishListItem">
                {wishList.map((product) => {
                    return <ProductItem key={product.id} details={product} />;
                })}
            </Grid>
        </Container>
    );
};

export default WishList;
