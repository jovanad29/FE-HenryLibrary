import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  clearLoginError,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
  startResetPasswordEmail,
} from "../../actions";
import { useHistory } from "react-router-dom";

//CSS
import styles from "./Login.module.css";
import {
  Avatar,
  Button,
  Alert,
  AlertIcon,
  CloseButton,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { FiMail } from "react-icons/fi";
// import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { t } from "i18next";

function Login({ HandleOpenLogin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, displayName, photoURL, errorMessage, isAdmin } = useSelector(
    (state) => state
  );
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  //Estado interno para cambiar el login de ingresar a crear un nuevo usuario
  const [createUser, setCreateUser] = useState(false);

  const [login, setLogin] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAdmin) history.push("/user/admin");
  }, [isAdmin]);

  const [show, setShow] = useState(false); //Para manejar la contraseña

  const handleClick = () => setShow(!show);

  function handleChange(event) {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
    if (isAuthenticated) {
      setCreateUser(false);
      setLogin({ displayName: "", email: "", password: "" });
    }
  };

  const handleCloseSesion = () => {
    dispatch(startLogout());
    dispatch(clearCart());
    localStorage.setItem("guestCartBooks", JSON.stringify([]));
    setLogin({ displayName: "", email: "", password: "" });
    history.push("/");
  };

  const handleCreateNewUser = () => {
    setLogin({ displayName: "", email: "", password: "" });
    dispatch(clearLoginError());
    setCreateUser(true);
  };

  const handleCreateUser = () => {
    if (
      login.displayName.trim() === "" ||
      login.password.trim() === "" ||
      login.email.trim() === ""
    ) {
      dispatch(
        logout({
          ok: false,
          errorMessage: t("todosLosCampos"),
        })
      );
    } else dispatch(startCreatingUserWithEmailPassword(login));
    if (isAuthenticated) {
      setCreateUser(false);
      setLogin({ displayName: "", email: "", password: "" });
    }
  };

  const handleLoginUserPass = () => {
    dispatch(startLoginWithEmailPassword(login));
    setCreateUser(false);
    if (isAuthenticated) {
      setLogin({ displayName: "", email: "", password: "" });
    }
  };

  const handleVolver = () => {
    setCreateUser(false);
  };

  const cerrarLogin = () => {
    HandleOpenLogin();
  };

  const handleResetPassword = () => {
    if (login.email.trim() === "") {
      dispatch(
        logout({
          ok: false,
          errorMessage: t("elMail"),
        })
      );
    } else dispatch(startResetPasswordEmail(login));
  };

  const goToDashboardUser = () => {
    history.push("/dashboard/user");
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerItems}>
        <CloseButton
          className={styles.cerrar}
          size="md"
          color="#01A86C"
          onClick={cerrarLogin}
        />
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
            <Input
              className={styles.input}
              type="text"
              placeholder={t("fullname")}
              name="displayName"
              value={login.name}
              onChange={handleChange}
              focusBorderColor="#01A86C"
            />
          </div>
        )}

        {!isAuthenticated ? (
          <>
            <div>
              <FiMail
                className={
                  !createUser ? styles.iconoEmail : styles.noIconoEmail
                }
              />
              <Input
                className={styles.input}
                type="text"
                placeholder={t("correo")}
                name="email"
                value={login.email}
                focusBorderColor="#01A86C"
                onChange={handleChange}
              />
            </div>

            <div>
              <InputGroup>
                <Input
                  pr="4rem"
                  type={show ? "text" : "password"}
                  placeholder={t("contrasena")}
                  name="password"
                  focusBorderColor="#01A86C"
                  value={login.password}
                  onChange={handleChange}
                  className={styles.input}
                />
                <InputLeftElement width="4.5rem">
                  {show ? (
                    <FiEye
                      onClick={handleClick}
                      className={styles.iconoContraseña}
                    />
                  ) : (
                    <FiEyeOff
                      onClick={handleClick}
                      className={styles.iconoContraseña}
                    />
                  )}
                </InputLeftElement>
              </InputGroup>
            </div>
          </>
        ) : (
          <h3 className={styles.nombre}>{displayName}</h3>
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
                  backgroundColor="#01A86C"
                  width="200px"
                  height="2rem"
                  color="white"
                  onClick={handleCreateUser}
                >
                  {t("crearCuentaBtn")}
                </Button>
              ) : (
                <Button
                  disabled={isAuthenticating}
                  leftIcon={<FcGoogle />}
                  backgroundColor="#01A86C"
                  width="200px"
                  height="2rem"
                  color="white"
                  onClick={onGoogleSignIn}
                >
                  Google
                </Button>
              )}

              {!createUser && (
                <Button
                  disabled={isAuthenticating}
                  backgroundColor="#01A86C"
                  width="200px"
                  height="2rem"
                  color="white"
                  onClick={handleLoginUserPass}
                >
                  {t("login")}
                </Button>
              )}
            </Stack>
            <div className={styles.cuenta}>
              {!createUser ? (
                <button onClick={handleCreateNewUser}>
                  {t("nuevaCuentaBtn")}
                </button>
              ) : (
                <button onClick={handleVolver}>{t("volver")}</button>
              )}
              {!createUser && (
                <button onClick={handleResetPassword}>
                  {" "}
                  {t("olvidoContrasena")}
                  {" "}
                </button>
              )}
            </div>
          </div>
        )}
        {isAuthenticated && (
          <>
            {!isAdmin && (
              <Button
                leftIcon={<AiFillSetting />}
                w="60%"
                h="2.3rem"
                backgroundColor="#01A86C"
                variant="solid"
                marginBottom="1rem"
                color="black"
                onClick={goToDashboardUser}
              >
                {t("perfil")}
              </Button>
            )}

            <Button
              w="60%"
              h="2rem"
              backgroundColor="#E43E3E"
              color="white"
              width="200px"
              height="2rem"
              onClick={handleCloseSesion}
            >
              {t("logout")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
