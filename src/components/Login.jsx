import React, { useEffect } from "react";
import {
    Container,
    Alert,
    Spinner,
    Button,
    Text,
    Input,
    Toast,
    useNotify
} from "@zeal-ui/core";
import axios from "axios";
import useProductContext from "../hooks/useProductContext";
import { useLocation, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import jwtDecode from "jwt-decode";

const Login = ({ userCredentials, setUserCredentials }) => {

    const styles = `

        .input{
            margin:1rem 0rem;
        }

        .authBtn{
            margin:3rem 0rem 2rem 0rem;
        }

        .passwordIndicator{
            margin:0rem;
        }

        .passwordIndicator:hover{
            cursor:pointer;
        }

        .showHideIcon{
            margin-right:0.5rem;
        }

        .showHideIcon:hover{
            cursor:pointer;
        }

    `;


    const { name, password, showPassword } = userCredentials;

    const {
        state: { user, isLoading, isError },
        dispatch,
    } = useProductContext();

    const { isOpen, onOpen, onClose } = useNotify();

    const location = useLocation();
    const pathAfterLogin = location.state?.pathAfterLogin || "/";
    const history = useHistory();

    const authenticateUser = () => {
        const authenticate = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: "https://zeal-cart.herokuapp.com/users/login",
                    data: {
                        userName: name,
                        password: password,
                    },
                });
                setUserCredentials({
                    ...userCredentials,
                    name: "",
                    password: "",
                    showPassword: false,
                });
                const accessToken = response.data.accessToken;
                dispatch({
                    type: "SET_ACCESS_TOKEN",
                    payload: accessToken,
                });
                localStorage.setItem("user-access-token", accessToken);
                const decodedUser = jwtDecode(accessToken);
                dispatch({
                    type: "SET_USER",
                    payload: decodedUser,
                });
                onOpen("SUCCESS_TOAST");
            } catch (error) {
                console.log(error.response?.data.errorMessage);
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { authentication: error.response ? error.response.data.errorMessage : "Something went wrong" },
                });
                setTimeout(() => {
                    dispatch({
                        type: "SET_IS_ERROR",
                        payload: { authentication: undefined },
                    });
                }, 5000);
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { authentication: false },
                });
            }
        };
        if (name.length === 0 || password.length === 0) {
            dispatch({
                type: "SET_IS_ERROR",
                payload: { authentication: "Please fill all the fields" },
            });
            setTimeout(() => {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { authentication: undefined },
                });
            }, 5000);
        }
        else {
            dispatch({
                type: "SET_IS_LOADING",
                payload: { authentication: true },
            });
            authenticate();
        }
    };

    useEffect(() => {
        let timerId;
        if (isOpen === "SUCCESS_TOAST" && user) {
            timerId = setTimeout(() => {
                history.push(pathAfterLogin);
            }, 2000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [isOpen, user, history, pathAfterLogin]);

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">Login</Text>
            {isLoading.authentication && <Spinner />}
            {isError.authentication && (
                <Alert type="danger">
                    {isError.authentication}
                </Alert>
            )}
            <Toast width="auto" height="auto" color="green" type="center" isOpen={isOpen === "SUCCESS_TOAST"} onClose={onClose} delay={3000}>
                <Text>Successfully logged in, redirecting now...</Text>
            </Toast>
            <Input
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={(event) =>
                    setUserCredentials({ ...userCredentials, name: event.target.value })
                }
                className="input"
            />
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                    setUserCredentials({ ...userCredentials, password: event.target.value })
                }
                className="input"
            />
            <Container type="row" colCenter className="passwordIndicator" onClick={() => {
                if (showPassword) {
                    setUserCredentials({ ...userCredentials, showPassword: false });
                }
                else {
                    setUserCredentials({ ...userCredentials, showPassword: true });
                }
            }}>
                {showPassword ? (
                    <>
                        <VisibilityIcon
                            className="showHideIcon"
                        />
                        <Text>Hide password</Text>
                    </>
                ) : (
                    <>
                        <VisibilityOffIcon
                            className="showHideIcon"
                        />
                        <Text>Show password</Text>
                    </>
                )}
            </Container>
            <Button className="authBtn" color="blue" onClick={authenticateUser}>
                Login
            </Button>
        </Container>
    );
};

export default Login;
