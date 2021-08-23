import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Container, useStyleContext, useThemeContext, Text } from "@zeal-ui/core";

const Footer = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        width: 100%;
        height:4rem;
        background-color: ${theme === "light" ? "white" : style.colors.gray[3]};
        box-shadow:${style.common.boxShadow[1]};
        margin-top: auto;
        
        .text{
            font-size:0.95rem;
            display:flex;
            flex-direction:row;
            align-items:center;
            margin:0rem 0.25rem;
        }

        .icon{
            width:1.25rem;
            height:1.25rem;
            margin:0rem 0.25rem;
        }

        .icon:hover, .zealUI:hover{
            cursor:pointer;
        }

        @media(min-width:478px){
            flex-direction:row;
            height:3rem;
        }
    `;

    return (
        <Container type="col" rowCenter colCenter height="3rem" customStyles={styles}>
            <a href="https://zeal-ui.netlify.app" target="_blank" rel="noreferrer">
                <Text className="text zealUI">Powered by Zeal UI.</Text>
            </a>
            <Container type="row" colCenter>
                <Text className="text">Made with <FavoriteIcon className="icon" /> by Ganesh Kumar</Text>
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
        </Container>
    );
};

export default Footer;
