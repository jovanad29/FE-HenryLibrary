import React from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

//CSS
import styles from "./Recomendados.module.css";

function Recomendados() {
  // console.log(recomendados2)

  const allBooks  = useSelector( (state) => state.allBooks );

  const recomendados = allBooks.slice(0,10)

  return (

    <div>

    <h3 className={styles.h3}> NUESTROS RECOMENDADOS DEL MES</h3>

    <div className={styles.recomendados}>

      {recomendados.map((r) => {
        const { id, title, image } = r;

        return (
          <div className={styles.recomendadosContainer} key={id}>
            <div className={styles.recomendadosItem}>
            <Link to={`/catalog/detail/${id}`}><img className={styles.image} src={image} alt="iamgen del libro" /></Link>
            <p className={styles.title}>{title}</p>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Recomendados;
