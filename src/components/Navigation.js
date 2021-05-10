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
import PersonIcon from "@material-ui/icons/Person";
import useProductContext from "../hooks/useProductContext";

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
            top: 1.35rem;
            left: 0.75rem;
            font-weight: bold;
            z-index: ${style.zIndex[2]};
            width:1.75rem;
            height:1.75rem;
        }
        
        .navigationCloseBtn {
            position: absolute;
            top: 1.35rem;
            right: 0.5rem;
            font-weight: bold;
            z-index: ${style.zIndex[2]};
            width:1.75rem;
            height:1.75rem;
        }
        
        .navigationOpenBtn:hover,
        .navigationCloseBtn:hover {
            cursor: pointer;
        }

        .link{
            display:flex;
            align-items:center;
            margin:0rem;
        }

        .link svg{
            width:1.5rem;
            height:1.5rem;
            margin-right:0.5rem;
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

    const {
        state: { user },
        dispatch,
    } = useProductContext();

    const logoutUser = () => {
        dispatch({ type: "SET_USER", payload: "" });
        localStorage.removeItem("user");
    };

    return (
        <Container type="col" customStyles={styles}>
            <MenuIcon
                className="navigationOpenBtn"
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}
            />
            {isNavigationOpen && (
                <Container type="col" className="navigationContainer">
                    <HighlightOffIcon
                        className="navigationCloseBtn"
                        onClick={() => setIsNavigationOpen(!isNavigationOpen)}
                    />
                    <List type="link">
                        {navigationItems.map(({ id, name, url, icon }) => {
                            return (
                                <ListItem key={id}>
                                    <Link
                                        to={url}
                                        onClick={() =>
                                            setIsNavigationOpen(
                                                !isNavigationOpen
                                            )
                                        }
                                        className="link"
                                    >
                                        {icon}
                                        {name}
                                    </Link>
                                </ListItem>
                            );
                        })}
                        <ListItem key={3}>
                            {user ? (
                                <span onClick={logoutUser} className="link">
                                    <PersonIcon />
                                    Logout
                                </span>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setIsNavigationOpen(!isNavigationOpen)
                                    }
                                    className="link"
                                >
                                    <PersonIcon />
                                    Login
                                </Link>
                            )}
                        </ListItem>
                    </List>
                </Container>
            )}
        </Container>
    );
};

export default Navigation;
