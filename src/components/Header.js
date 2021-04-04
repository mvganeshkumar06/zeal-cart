import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Header.module.css";
import ZealCartIcon from "../assets/zeal-cart.svg";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
	const { switchTheme } = useContext(ThemeContext);
	return (
		<div className={`align-items-row ${styles.container}`}>
			<div className="align-items-row">
				<a href="https://zeal-cart.netlify.app/">
					<img
						src={ZealCartIcon}
						alt="Drift UI"
						className={styles.zealCartIcon}
					/>
				</a>
				<span className={`text-bold ${styles.title}`}>Zeal Cart</span>
			</div>
			<div className={`align-items-row center ${styles.socialIcons}`}>
				<span>
					<Brightness4Icon
						className={styles.themeSwitchIcon}
						onClick={() => switchTheme()}
					/>
				</span>
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
		</div>
	);
};

export default Header;
