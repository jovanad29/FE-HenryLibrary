import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSection } from "../../actions";

import styles from "./NavBar2.module.css";

export default function NavBar2() {
  const dispatch = useDispatch();
  return (
    <nav className={styles.container}>
      <h3 className={styles.h3}>
        <NavLink to="/home" onClick={() => dispatch(setSection("home"))}>Categorias</NavLink>
      </h3>
      <h3 className={styles.h3}>
        <NavLink to="/nuevoLibro">Nuevo Libro</NavLink>
      </h3>
      <h3 className={styles.h3}>
        <NavLink to="">Ofertas</NavLink>
      </h3>
      <h3 className={styles.h3}>
        <NavLink to="/aboutUs">Sobre Nosotros</NavLink>
      </h3>
    </nav>
  );
}
