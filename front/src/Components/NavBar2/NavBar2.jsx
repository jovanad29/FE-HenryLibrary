import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSection } from "../../actions";
import Theme from "./Theme/Theme.jsx";

//CSS
import styles from "./NavBar2.module.css";
import { FiMenu } from "react-icons/fi";
// import {BsChevronCompactDown} from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";




export default function NavBar2() {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => ({ isAdmin: state.isAdmin }));


  return (

    <>

    <nav className={styles.container}>
      <h3 className={styles.h3}>
        <NavLink to="/home" onClick={() => dispatch(setSection("home"))}>
          Libros
        </NavLink>
      </h3>

      {isAdmin === true && (
        <h3 className={styles.h3}>
          <NavLink to="/nuevoLibro">Nuevo Libro</NavLink>
        </h3>
      )}
      <h3 className={styles.h3}>
        <NavLink to="">Ofertas</NavLink>
      </h3>
      <h3 className={styles.h3}>
        <NavLink to="/aboutUs">Sobre Nosotros</NavLink>
      </h3>


    </nav>

    <Theme />
    
      {/* PARA RESPONSIVE  */}

      <Menu className={styles.containerResponsiveMenu}>
        <MenuButton as={Button} className={styles.responsiveContainer}>
          <FiMenu color='#01A86C' className={styles.responsiveBoton}/>
        </MenuButton>
        <MenuList className={styles.menuLista} zIndex={2}>
          <MenuItem className={styles.h3}><NavLink to="/home" onClick={() => dispatch(setSection("home"))}>Libros</NavLink></MenuItem>
          <MenuItem className={styles.h3}><NavLink to="/nuevoLibro">Nuevo Libro</NavLink></MenuItem>
          <MenuItem className={styles.h3}><NavLink to="">Ofertas</NavLink></MenuItem>
          <MenuItem className={styles.h3}><NavLink to="/aboutUs">Sobre Nosotros</NavLink></MenuItem>
        </MenuList>
      </Menu>

      </>
  );
}
