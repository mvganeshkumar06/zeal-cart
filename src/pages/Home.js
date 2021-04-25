import React from "react";
import { Container, Text } from "@zeal-ui/core";

const Home = () => {
    const homeContainer = `
        margin-top: 5rem;
        align-items: center;
    `;

    return (
        <Container type="col" customStyles={homeContainer}>
            <Text type="mainHeading">Home</Text>
        </Container>
    );
};

export default Home;
