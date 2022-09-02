import React, { useState } from "react";

//CSS
import styles from "./Login.module.css";
import { Avatar } from "@chakra-ui/react";
import { FiMail, FiEyeOff, FiEye } from "react-icons/fi";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { startGoogleSignIn, startLogout } from "../../actions";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useEffect } from "react";

function Login({HandleOpenLogin}) {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state);
    const isAuthenticating = useMemo(() => status !== "authenticated", [status])
    

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
        HandleOpenLogin();
    };

    const handleCloseSesion = () => {
      dispatch(startLogout());
    }

    console.log(status, isAuthenticating);

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

                {isAuthenticating && (
                    <div>
                        <div>
                            <button onClick={onGoogleSignIn} className={styles.boton}>
                                Login with <FcGoogle />
                            </button>
                        </div>
                        <div>
                            <button className={styles.boton}>Ingresar</button>
                        </div>
                        <div className={styles.cuenta}>
                            <button>Crear nueva cuenta</button>
                            <button>Olvido la contraseña</button>
                        </div>
                    </div>
                )}
                { !isAuthenticating && 
                  <button onClick={handleCloseSesion} className={styles.boton}>Cerrar Sesion</button>
                }
            </div>
        </div>
    );
}

export default Login;
