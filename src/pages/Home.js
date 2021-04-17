import React from "react";
import { Container } from "@zeal-ui/core";
import createMockServer from "../server/mock-server";
createMockServer({ environment: "development" });

const Home = () => {
    const homeContainer = `
        margin-top: 5rem;
        align-items: center;
    `;

    return (
        <Container type="col" customStyles={homeContainer}>
            <h1>Home</h1>
        </Container>
    );
};

export default Home;
