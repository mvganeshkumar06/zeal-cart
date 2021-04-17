import React from "react";
import { Link } from "react-router-dom";
import { Container, useStyleContext } from "@zeal-ui/core";
import { navigationItems } from "../utils/Links";

const NavigationDesktop = () => {
    const style = useStyleContext();

    const styles = `    
        display: none;
        @media (min-width: 1024px) {
            display: flex;
            position: fixed;
            top: 1.25rem;
            left: 15rem;
            z-index: ${style.zIndex[2]};
            width: 25rem;
            justify-content: space-evenly;
            font-weight: bold;
        }    
    `;

    return (
        <Container type="row" customStyles={styles}>
            {navigationItems.map(({ name, url }) => {
                return (
                    <Link to={url} key={name}>
                        {name}
                    </Link>
                );
            })}
        </Container>
    );
};

export default NavigationDesktop;
