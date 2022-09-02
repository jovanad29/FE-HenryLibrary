import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteBook, getAllBooks, setPage, setSection } from "../../actions/index.js";


//CSS
import styles from "./Book.module.css";
import { deleteFavoriteBook } from '../../actions';


export default function Book({ id, title, authors, image, price, stock, allBooks }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const section = useSelector((state) => state.section);
  const bookToCarrito = allBooks.filter( b => b.id === id )
  const [items, setItems] = useState([]);//arreglo de libros guardados en local storage
  const [item, setItem] = useState({});//objeto de libro a guardar en local storage
  const [ total, setTotal ] = useState({});//total de libros y monto total en el carrito

  const addItem = (id) => {
    const price = bookToCarrito[0].price;
    const quantity = 1;
    const title = bookToCarrito[0].title;

    const image = bookToCarrito[0].image;
    const bookToAdd = { id, price, quantity, title, image };
    alert("has guardado tu libro en el carrito")
    setItem(bookToAdd);
  }

  //traer el localstorage cuando carga el componente
  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("carritoGuest"));
    if (localItems) {
      setItems(localItems);
    } 
    const localTotal = JSON.parse(localStorage.getItem("totalGuest"));
    if (localTotal) {
      setTotal(localTotal);
    }
  }, []);

  useEffect (() => {
    if (item.id) {
      const totals = JSON.parse(localStorage.getItem("carritoTotal")) || {totalBooks: 0, totalAmount: 0};
      const itemsLS = JSON.parse(localStorage.getItem("carritoGuest")) || [];
      const itemExist = itemsLS.find((item) => item.id === id);
      if (itemExist) {
        const items = itemsLS.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
          }
          return item;
        });
        setItems(items);
        localStorage.setItem("carritoGuest", JSON.stringify(items));
      } else {
        const items = [...itemsLS, item];
        setItems(items);
        localStorage.setItem("carritoGuest", JSON.stringify(items));
      }
      totals.totalBooks += 1;
      totals.totalAmount += item.price;
      setTotal(totals);
      localStorage.setItem("carritoTotal", JSON.stringify(totals));
    }
  }, [item]);


  // function saveData(){
  //   localStorage.setItem("book", JSON.stringify(bookToCarrito))
  //                        //key , value
  //   console.log(typeof bookToCarrito)
  //   alert("has guardado tu libro en el carrito")
  // }


  useEffect(() => {
       console.log(favorites);
}, [favorites]);


  const handleOnFavorite = (id) => {
    dispatch(addFavoriteBook(id));
  };

  const handleDeleteFavorite = (id) => {
    dispatch(deleteFavoriteBook(id));
    dispatch(setSection("favoritos"));
       if (favorites.length === 1){
      dispatch(getAllBooks());
      dispatch(setPage(0));
      dispatch(setSection("home"));
    } 
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
        {
          section === "favoritos" &&  <button className={styles.icono} onClick={() => handleDeleteFavorite(id)}>
          ELIMINAR FAVORITO
        </button>
        }
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
            <button className={styles.boton} onClick={ () => addItem(id)}>Agregar al carrito</button>
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
