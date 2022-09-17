import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DataUser.module.css";
import { updateUserAddress, updateUserName } from '../../../actions';


function DataUser(id) {
  let { email, displayName, address, uid } = useSelector((state) => state);
  const dispatch = useDispatch();

  //ESTADO DEL FORMULARIO
  const [name, setName] = useState("");

  const [direction, setDirection] = useState("");


useEffect(() => {
  if(displayName ){
    setName(displayName)
  }
  if(address ){    
    setDirection(address)
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

    setName(e.target.value)

  }


  function handleInputsAddress(e) {
    setDirection(e.target.value)
  }


  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAddress(uid, {address: direction}));
    
    dispatch(updateUserName(uid, {name: name}));  
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
  }

  return (
    <>
      <form>
        <div className={styles.containerInputs}>
          <p>
            Nombre:{" "}
            <input
              value={name}
              name="nombre"
              id="inputDisabled"
              disabled
              onChange={handleInputsName}
            />
          </p>
          <div className={styles.danger}>
            {errores.nombre && <p>{errores.nombre}</p>}
          </div>
          <p>Email: {email}</p>
          <p>
            Direccion:
            <input
              value={direction}
              name="direccion"
              id="inputDisabled"
              disabled
              onChange={handleInputsAddress}
            />
          </p>
          <div className={styles.danger}>
            {errores.direccion && <p>{errores.direccion}</p>}
          </div>
        </div>
        <div className={styles.containerButtons}>
          <button className={styles.buttons} onClick={handleEdit}>
            Editar
          </button>
          <button className={styles.buttons} onClick={handleOnSubmit}>
            Guardar
          </button>
          <button className={styles.buttons}>Cancelar</button>
        </div>
      </form>
    </>
  );
}

export default DataUser;
