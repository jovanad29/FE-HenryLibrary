import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearLoginError,
    startCreatingUserWithEmailPassword,
    startGoogleSignIn,
    startLoginWithEmailPassword,
    startLogout,
} from "../../actions";

//CSS
import styles from "./Login.module.css";
import { Avatar } from "@chakra-ui/react";
import { Button, Alert, AlertIcon } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { checkearCarritoLocal } from "../../functions/carrito";

function Login({ HandleOpenLogin }) {
    const dispatch = useDispatch();
    const { status, displayName, photoURL, errorMessage } = useSelector(
        (state) => state
    );
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const [createUser, setCreateUser] = useState(false);

    const [login, setLogin] = useState({
        displayName: "",
        email: "",
        password: "",
    });

    // const [show, setShow] = useState(false);

    function handleChange(event) {
        setLogin({
            ...login,
            [event.target.name]: event.target.value,
        });
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
        if (isAuthenticated){
            setCreateUser(false);
            setLogin({ displayName: "", email: "", password: "" });
            checkearCarritoLocal();
        } 
    };

    const handleCloseSesion = () => {
        dispatch(startLogout());
        setLogin({ displayName: "", email: "", password: "" });
    };

    const handleCreateNewUser = () => {
        setLogin({ displayName: "", email: "", password: "" });
        dispatch(clearLoginError());
        setCreateUser(true);
    };

    const handleCreateUser = () => {
        // console.log({login});
        // const user = {
        //   displayName: "Pepe Hongo",
        //   password: "123456",
        //   email: "yoyo@gmail.com",
        // };
        dispatch(startCreatingUserWithEmailPassword(login));
        if (isAuthenticated){
            setCreateUser(false);
            setLogin({ displayName: "", email: "", password: "" });
        } 
    };

    const handleLoginUserPass = () => {
        dispatch(startLoginWithEmailPassword(login));
        setCreateUser(false);
        if (isAuthenticated){
            setLogin({ displayName: "", email: "", password: "" });
        }
    };

    const handleVolver = () => {
        setCreateUser(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerItems}>
                <div className={styles.img}>
                    {isAuthenticated ? (
                        <Avatar name={displayName} src={photoURL} />
                    ) : (
                        <Avatar
                            name="Sin imagen"
                            src="https://www.eleonoracardona.com/wp-content/uploads/2016/04/sin-foto.jpg"
                        />
                    )}
                </div>

                {createUser && !isAuthenticated && (
                    <div>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Nombre Completo"
                            name="displayName"
                            value={login.name}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {!isAuthenticated ? (
                    <>
                        <div>
                            <FiMail className={styles.iconoEmail} />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={login.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <MdNoEncryptionGmailerrorred
                                className={styles.iconoContraseña}
                            />

                            {/* {login.hasOwnProperty("password") && (
                        <button
                            className={styles.iconoVerContraseña}
                            onClick={() => {
                                setShow(!show);
                            }}
                            right
                        >
                            {show ? <FiEyeOff /> : <FiEye />}
                        </button>
                    )} */}
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={login.password}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                ) : (
                    <p>{displayName}</p>
                )}
                {!isAuthenticated && (
                    <div>
                        <Alert
                            fontSize="xs"
                            display={!!errorMessage ? "" : "none"}
                            status="error"
                        >
                            <AlertIcon /> {errorMessage}
                        </Alert>

                        <Stack direction="column" spacing={3} align="center">
                            {createUser ? (
                                <Button
                                    disabled={isAuthenticating}
                                    colorScheme="green"
                                    width="200px"
                                    height="2rem"
                                    onClick={handleCreateUser}
                                >
                                    CREAR
                                </Button>
                            ) : (
                                <Button
                                    disabled={isAuthenticating}
                                    leftIcon={<FcGoogle />}
                                    colorScheme="green"
                                    width="200px"
                                    height="2rem"
                                    onClick={onGoogleSignIn}
                                >
                                    Google
                                </Button>
                            )}

                            {!createUser && (
                                <Button
                                    disabled={isAuthenticating}
                                    colorScheme="green"
                                    width="200px"
                                    height="2rem"
                                    onClick={handleLoginUserPass}
                                >
                                    Ingresar
                                </Button>
                            )}
                        </Stack>
                        <div className={styles.cuenta}>
                            {!createUser ? (
                                <button onClick={handleCreateNewUser}>
                                    Crear nueva cuenta
                                </button>
                            ) : (
                                <button onClick={handleVolver}>volver</button>
                            )}
                            {!createUser && (
                                <button> Olvido la contraseña </button>
                            )}
                        </div>
                    </div>
                )}
                {isAuthenticated && (
                    <Button
                        colorScheme="pink"
                        width="200px"
                        height="2rem"
                        onClick={handleCloseSesion}
                    >
                        Cerrar Sesion
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Login;
