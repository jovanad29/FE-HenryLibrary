import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksId, deleteBookDetail, deleteLogicBook } from "../../actions";
import { Link, useParams } from "react-router-dom";

//COMPONENTES
import NavBar from "../NavBar/NavBar";
import NavBar2 from "../NavBar2/NavBar2";
import Footer from "../Footer/Footer";
import EditBook from "../EditBook/EditBook";

//CSS
import styles from "./BookDetail.module.css";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Button, Stack } from "@chakra-ui/react";

export default function BookDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const bookDetail = useSelector((state) => state.bookDetail);

  const [isActive, setIsActive] = useState(true);

  const [modal, setModal] = useState(false);
  const [guestCartBooks, setGuestCartBooks] = useState([]);//arreglo de libros guardados en local storage
  const [guestBook, setGuestBook ] = useState({});//objeto de libro a guardar en local storage
  const [ total, setTotal ] = useState({});//total de libros y monto total en el carrito

  useEffect(() => {
    dispatch(getBooksId(id));

    // console.log("el componente se monto");

    return () => {
      dispatch(deleteBookDetail(id));
      // console.log("el componente se desmonto");
      //TENGO QUE DESMONTAR EL COMPONENTE SINO ME QUEDA AHI COLGADO
    };
  }, [dispatch, id]);

  useEffect(() => {
    setIsActive(bookDetail.isActive);
  }, [bookDetail.isActive]);

  function handleClickDeleteLogic(id) {
    dispatch(deleteLogicBook(id));
    dispatch(getBooksId(id));
  }

  // function handleClickCarrito() {
  //   // console.log("agregado");
  // }
  const addItem = (id) => {
    id = bookDetail.id;
    const price = bookDetail.price;
    const quantity = 1;
    const title = bookDetail.title;
    const image = bookDetail.image;
    const bookToAdd = { id, price, quantity, title, image };
    alert("has guardado tu libro en el carrito")
    console.log("bookToAdd desde bookdetail", bookToAdd)
    setGuestBook(bookToAdd);
  }

//traer el localstorage cuando carga el componente
useEffect(() => {
  const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
  if (localItems) {
    setGuestCartBooks(localItems);
  } 
  const localTotal = JSON.parse(localStorage.getItem("total"));
  if (localTotal) {
    setTotal(localTotal);
  }
}, []);

useEffect (() => {
  if (guestBook.id) {
    const totals = JSON.parse(localStorage.getItem("total")) || {totalBooks: 0, totalAmount: 0};
    const itemsLS = JSON.parse(localStorage.getItem("guestCartBooks")) || [];
    const itemExist = itemsLS.find((item) => item.id === bookDetail.id);
    if (itemExist) {
      const items = itemsLS.map((item) => {
        if (item.id === bookDetail.id) {
          item.quantity += 1;
        }
        return item;
      });
      setGuestCartBooks(items);
      console.log("items desde books", items)
      localStorage.setItem("guestCartBooks", JSON.stringify(items));
    } else {
      const items = [...itemsLS, guestBook];
      setGuestCartBooks(items);
      localStorage.setItem("guestCartBooks", JSON.stringify(items));
    }
    totals.totalBooks += 1;
    totals.totalAmount += guestBook.price;
    setTotal(totals);
    localStorage.setItem("total", JSON.stringify(totals));
  }
}, [guestBook]);



  function handleClickModal() {
    setModal(!modal);
  }

  console.log(bookDetail);
  

  const arrAuthores = bookDetail.authors && bookDetail.authors.map(a => {
  return <Link to={`/catalog/author/${a.id}`} className={styles.active} key={a.id}>{a.name},  </Link>
   
 })

 const arrCategories = bookDetail.categories && bookDetail.categories.map(a => {
  return `${a.name}, ` 
   
 })



  return (
    <div className={styles.detail}>
      <NavBar />
      <NavBar2 />

      <div className={styles.container}>
        <div className={styles.containerItems}>
          <div>
            <img
              className={styles.img1}
              src={bookDetail.image}
              alt="imagen del libro"
            />
          </div>

          <div className={styles.img}>
            <img
              className={styles.img2}
              src={bookDetail.image}
              alt="imagen del libro"
            />
            <img
              className={styles.img2}
              src={bookDetail.image}
              alt="imagen del libro"
            />
            <img
              className={styles.img2}
              src={bookDetail.image}
              alt="imagen del libro"
            />
          </div>
        </div>

        <div className={styles.conteiner2}>
          <div className={styles.info}>
            <h2 className={styles.title}>{bookDetail.title}</h2>

            <h2 className={styles.datos}>
                  Genero: {arrCategories}
            </h2>

            <h4 className={styles.datos}>
            Autores: {arrAuthores}
            </h4>

            <h4 className={styles.datos}>
              Editorial: {bookDetail.publisher && bookDetail.publisher.name}
            </h4>
            <h4 className={styles.datos}>
              Fecha de Publicacion: {bookDetail.publishedDate}
            </h4>
            <h2 className={styles.datos}>
              Numero de paginas: {bookDetail.pageCount}
            </h2>
            <h4 className={styles.datos}>Rating: {bookDetail.rating} puntos</h4>
            <h4 className={styles.description}>{bookDetail.description}</h4>
          </div>

          <div className={styles.compra}>
            <div className={styles.compra1}>
              <h2 className={styles.precio}>$ {bookDetail.price}</h2>

              <div className={styles.stockItems}>
                <h6 className={styles.stock}>Stock:</h6>
                <h6 className={styles.NumeroStock}>
                  {bookDetail.currentStock}
                </h6>
              </div>
            </div>

            <div className={styles.botones}>

              <div className={styles.carrito}>
                <Stack direction="row" spacing={10}>
                  <Button
                    rightIcon={<RiShoppingCart2Fill />}
                    colorScheme="#01A86C"
                    variant="solid"
                    height= "60px"
                    className={
                        bookDetail.currentStock > 0
                          ? styles.boton
                          : styles.boton + " " + styles.botonDisabled
                      }
                      disabled={bookDetail.currentStock === 0}
                      onClick={() => addItem(id)}
                  >
                    Agregar al carrito
                  </Button>
                </Stack>
              </div>

              <div className={styles.borrados}>
                <button
                  onClick={() => {
                    handleClickDeleteLogic(bookDetail.id);
                  }}
                  className={
                    isActive
                      ? styles.botonBorradoLogico
                      : styles.botonBorradoLogico +
                        " " +
                        styles.botonBorradoLogicoDes
                  }
                >
                  {isActive ? "ACTIVO" : "BORRADO"}
                </button>

                <button className={styles.editar} onClick={handleClickModal}>
                  EDITAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recomendados}>REVIEWS</div>

      <div className={styles.recomendados}>ACA VAN NUESTROS RECOMENDADOS </div>

      <Footer />

      {modal && <EditBook bookDetail={bookDetail} setModal={setModal} />}
    </div>
  );
}
