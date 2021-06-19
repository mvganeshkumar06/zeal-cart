import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Container, useStyleContext, useThemeContext, Text, InlineCode } from "@zeal-ui/core";

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
        
        .text{
            font-size:0.95rem;
            display:flex;
            flex-direction:row;
            align-items:center;
            margin:0rem 0.25rem;
        }

        .inlineCode{
            font-size:0.85rem;
            padding:0rem 0.5rem;
        }

        .icon{
            width:1.25rem;
            height:1.25rem;
            margin:0rem 0.25rem;
        }

        .icon:hover, .zealUI:hover{
            cursor:pointer;
        }
    `;

    return (
        <Container type="row" rowCenter colCenter height="3rem" customStyles={styles}>
            <a href="https://zeal-ui.netlify.app" target="_blank" rel="noreferrer">
                <Text className="text zealUI">Powered by
                    <InlineCode color="blue" className="inlineCode">Zeal UI</InlineCode>
                </Text>
            </a>
            <Container type="row" colCenter>
                <Text className="text">Made with <FavoriteIcon className="icon" /> by <InlineCode color="blue" className="inlineCode">Ganesh Kumar </InlineCode></Text>
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
