import React from "react";
import { Container, Text, Button } from "@zeal-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {

    const styles = `
        margin-top:8rem;
    `;

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading" color="orange">Page not found 🧐</Text>
            <Link to="/"><Button>Go back to home</Button></Link>
        </Container>
    );
};

export default NotFound;