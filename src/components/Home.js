import React from "react";
import "../css/DriftUI.css";
// import styles from "./css/Home.module.css";
import Navigation from "./Navigation";
import Header from "./Header";
import createMockServer from "../server/mock-server";

createMockServer({ environment: "development" });

const Home = () => {
	return (
		<div className={`align-items-col`}>
			<Header />
			<Navigation />
		</div>
	);
};

export default Home;
