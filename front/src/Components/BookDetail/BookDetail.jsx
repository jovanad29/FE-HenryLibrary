import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksId, deleteBookDetail, deleteLogicBook, addCartItem, discountCurrentStock, setBookDetailCurrentStock } from "../../actions";
import { Link, useParams } from "react-router-dom";

//COMPONENTES
import NavBar from "../NavBar/NavBar";
import NavBar2 from "../NavBar2/NavBar2";
import Footer from "../Footer/Footer";
import EditBook from "../EditBook/EditBook";
import Recomendados from "../Recomendados/Recomendados";
import Reviews from "../Reviews/Reviews";

//CSS
import styles from "./BookDetail.module.css";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Button, Stack, Flex } from "@chakra-ui/react";

//pago
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { setItems } from "../../actions/checkoutActions";






export default function BookDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { bookDetail, isAdmin , status, uid, activeCart} = useSelector((state) => state);
  const history = useHistory();

  const [isActive, setIsActive] = useState(true);




  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getBooksId(id));

    return () => {
      dispatch(deleteBookDetail(id));
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


  function handleClickModal() {
    setModal(!modal);
  }
  

 //FUNCIONALIDADES PARA CARRITO
 const [modal, setModal] = useState(false);
//  const [guestCartBooks, setGuestCartBooks] = useState([]);//arreglo de libros guardados en local storage
 const [guestBook, setGuestBook ] = useState({});//objeto de libro a guardar en local storage
//  const [ total, setTotal ] = useState({});//total de libros y monto total en el carrito
const isAuthenticated = useMemo(() => status === "authenticated", [status]);



function handleOnAdd(id, price) {
  if (isAuthenticated) {
      try {
          dispatch(addCartItem(uid, id, price));
          Swal.fire({
              icon: "success",
              title: "Se agrego el libro al carrito",
              showConfirmButton: true,
              confirmButtonColor: "#01A86C",
          });
      } catch (error) {
          Swal.fire({
              icon: "error",
              title: "El libro no se pudo agregar al carrito",
              showConfirmButton: true,
              confirmButtonColor: "#01A86C",
          });
      }
  } else {
      id = bookDetail.id;
      const price = bookDetail.price;
      const quantity = 1;
      const title = bookDetail.title;
      const image = bookDetail.image;
      const bookToAdd = { id, price, quantity, title, image };
      setGuestBook(bookToAdd);

      Swal.fire({
          icon: "success",
          title: "Se agrego el libro al carrito",
          showConfirmButton: true,
          confirmButtonColor: "#01A86C",
      });
  }
  dispatch(discountCurrentStock(bookDetail.id));
}

// al actualizarse bookDetail, encontrar el stock actualizado y setear bookDetail.currentStock
useEffect(() => {
  if (bookDetail.currentStock) {
    // encontrar el id actual en localStorage.guestCartBooks
    const guestCartBooks = JSON.parse(localStorage.getItem("guestCartBooks"));
    if (guestCartBooks) {
      const guestBook = guestCartBooks.find((book) => book.id === bookDetail.id);
      if (guestBook) {
        // si existe, actualizar el stock
        let currentStock = bookDetail.currentStock - guestBook.quantity
      dispatch (setBookDetailCurrentStock(currentStock));
      //{ ...bookDetail, currentStock: bookDetail.currentStock - guestBook.quantity }
    }
  }
  //encontrar el id actual en el state activeCart de Redux (si existe)
  if (activeCart) {
    const book = activeCart.find((book) => book.id === bookDetail.id);
    if (book) {
      console.log("book", book);

      console.log("bookDetail.currentStock", bookDetail.currentStock);
      console.log("book.payment_book.quantity", book.payment_book.quantity);
      // si existe, actualizar el stock
      let currentStock = bookDetail.currentStock - book.payment_book.quantity;
      console.log("currentStock", currentStock);
      dispatch (setBookDetailCurrentStock(currentStock));
      console.log("bookDetail", bookDetail);
    }
  }
}
}, [bookDetail.id]);



//traer el localstorage cuando carga el componente
useEffect(() => {
  const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
  if (localItems) {
    // setGuestCartBooks(localItems);
  } 
  const localTotal = JSON.parse(localStorage.getItem("total"));
  if (localTotal) {
    // setTotal(localTotal);
  }
}, [id]);

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
      // setGuestCartBooks(items);
      localStorage.setItem("guestCartBooks", JSON.stringify(items));
    } else {
      const items = [...itemsLS, guestBook];
      // setGuestCartBooks(items);
      localStorage.setItem("guestCartBooks", JSON.stringify(items));
    }
    totals.totalBooks += 1;
    totals.totalAmount += guestBook.price;
    // setTotal(totals);
    localStorage.setItem("total", JSON.stringify(totals));

  }
}, [guestBook, guestBook.id, bookDetail.id]);

// useEffect (() => {// cuando cambia el stock renderizo el componente detalle
//   dispatch(getBooksId(id));

// }, [bookDetail.currentStock]);


  const arrAuthores = bookDetail.authors && bookDetail.authors.map(a => {
  return <Link to={`/catalog/author/${a.id}`} className={styles.active} key={a.id}>{a.name},  </Link>
   
 })

 const arrCategories = bookDetail.categories && bookDetail.categories.map(a => {
  return `${a.name}, ` 
   
 })

//funcion para el el PAGO 
function buyingBook(id) {
   if (status!=="authenticated") {
    Swal.fire({
      title: "Para comprar debe estar autenticado",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Go to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/home");
      }
    });
  } else
   {
    //id = bookDetail.id;
    const price = bookDetail.price;
    const quantity = 1;  ///falta funcionalidad elegit varios 
    const title = bookDetail.title;
    const image = bookDetail.image;
    const bookToAdd =[{ id, price, quantity, title, image}]  
   // alert("estoy en boton pago", bookToAdd)
    console.log("bookToAdd desde buyingBook en bookdetail", bookToAdd)
    dispatch(setItems(bookToAdd));    
    history.push("/checkout");
  
}

}
  return (

    <div className={styles.detail}>
      <NavBar />
      <NavBar2 />

      <Flex className={styles.container}>
        <div className={styles.containerItems}>
          <div>
            <img className={styles.img1} src={bookDetail.image} alt="imagen del libro" />
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

       {/* CONTENIDO DEL LIBRO */}
        <Flex className={styles.conteiner2}>
          <Flex className={styles.info}>
            <h2 className={styles.title}>{bookDetail.title}</h2>
            <h2 className={styles.datos}>Genero: {arrCategories}</h2>
            <h4 className={styles.datos}>Autores: {arrAuthores}</h4>
            <h4 className={styles.datos}>Editorial: {bookDetail.publisher && bookDetail.publisher.name}</h4>
            <h4 className={styles.datos}>Fecha de Publicacion: {bookDetail.publishedDate}</h4>
            <h2 className={styles.datos}>Numero de paginas: {bookDetail.pageCount}</h2>
            <h4 className={styles.datos}>Rating: {bookDetail.rating} puntos</h4>
            <h4 className={styles.description}>{bookDetail.description}</h4>
          </Flex>


       {/* CONTENIDO DE LA COMPRA */}
          <div className={styles.compra}>
            <div className={styles.compra1}>
              <h2 className={styles.precio}>$ {bookDetail.price}</h2>
              <div className={styles.stockItems}>
                <h6 className={styles.stock}>Stock:</h6>
                <h6 className={styles.NumeroStock}>{bookDetail?.currentStock}</h6>
              </div>
            </div>

            <div className={styles.botones}>

              <div className={styles.carrito}>
                <Stack direction="row" spacing={10}>
                  <Button
                    rightIcon={<RiShoppingCart2Fill />}
                    colorScheme="#01A86C"
                    color="black"
                    variant="solid"
                    fontSize='14px'
                    height= "60px"
                    className={
                        bookDetail.currentStock > 0
                          ? styles.boton
                          : styles.boton + " " + styles.botonDisabled
                      }
                      disabled={bookDetail.currentStock === 0}
                      onClick={() => handleOnAdd(bookDetail.id, bookDetail.price)}
                  >
                    Agregar al carrito
                  </Button>
                </Stack>
                
              </div>
              <div className={styles.carrito2}>

                <Stack direction="row" spacing={10}>
                  <Button
                    color="black"
                    colorScheme="#01A86C"
                    variant="solid"
                    fontSize='15px'
                    height= "60px"
                    className={
                        bookDetail.currentStock > 0
                          ? styles.boton
                          : styles.boton + " " + styles.botonDisabled
                      }
                      disabled={bookDetail.currentStock === 0}
                      onClick={()=>buyingBook(id)}
                  >
                   Comprar
                  </Button>
                </Stack>
                
              </div>
              
                   


      {/* BOTONES ADMIN */}
      {isAdmin === true && <div className={styles.borrados}>
                <button onClick={() => {handleClickDeleteLogic(bookDetail.id)}}
                  className={
                    isActive
                      ? styles.botonBorradoLogico
                      : styles.botonBorradoLogico +
                        " " +
                        styles.botonBorradoLogicoDes} >{isActive ? "ACTIVO" : "BORRADO"}
                </button>

                <button className={styles.editar} onClick={handleClickModal}>EDITAR</button>
              </div> 
      }
            </div>
          </div>
        </Flex>
      </Flex>

       {/* REVIEWS */}
      <div className={styles.review}>
       <Reviews id={id}/>
      </div>

        
      {/* RECOMENDADOS */}
      <div className={styles.recomendados}>
        <Recomendados />
      </div>


      <Footer />

      {/* MODAL PARA ABRIR EL EDITBOOK */}
      {modal && <EditBook bookDetail={bookDetail} setModal={setModal} />}

    </div>
  );
}
