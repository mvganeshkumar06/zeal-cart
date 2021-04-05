import React from "react";
import "../css/DriftUI.css";
import styles from "../css/Footer.module.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

const Footer = () => {
	return (
		<div className={`align-items-row center ${styles.container}`}>
			<a
				href="https://www.linkedin.com/in/mvganeshkumar06/"
				target="_blank"
				rel="noreferrer"
			>
				<LinkedInIcon className={styles.socialIcon} />
			</a>
			<a
				href="https://github.com/mvganeshkumar06"
				target="_blank"
				rel="noreferrer"
			>
				<GitHubIcon className={styles.socialIcon} />
			</a>
			<a
				href="https://twitter.com/mvganeshkumar06"
				target="_blank"
				rel="noreferrer"
			>
				<TwitterIcon className={styles.socialIcon} />
			</a>
		</div>
	);
};

export default Footer;
