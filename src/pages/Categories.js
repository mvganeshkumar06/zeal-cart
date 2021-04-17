import React from "react";
import { Container, Text } from "@zeal-ui/core";

const Categories = () => {
    const styles = `    
        margin-top: 5rem;
        align-items: center;
    `;

    return (
        <Container type="col" customStyles={styles}>
            <Text type="mainHeading">Categories</Text>
        </Container>
    );
};

export default Categories;
