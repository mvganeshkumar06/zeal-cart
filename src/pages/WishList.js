import React, { useState, useEffect, useContext } from "react";
import { Container, Text, Grid, Spinner } from "@zeal-ui/core";
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
                grid-gap:1rem 0.5rem;
            }
        }

        @media (min-width: 768px) {
            .wishListItem {
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap:1rem;
            }
        }

        @media (min-width: 1024px) {
            .wishListItem {
                width: 80%;
                grid-template-columns: repeat(4, 1fr);
            }
        }
        @media (min-width: 1440px) {
            .wishListItem {
                grid-template-columns: repeat(5, 1fr);
            }
        }
    `;

    const {
        state: { wishList },
    } = useContext(ProductContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <Container type="col" customStyles={styles}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Text type="mainHeading">WishList</Text>
                    <Text type="subHeading">
                        You have{" "}
                        {wishList && wishList.length > 0 ? wishList.length : 0}{" "}
                        item(s) on your wishlist
                    </Text>
                    <Grid className="wishListItem">
                        {wishList.map((product) => {
                            return (
                                <ProductItem
                                    key={product._id}
                                    details={product}
                                />
                            );
                        })}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default WishList;
