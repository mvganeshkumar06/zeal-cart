import React, { useEffect, useContext } from "react";
import {
    Container,
    Text,
    SlideShow,
    Button,
    useMediaQuery,
} from "@zeal-ui/core";
import axios from "axios";
import ProductContext from "../context/ProductContext";
import { ProductItem } from "../components";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Home = () => {
    const styles = `
        margin: 5rem 0rem 5rem 0rem;

        .displayItem{
            width:90%;
        }

        .categoryName{
            font-size:1.25rem;
        }

        .slideShowContainer{
            width:100%;
            height:auto;
        }

        .slideShowContainer .slideContainer{
            width:90%;
        }

        .slideShowContainer .slideIndicatorContainer{
            flex-wrap:wrap;
        }
    `;

    const {
        state: { products, categories },
        dispatch,
    } = useContext(ProductContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "https://zeal-cart.herokuapp.com/categories",
                });
                dispatch({
                    type: "SET_CATEGORIES",
                    payload: response.data,
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
    }, [dispatch]);

    const getSlides = (products) => {
        return products.map((productDetails) => (
            <ProductItem
                details={productDetails}
                key={productDetails._id}
                onSlideShow
            />
        ));
    };

    const trendingProducts = products.filter((product) => product.trending);

    const query = useMediaQuery([
        "(max-width:768px)",
        "(max-width:1024px)",
        "(max-width:1440px)",
        "(min-width:1440px)",
    ]);
    const isMobile = query[0];
    const isDesktop = query[1];
    const isDesktopMedium = query[2];
    const isDesktopLarge = query[3];

    const getSlidesToDisplay = () => {
        if (isMobile) {
            return 1;
        }
        if (isDesktop) {
            return 3;
        }
        if (isDesktopMedium) {
            return 4;
        }
        if (isDesktopLarge) {
            return 5;
        }
    };

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Container type="col" className="displayItem">
                <Container type="row" width="100%" rowBetween>
                    <Text type="subHeading" color="purple">
                        Shop Trending products
                    </Text>
                    <Button>Show More</Button>
                </Container>
                <Container type="col" className="slideShowContainer">
                    <SlideShow
                        slides={getSlides(trendingProducts)}
                        slidesToDisplay={getSlidesToDisplay()}
                        prev={<NavigateBeforeIcon />}
                        next={<NavigateNextIcon />}
                    />
                </Container>
            </Container>
            <Container type="col" className="displayItem">
                <Container type="row" width="100%" rowBetween>
                    <Text type="subHeading" color="purple">
                        Shop By Category
                    </Text>
                    <Button>Show more</Button>
                </Container>
                {categories.map(({ name, products }) => {
                    return (
                        <Container
                            type="col"
                            className="slideShowContainer"
                            key={name}
                        >
                            <Text className="categoryName">{name}</Text>
                            <SlideShow
                                slides={getSlides(products)}
                                slidesToDisplay={getSlidesToDisplay()}
                                prev={<NavigateBeforeIcon />}
                                next={<NavigateNextIcon />}
                            />
                        </Container>
                    );
                })}
            </Container>
        </Container>
    );
};

export default Home;
