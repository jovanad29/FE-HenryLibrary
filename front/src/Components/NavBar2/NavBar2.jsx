import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSection } from "../../actions";


//CSS
import styles from "./NavBar2.module.css";
// import { Switch } from '@chakra-ui/react'
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from "react-icons/md";



export default function NavBar2() {
  const dispatch = useDispatch();
  const {isAdmin } = useSelector((state) => ({isAdmin: state.isAdmin}));

  let themeSaved = window.localStorage.getItem("theme");

  const [theme, setTheme] = useState(themeSaved || "light");

  const handleToggleTheme = () => {
    window.localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    setTheme(theme === "dark" ? "light" : "dark");
    document.body.classList.toggle("dark");
  };

  if (theme === "dark") document.body.classList.add("dark");



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
      <button onClick={handleToggleTheme} className={styles.btnLightDark}>
                {
                    theme === "light"
                    ? <BsFillSunFill size="1.5rem" color="#01A86C"/>
                    : <MdDarkMode size="1.5rem" color="#01A86C"/>
                    
                }
      </button>
    </nav>
  );
}
