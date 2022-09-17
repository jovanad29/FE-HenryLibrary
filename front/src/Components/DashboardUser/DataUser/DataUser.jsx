import React from "react";
import { useSelector } from "react-redux";
import styles from "./DataUser.module.css";

function DataUser(id) {
  let { email, displayName, address } = useSelector((state) => state);



  function handleEdit(e) {
    e.preventDefault();
    var b = document.querySelectorAll("#inputDisabled");
    for (var i = 0; i < b.length; i++) {
      b[i].disabled = !b[i].disabled;      
     if(b.value){
      b.value=""
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
              value={displayName || " "}
              name="nombre"
              id="inputDisabled"
              disabled
            />
          </p>
          <p>Email: {email}</p>
          <p>
            Direccion:
            <input
              value={address || " Ingrese una direccion"}
              name="direccion"
              id="inputDisabled"
              disabled
            />
          </p>
        </div>
        <div className={styles.containerButtons}>
          <button className={styles.buttons} onClick={handleEdit}>
            Editar
          </button>
          <button className={styles.buttons}>Guardar</button>
          <button className={styles.buttons}>Cancelar</button>
        </div>
      </form>
    </>
  );
}

export default DataUser;
