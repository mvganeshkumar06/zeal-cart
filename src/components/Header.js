import React from "react";
import "../css/DriftUI.css";
import styles from "../css/Header.module.css";
import ZealCartIcon from "../assets/zeal-cart.svg";
import LinkedinIcon from "../assets/linkedin.svg";
import GithubIcon from "../assets/github.svg";
import TwitterIcon from "../assets/twitter.svg";

const Header = () => {
	return (
		<div className={`align-items-row ${styles.container}`}>
			<div className="align-items-row">
				<a href="https://zeal-stream.netlify.app/">
					<img
						src={ZealCartIcon}
						alt="Drift UI"
						className={styles.zealCartIcon}
					/>
				</a>
				<span className={`text-bold ${styles.title}`}>Zeal Cart</span>
			</div>
			<p className={`align-items-row center ${styles.socialIcons}`}>
				<a
					href="https://www.linkedin.com/in/mvganeshkumar06/"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src={LinkedinIcon}
						alt="Linkedin"
						className={styles.iconSmall}
					/>
				</a>
				<a
					href="https://github.com/mvganeshkumar06"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src={GithubIcon}
						alt="Github"
						className={styles.iconSmall}
					/>
				</a>
				<a
					href="https://twitter.com/mvganeshkumar06"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src={TwitterIcon}
						alt="Twitter"
						className={styles.iconSmall}
					/>
				</a>
			</p>
		</div>
	);
};

export default Header;
