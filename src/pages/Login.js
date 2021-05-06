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

    const location = useLocation();
    const pathAfterLogin = location.state?.pathAfterLogin || "/";

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const authenticateUser = () => {
        dispatch({
            type: "SET_IS_LOADING",
            payload: { authentication: true },
        });
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
                setUserName("");
                setPassword("");
                dispatch({
                    type: "SET_USER",
                    payload: response.data,
                });
                localStorage.setItem("user", JSON.stringify(response.data));
            } catch {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { authentication: true },
                });
                setTimeout(() => {
                    dispatch({
                        type: "SET_IS_ERROR",
                        payload: { authentication: false },
                    });
                }, 3000);
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { authentication: false },
                });
            }
        };
        authenticate();
    };

    return (
        <Container type="col" rowCenter customStyles={loginContainer}>
            <Text type="mainHeading">Login</Text>
            {isLoading.authentication && <Spinner />}
            {isError.authentication && (
                <Alert type="danger">
                    Wrong username or password, please try again
                </Alert>
            )}
            {!isError.authentication && (
                <>
                    <InputContainer>
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)
                            }
                            className="userNameInput"
                        />
                    </InputContainer>
                    <InputContainer type="col">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
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
                </>
            )}
            {user && <Redirect to={pathAfterLogin} />}
        </Container>
    );
};

export default Login;
