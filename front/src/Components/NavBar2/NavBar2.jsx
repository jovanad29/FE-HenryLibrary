import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSection } from "../../actions";
import Theme from "./Theme/Theme.jsx";

//CSS
import styles from "./NavBar2.module.css";






export default function NavBar2() {

  const dispatch = useDispatch();
  const {isAdmin } = useSelector((state) => ({isAdmin: state.isAdmin}));



  return (

    <nav className={styles.container}>
      <h3 className={styles.h3}>
        <NavLink to="/home" onClick={() => dispatch(setSection("home"))}>Libros</NavLink>
      </h3>

      {isAdmin === true && <h3 className={styles.h3}>
        <NavLink to="/nuevoLibro">Nuevo Libro</NavLink>
      </h3>
      }
      <h3 className={styles.h3}>
        <NavLink to="">Ofertas</NavLink>
      </h3>
      <h3 className={styles.h3}>
        <NavLink to="/aboutUs">Sobre Nosotros</NavLink>
      </h3>

      <Theme />

    </nav>
  );
}
