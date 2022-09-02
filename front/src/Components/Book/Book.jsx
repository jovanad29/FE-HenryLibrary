import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteBook } from "../../actions/index.js";
//CSS
import styles from "./Book.module.css";


export default function Book({ id, title, authors, image, price, stock, allBooks }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const bookToCarrito = allBooks.filter( b => b.id === id )
  // console.log("bookToCarrito", bookToCarrito)
  function saveData(){
    localStorage.setItem("book", JSON.stringify(bookToCarrito))
                         //key , value
    console.log(typeof bookToCarrito)
    alert("has guardado tu libro en el carrito")
  }


  useEffect(() => {
       console.log(favorites);
}, [favorites]);


  const handleOnFavorite = (id) => {
    dispatch(addFavoriteBook(id));
  };

  const isFavorite = favorites?.filter((f) => f === id);

  return (
    <div className={styles.book}>
      <div className={styles.imagenes}>
        {isFavorite?.length === 0 && (
          <button className={styles.icono} onClick={() => handleOnFavorite(id)}>
            AGREGAR A FAVORITOS
          </button>
        )}
        <NavLink to={`/catalog/detail/${id}`}>
          <img className={styles.img} src={image} alt="imagenDelLibro" />
        </NavLink>
      </div>

      <p className={styles.title}>{title}</p>
      <h4 className={styles.authors}>
        {authors && authors.map((a) => `Autor: ${a.name}`)}
      </h4>

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
