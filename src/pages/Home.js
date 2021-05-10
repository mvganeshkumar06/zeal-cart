import React, { useEffect } from "react";
import {
    Container,
    Text,
    SlideShow,
    Button,
    useMediaQuery,
    Alert,
    Spinner,
} from "@zeal-ui/core";
import axios from "axios";
import useProductContext from "../hooks/useProductContext";
import { ProductItem } from "../components";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Home = () => {
    const styles = `
        margin: 5rem 0rem 5rem 0rem;

        .feedbackContainer{
            margin-top:2rem;
        }

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

        @media(min-width:425px){
            .slideNavigationIcon{
                width:2rem;
                height:2rem;
            }
        }
    `;

    const {
        state: { products, categories, isLoading, isError },
        dispatch,
    } = useProductContext();

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
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { categoires: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { categories: false },
                });
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

    const getSlidesCount = () => {
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
            <Container
                type="row"
                rowCenter
                width="100%"
                className="feedbackContainer"
            >
                {isLoading.categories && <Spinner />}
                {isError.categories && (
                    <Alert type="danger">Error while getting products</Alert>
                )}
            </Container>
            {!isLoading.categoires && !isError.categoires && (
                <>
                    <Container type="col" className="displayItem">
                        <Container type="row" width="100%" rowBetween>
                            <Text type="subHeading" color="orange">
                                Shop Trending products
                            </Text>
                            <Button>Show More</Button>
                        </Container>
                        <Container type="col" className="slideShowContainer">
                            <SlideShow
                                slides={getSlides(trendingProducts)}
                                slidesCount={getSlidesCount()}
                                prev={
                                    <NavigateBeforeIcon className="slideNavigationIcon" />
                                }
                                next={
                                    <NavigateNextIcon className="slideNavigationIcon" />
                                }
                            />
                        </Container>
                    </Container>
                    <Container type="col" className="displayItem">
                        <Container type="row" width="100%" rowBetween>
                            <Text type="subHeading" color="orange">
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
                                    <Text className="categoryName" color="blue">
                                        {name}
                                    </Text>
                                    <SlideShow
                                        slides={getSlides(products)}
                                        slidesCount={getSlidesCount()}
                                        prev={
                                            <NavigateBeforeIcon className="slideNavigationIcon" />
                                        }
                                        next={
                                            <NavigateNextIcon className="slideNavigationIcon" />
                                        }
                                    />
                                </Container>
                            );
                        })}
                    </Container>
                </>
            )}
        </Container>
    );
};

export default Home;
