import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./AboutUs.module.css";
import NavBar from "../../NavBar/NavBar.jsx";
import NavBar2 from "../../NavBar2/NavBar2.jsx";
import Footer from "../../Footer/Footer.jsx";

//FOTOS
import alicia from "./fotos/alicia.jpg"
import hernan from "./fotos/hernan.jpg"
import pablo from "./fotos/pablo.jpg"
import flor from "./fotos/flor.jpg"
import jova from "./fotos/jova.jpg"
import gabriel from "./fotos/gabriel.jpg"
import gustavo from "./fotos/gustavo.jpg"
import felipe from "./fotos/felipe.jpg"



export default function AboutUs() {
  const { t } = useTranslation()
  return (
    <div className={styles.AboutUs}>
      <NavBar />
      <NavBar2 />

      <div className={styles.info}>
      <h2 className={styles.titulo}>{t("sobreLaLibreria")}</h2>
      <h3 className={styles.parrafo}>
        {t("txtSobreLaLibreria")}
      </h3>

      <h2 className={styles.titulo}>{t("objetivos")}</h2>
      <h3  className={styles.parrafo}>
        {t("txtObjetivos")}
      </h3>

      <h2 className={styles.titulo}>{t("compromiso")}</h2>
      <h3 className={styles.parrafo}>
        {t("txtCompromiso")}
      </h3>
      </div>


      <div><h2 className={styles.titulo}>{t("desarrolladores")}</h2></div>


      <div className={styles.creadores}>

      

      <div className={styles.contenedor}>
        <img className={styles.img} src={jova} alt="foto"/>
        <h2 className={styles.nombre}>JOVANA DAVALILLO</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      <div className={styles.contenedor}>
        <img className={styles.img} src={flor} alt="foto"/>
        <h2 className={styles.nombre}>FLORENCIA OLDANI</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      <div className={styles.contenedor}>
         <img className={styles.img} src={pablo} alt="foto"/>
        <h2 className={styles.nombre}>PABLO SZEJPIACKI</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      <div className={styles.contenedor}>
         <img className={styles.img} src={hernan} alt="foto"/>
        <h2 className={styles.nombre}>HERNAN CAMUSSO</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>
      
      <div className={styles.contenedor}>
         <img className={styles.img} src={alicia} alt="foto"/>
        <h2 className={styles.nombre}>ALICIA BENITEZ</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      <div className={styles.contenedor}>
        <img className={styles.img} src={felipe} alt="foto"/>
        <h2 className={styles.nombre}>A. FELIPE YEPES</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      <div className={styles.contenedor}>
        <img className={styles.img} src={gabriel} alt="foto"/>
        <h2 className={styles.nombre}>GABRIEL MARZIOLI</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      <div className={styles.contenedor}>
         <img className={styles.img} src={gustavo} alt="foto"/>
        <h2 className={styles.nombre}>GUSTAVO ENCINAS</h2>
        <h3 className={styles.funcion}>Full Stack Developer</h3>
      </div>

      </div>

      <Footer />
    </div>
  );
}
