import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Container, useStyleContext, useThemeContext } from "@zeal-ui/core";

const Footer = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        width: 100%;
        height: 3rem;
        background-color: ${theme === "light" ? "white" : style.colors.gray[4]};
        color: ${theme === "light" ? "black" : "white"};
        border-top: 1px solid  ${theme === "light" ? "black" : "white"}};
        z-index: ${style.zIndex[1]};
        
        .socialIcon{
            margin: 0rem 0.5rem;
        }
        .socialIcon:hover{
            cursor:pointer;
        }
    `;

    return (
        <Container type="row" rowCenter colCenter customStyles={styles}>
            <a
                href="https://www.linkedin.com/in/mvganeshkumar06/"
                target="_blank"
                rel="noreferrer"
            >
                <LinkedInIcon className="socialIcon" />
            </a>
            <a
                href="https://github.com/mvganeshkumar06"
                target="_blank"
                rel="noreferrer"
            >
                <GitHubIcon className="socialIcon" />
            </a>
            <a
                href="https://twitter.com/mvganeshkumar06"
                target="_blank"
                rel="noreferrer"
            >
                <TwitterIcon className="socialIcon" />
            </a>
        </Container>
    );
};

export default Footer;
