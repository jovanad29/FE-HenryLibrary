import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DataUser.module.css";
import {
    getUserInfo,
    updateUserAddress,
    updateUserName,
} from "../../../actions";
//CSS
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";

function DataUser(id) {
    let { email, displayName, address, uid } = useSelector((state) => state);
    const dispatch = useDispatch();

    //ESTADO DEL FORMULARIO
    const [name, setName] = useState("");

    const [direction, setDirection] = useState("");

    var [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        if (displayName) {
            setName(displayName);
        }
        if (address) {
            setDirection(address);
        }
    }, [displayName, address]);

    //ESTADO DE ERRORES
    const [errores, setErrores] = useState({});

    function handleInputsName(e) {
        // if (displayName === " ") {
        //   errores.displayName = "El campo nombre no puede estar vacio";
        // } else if (displayName === "number") {
        //   errores.displayName = "El Nombre no puede contener numeros";
        // } else if (displayName.length > 50) {
        //   errores.displayName = "El Nombre no puede superar los 50 caracteres";
        // }

        // if (address === " ") {
        //   errores.address = "El campo Direccion no puede estar vacio";
        // } else if (address.length > 70) {
        //   errores.address = "La Direccion no puede superar los 70 caracteres";
        // }

        setName(e.target.value);
    }

    function handleInputsAddress(e) {
        setDirection(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!direction || !name) {
            return Swal.fire({
                title: "Debe completar todos los datos!",
                icon: "error",
                // iconColor: "#01A86C",
                confirmButtonColor: "#01A86C",
            });
        }
        dispatch(updateUserAddress(uid, { address: direction }));
        dispatch(updateUserName(uid, { name: name }));
        dispatch(getUserInfo(uid));
        handleEdit(e);
        Swal.fire({
            title: "Perfil de usuario actualizado!",
            icon: "success",
            iconColor: "#01A86C",
            confirmButtonColor: "#01A86C",
        });
    };

    const handleOnCancel = (e) => {
        e.preventDefault();
        dispatch(getUserInfo(uid));
        setName(displayName || "");
        setDirection(address || "");
        handleEdit(e);
    };

    function handleEdit(e) {
        e.preventDefault();
        var b = document.querySelectorAll("#inputDisabled");
        for (var i = 0; i < b.length; i++) {
            b[i].disabled = !b[i].disabled;
            if (b.value) {
                b.value = " ";
            }
        }

        setIsEditable(!isEditable);
    }

    return (
        <>
            <form>
                <div className={styles.containerInputs}>
                    <p className={styles.label}>
                        Nombre:{" "}
                        <input
                            value={name}
                            name="nombre"
                            id="inputDisabled"
                            disabled
                            onChange={handleInputsName}
                            className={styles.input}
                        />
                    </p>
                    <div className={styles.danger}>
                        {errores.nombre && <p>{errores.nombre}</p>}
                    </div>
                    <p className={styles.label2}>Email: {email}</p>
                    <p className={styles.label}>
                        Direccion:{" "}
                        <input
                            value={direction}
                            name="direccion"
                            id="inputDisabled"
                            disabled
                            onChange={handleInputsAddress}
                            className={styles.input}
                        />
                    </p>
                    <div className={styles.danger}>
                        {errores.direccion && <p>{errores.direccion}</p>}
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    {!isEditable && (
                        <Button
                            w="50%"
                            h="3rem"
                            backgroundColor="#01A86C"
                            color="black"
                            onClick={handleEdit}
                            className={styles.buttonsEdit}
                        >
                            Editar
                        </Button>
                    )}
                    {isEditable && (
                        <div className={styles.containerButtons2}>
                            <Button
                                w="40%"
                                h="3rem"
                                onClick={handleOnSubmit}
                                className={styles.buttons}
                            >
                                Confirmar
                            </Button>

                            <Button
                                w="40%"
                                h="3rem"
                                onClick={handleOnCancel}
                                className={styles.buttons2}
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
}

export default DataUser;
