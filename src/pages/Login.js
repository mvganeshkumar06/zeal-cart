import React, { useState, useContext } from "react";
import {
    Container,
    Alert,
    Spinner,
    Button,
    Text,
    Input,
    InputContainer,
} from "@zeal-ui/core";
import axios from "axios";
import ProductContext from "../context/ProductContext";
import { Redirect, useLocation } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Login = () => {
    const loginContainer = `
        margin-top: 5rem;

        .userNameInput, .passwordInput{
            margin:1rem 0rem;
        }

        .loginBtn{
            margin-top:3rem;
        }

        .showHideIcon{
            margin-right:0.5rem;
        }

        .showHideIcon:hover{
            cursor:pointer;
        }

    `;

    const {
        state: { user, isLoading, isError },
        dispatch,
    } = useContext(ProductContext);

    const {
        state: { pathAfterLogin },
    } = useLocation();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const authenticateUser = () => {
        const authenticate = async () => {
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
                    setUserName("");
                    setPassword("");
                    dispatch({
                        type: "SET_USER",
                        payload: response.data,
                    });
                    localStorage.setItem("user", JSON.stringify(response.data));
                } else {
                    dispatch({
                        type: "SET_IS_ERROR",
                        payload: true,
                    });
                    setTimeout(() => {
                        dispatch({
                            type: "SET_IS_ERROR",
                            payload: false,
                        });
                    }, 3000);
                }
            } catch (err) {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: true,
                });
                setTimeout(() => {
                    dispatch({
                        type: "SET_IS_ERROR",
                        payload: false,
                    });
                }, 3000);
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: false,
                });
            }
        };
        authenticate();
    };

    return (
        <Container type="col" rowCenter customStyles={loginContainer}>
            <Text type="mainHeading">Login</Text>
            {isLoading && <Spinner />}
            {isError && (
                <Alert type="danger">
                    <p>Wrong username or password, please try again</p>
                </Alert>
            )}
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    className="userNameInput"
                />
            </InputContainer>
            <InputContainer type="col">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="passwordInput"
                />
                <Container type="row" rowCenter colCenter>
                    {showPassword ? (
                        <VisibilityIcon
                            className="showHideIcon"
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <VisibilityOffIcon
                            className="showHideIcon"
                            onClick={() => setShowPassword(true)}
                        />
                    )}{" "}
                    {showPassword ? "Hide" : "Show"} password
                </Container>
            </InputContainer>
            <Button className="loginBtn" onClick={authenticateUser}>
                Login
            </Button>
            {user && <Redirect to={pathAfterLogin} />}
        </Container>
    );
};

export default Login;
