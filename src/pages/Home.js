import React from "react";
import "../css/DriftUI.css";
import styles from "../css/Home.module.css";
import createMockServer from "../server/mock-server";

createMockServer({ environment: "development" });

const Home = () => {
    return (
        <div className={`align-items-col ${styles.homeContainer}`}>
            <h1>Home</h1>
        </div>
    );
};

export default Home;
