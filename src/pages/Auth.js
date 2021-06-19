import React, { useState } from "react";
import {
    Container,
    Button,
    useStyleContext,
    useThemeContext
} from "@zeal-ui/core";
import { Login, Signup } from "./index";

const Auth = () => {

    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        margin-top: 5rem;

        .authContainer{
            width:80%;
            margin-top:2rem;
            padding:0.5rem;
            border-radius:${style.common.borderRadius};
            background-color:${theme === "light" ? style.colors.gray[0] : style.colors.gray[3]};
        }

        .authNavBtn{
            margin:2rem 1rem;
        }

        .authNavBtnActive{
            background-color:${style.colors.orange[3]};
        }

        .userNameInput, .passwordInput{
            margin:1rem 0rem;
        }

        @media(min-width:768px){
            .authContainer{
                width:30rem;
            }
        }

    `;

    const [showLogin, setShowLogin] = useState(true);
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        password: "",
        showPassword: false,
        address: "",
        email: ""
    });

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Container type="col" rowCenter className="authContainer">
                <Container type="row" colCenter>
                    <Button className={`authNavBtn ${showLogin && "authNavBtnActive"}`} onClick={() => setShowLogin(true)}>Login</Button>
                    <Button className={`authNavBtn ${!showLogin && "authNavBtnActive"}`} onClick={() => setShowLogin(false)}>Signup</Button>
                </Container>
                {showLogin ? <Login userCredentials={userCredentials} setUserCredentials={setUserCredentials} /> : <Signup userCredentials={userCredentials} setUserCredentials={setUserCredentials} />}
            </Container>
        </Container>
    );
};

export default Auth;
