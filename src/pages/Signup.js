import React from "react";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Signup = ({ userCredentials, setUserCredentials }) => {

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


    const { name, password, showPassword, address, email } = userCredentials;

    const {
        state: { isLoading, isError },
        dispatch,
    } = useProductContext();

    const { isOpen, onOpen, onClose } = useNotify();

    const signupUser = () => {
        const signup = async () => {
            try {
                await axios({
                    method: "post",
                    url: "https://zeal-cart.herokuapp.com/users/signup",
                    data: {
                        userName: name,
                        password,
                        contact: {
                            address,
                            email
                        }
                    },
                });
                setUserCredentials({
                    name: "",
                    password: "",
                    showPassword: false,
                    address: "",
                    email: ""
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
        if (name.length === 0 || password.length === 0 || email.length === 0 || address.length === 0) {
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
            signup();
        }
    };

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">Signup</Text>
            {isLoading.authentication && <Spinner />}
            {isError.authentication && (
                <Alert type="danger">
                    {isError.authentication}
                </Alert>
            )}
            <Toast width="auto" height="auto" color="green" type="center" isOpen={isOpen === "SUCCESS_TOAST"} onClose={onClose} delay={3000}>
                <Text>Successfully signed up, you can now login with your credentials</Text>
            </Toast>
            <Input
                type="text"
                placeholder="Create your username"
                value={name}
                onChange={(event) =>
                    setUserCredentials({ ...userCredentials, name: event.target.value })
                }
                className="input"
            />
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create your password"
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
            <Input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                    setUserCredentials({ ...userCredentials, email: event.target.value })
                }
                className="input"
            />
            <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(event) =>
                    setUserCredentials({ ...userCredentials, address: event.target.value })
                }
                className="input"
            />
            <Button className="authBtn" color="blue" onClick={signupUser}>
                Signup
            </Button>
        </Container>
    );
};

export default Signup;
