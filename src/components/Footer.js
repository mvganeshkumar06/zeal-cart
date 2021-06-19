import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Container, useStyleContext, useThemeContext, Image } from "@zeal-ui/core";

const Footer = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        width: 100%;
        background-color: ${theme === "light" ? style.colors.gray[1] : style.colors.gray[3]};
        color: ${theme === "light" ? "black" : "white"};
        z-index: ${style.zIndex[2]};
        position: relative;
        bottom: 0;
        
        .icon{
            margin:0rem 0.5rem;
        }

        .icon:hover{
            cursor:pointer;
        }
    `;

    return (
        <Container type="row" rowCenter colCenter height="3rem" customStyles={styles}>
            Made with <FavoriteIcon className="icon" /> by Ganesh Kumar.
            Powered by
            <a href="https://zeal-ui.netlify.app" target="_blank" rel="noreferrer">
                <Image src="https://zeal-cart.netlify.app/assets/zeal-ui-icon.svg" alt="Zeal UI Icon" className="icon" />
            </a>.
            <a
                href="https://www.linkedin.com/in/mvganeshkumar06/"
                target="_blank"
                rel="noreferrer"
            >
                <LinkedInIcon className="icon" />
            </a>
            <a
                href="https://github.com/mvganeshkumar06"
                target="_blank"
                rel="noreferrer"
            >
                <GitHubIcon className="icon" />
            </a>
            <a
                href="https://twitter.com/mvganeshkumar06"
                target="_blank"
                rel="noreferrer"
            >
                <TwitterIcon className="icon" />
            </a>
        </Container>
    );
};

export default Footer;
