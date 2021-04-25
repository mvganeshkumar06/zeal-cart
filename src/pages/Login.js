import React, { useState, useContext } from "react";
import { Container, Alert, Spinner, Button, Text } from "@zeal-ui/core";
import axios from "axios";
import ProductContext from "../context/ProductContext";
import { Redirect, useLocation } from "react-router-dom";

const Login = () => {
    const loginContainer = `
        margin-top: 5rem;
        align-items: center;

        .userNameInput, .passwordInput{
            margin:1rem 0rem;
        }

        .loginBtn{
            margin:0rem;
            padding:0rem;
        }

    `;

    const {
        state: { user },
        dispatch,
    } = useContext(ProductContext);

    const {
        state: { pathAfterLogin },
    } = useLocation();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const authenticateUser = () => {
        const authenticate = async () => {
            setIsLoading(true);
            try {
                const response = await axios({
                    method: "Post",
                    url: "https://zeal-cart.herokuapp.com/users/login",
                    data: {
                        userName: userName,
                        password: password,
                    },
                });
                if (response.data) {
                    dispatch({
                        type: "SET_USER",
                        payload: response.data,
                    });
                    localStorage.setItem("user", JSON.stringify(response.data));
                } else {
                    setIsError(true);
                    setTimeout(() => {
                        setIsError(false);
                    }, 3000);
                }
            } catch (err) {
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 3000);
            } finally {
                setIsLoading(false);
            }
        };
        authenticate();
    };

    return (
        <Container type="col" customStyles={loginContainer}>
            <Text>Login</Text>
            {isLoading && <Spinner />}
            {isError && (
                <Alert type="danger">
                    <p>Wrong username or password, please try again</p>
                </Alert>
            )}
            <input
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="userNameInput"
            />
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="passwordInput"
            />
            <Button className="loginBtn" onClick={authenticateUser}>
                Login
            </Button>
            {user && <Redirect to={pathAfterLogin} />}
        </Container>
    );
};

export default Login;
