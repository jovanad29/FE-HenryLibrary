import React  from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     startCreatingUserWithEmailPassword,
//     startLoginWithEmailPassword,
// } from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

//IMAGENES PARA CARRETE DE PUBLICIDAD
import ImagenesSlide from "./Carrusel/ImagenesSlide";
import { Imagenes } from "./Carrusel/Imagenes.js";

//CSS
import styles from "./landingPage.module.css";
import Recomendados from "../Recomendados/Recomendados.jsx";

export default function LandingPage() {
    



    

    return (
        <div className={styles.LandingPage}>
            <NavBar />
            <NavBar2 />

            <div className={styles.carrusel}>
                <ImagenesSlide slides={Imagenes} />
            </div>

            <div className={styles.recomendados}>

                <div className={styles.recomendadosCards}>
                   <Recomendados />
                </div>
            </div>

            <Footer />
        </div>
    );
}
