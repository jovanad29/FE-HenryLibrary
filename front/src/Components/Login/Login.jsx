import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../actions";

//CSS
import styles from "./Login.module.css";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { FiMail, FiEyeOff, FiEye } from "react-icons/fi";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

function Login({ HandleOpenLogin }) {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    const isAuthenticating = useMemo(() => status === "checking", [status]);

    // const [login, setLogin] = useState({
    //     username: "",
    //     password: "",
    // });

    // const [show, setShow] = useState(false);

    // function handleChange(event) {
    //     setLogin({
    //         ...login,
    //         [event.target.name]: event.target.value,
    //     });
    // }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
        // HandleOpenLogin();
    };

    const handleCloseSesion = () => {
        dispatch(startLogout());
    };

    const handleCreateNewUser = () => {
        const user = {
            displayName: "Pepe Hongo",
            password: "123456",
            email: "yoyo@gmail.com"
        }
        dispatch(startCreatingUserWithEmailPassword(user));
    }

    const handleLoginUserPass = () => {
        const user = {
            password: "123456",
            email: "yoyo@gmail.com"
        }
        dispatch(startLoginWithEmailPassword(user));
    }
    

    console.log(status);

    return (
        <div className={styles.container}>
            <div className={styles.containerItems}>
                <div className={styles.img}>
                    <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                    />
                </div>

                <div>
                    <FiMail className={styles.iconoEmail} />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Nombre de usuario"
                        name="username"
                        // value={login.username}
                        // onChange={handleChange}
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
                        placeholder="Nombre de usuario"
                        name="password"
                        // value={login.password}
                        // onChange={handleChange}
                    />
                </div>

                {!isAuthenticated && (
                    // <div>
                    //     <div>
                    //         <button
                    //             disabled={isAuthenticating}
                    //             onClick={onGoogleSignIn}
                    //             className={styles.boton}
                    //         >
                    //             <FcGoogle />
                    //             <Text fontSize="md">Google</Text>
                    //         </button>
                    //     </div>
                    //     <div>
                    //         <button
                    //             disabled={isAuthenticating}
                    //             className={styles.boton}
                    //         >
                    //             Ingresar
                    //         </button>
                    //     </div>
                    //     <div className={styles.cuenta}>
                    //         <button>Crear nueva cuenta</button>
                    //         <button>Olvido la contraseña</button>
                    //     </div>
                    // </div>
                    <div>
                        <Stack direction="column" spacing={3} align="center">
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
                            <Button
                                disabled={isAuthenticating}
                                colorScheme="green"
                                width="200px"
                                height="2rem"
                            >
                                Ingresar
                            </Button>
                        </Stack>
                        <div className={styles.cuenta}>
                            <button onClick={handleCreateNewUser}>Crear nueva cuenta</button>
                            <button onClick={handleLoginUserPass}>Olvido la contraseña</button>
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
