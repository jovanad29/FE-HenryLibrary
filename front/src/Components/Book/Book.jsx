import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

//CSS
import styles from "./Book.module.css";



export default function Book({ id, title, authors, image, price, stock, allBooks }) {

  const bookToCarrito = allBooks.filter( b => b.id === id )

  // console.log("bookToCarrito", bookToCarrito)

  function saveData(){
    localStorage.setItem("book", JSON.stringify(bookToCarrito))
                         //key , value
    console.log(typeof bookToCarrito)
    alert("has guardado tu libro en el carrito")
  }






  return (
    <div className={styles.book}>

      {/* ACA VA FAVORITOS */}
      <div className={styles.imagenes}>
      <button className={styles.icono} >AGREGAR A FAVORITOS</button> 
      {/* onClick={""} */}

      <NavLink to={`/catalog/detail/${id}`}>
        <img className={styles.img} src={image} alt="imagenDelLibro" />
      </NavLink>

      </div>

      <p className={styles.title}>{title}</p>
      <h4 className={styles.authors}>{authors && authors.map(a => `Autor: ${a.name}`)}</h4>

      <div className={styles.conteiner}>
        <div className={styles.info}>
          <h4 className={styles.precio}>$ {price}</h4>
        </div>

        {/* Renderizado condicional verificando si hay stock disponible */}
        {stock > 0 ? (
          <div className={styles.pago}>
            <button className={styles.boton} onClick={saveData}>Agregar al carrito</button>
          </div>
        ) : (
          <div>
            <button className={styles.boton} disabled={true}>
              Sin stock
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
