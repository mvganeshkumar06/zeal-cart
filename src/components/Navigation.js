import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
    Container,
    useStyleContext,
    List,
    ListItem,
    useThemeContext,
} from "@zeal-ui/core";
import { navigationItems } from "../utils/Links";

const Navigation = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        .navigationContainer {
            width: 8rem;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            padding: 5rem 1rem;
            z-index: ${style.zIndex[3]};
            background-color:${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[3]
            };
        }
        
        .navigationOpenBtn {
            position: fixed;
            top: 0.8rem;
            left: 0.25rem;
            font-weight: bold;
            z-index: ${style.zIndex[1]};
        }
        
        .navigationCloseBtn {
            position: absolute;
            top: 1rem;
            right: 0.5rem;
            font-weight: bold;
            z-index: ${style.zIndex[1]};
        }
        
        .navigationOpenBtn:hover,
        .navigationCloseBtn:hover {
            cursor: pointer;
        }

        @media (min-width: 768px) {
            .navigationContainer {
                width: 10rem;
            }
        }
        
        @media (min-width: 1024px) {
            .navigationOpenBtn {
                display: none;
            }
        }
    
    `;

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    return (
        <Container type="col" customStyles={styles}>
            <MenuIcon
                className="navigationOpenBtn"
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}
                fontSize="large"
            />
            {isNavigationOpen && (
                <Container type="col" className="navigationContainer">
                    <HighlightOffIcon
                        className="navigationCloseBtn"
                        fontSize="large"
                        onClick={() => setIsNavigationOpen(!isNavigationOpen)}
                    />
                    <List>
                        {navigationItems.map(({ name, url }) => {
                            return (
                                <ListItem key={name}>
                                    <Link
                                        to={url}
                                        onClick={() =>
                                            setIsNavigationOpen(
                                                !isNavigationOpen
                                            )
                                        }
                                    >
                                        {name}
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                </Container>
            )}
        </Container>
    );
};

export default Navigation;
