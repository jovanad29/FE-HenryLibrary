import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

//CSS
import styles from "./ShoppingBook.module.css";
import { Button } from "@chakra-ui/react";





function ShoppingBook() {


  const [items, setItems] = useState([]);
  const [ total, setTotal ] = useState({});//total de libros y monto total en el carrito



  // useEffect(() => {
  //   const item = JSON.parse(localStorage.getItem("book"));
  //   if (item) {
  //     setItems(item);
  //   }
  // }, []);
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

  function deleteData(){
    localStorage.removeItem("book")
  }




  const item = items.map( b => {
    const {id, title, image, quanty, price} = b
    return (

        <div key={id}>
            <img src={image} alt="" />
            <h3>{title}</h3>
            <h2>{id}</h2>
            <h2>{quanty}</h2>
            <h2>{price}</h2>
            <button onClick={deleteData}>X</button>

        </div>
    
        )
})
  const totalBooks = total.totalBooks;
  const totalAmount = total.totalAmount;

  return (
    <div className={styles.shopping}>
      <NavBar />
      <NavBar2 />

      <div className={styles.container}>
        <div className={styles.containerItems}>
          <h3 className={styles.items}>N° Items,{totalBooks}</h3>
         </div>

        <h3 className={styles.continuarComprando}>
          <Link to="/home">Continuar Comprando</Link>
        </h3>

        <div className={styles.productos}>
            {/* <h2>{id}</h2>
            <h2>{title}</h2> */}
            <div>{item}</div>
     

        </div>

        <div className={styles.button}>
          <Button
            className={styles.comprar}
            colorScheme="#01A86C"
            variant="solid"
            height="50px"
            size="lg"
          >
            COMPRAR
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShoppingBook;
