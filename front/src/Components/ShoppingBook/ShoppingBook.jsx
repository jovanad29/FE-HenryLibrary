import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartDB } from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

//CSS
import styles from "./ShoppingBook.module.css";
import { ImCross } from "react-icons/im";

function ShoppingBook() {
    const dispatch = useDispatch();
    const [guestCartBooks, setGuestCartBooks] = useState([]); //arreglo de libros guardados en local storage
    const [total, setTotal] = useState({}); //total de libros y monto total en el carrito

    const {
        activeCart,
        activeCartAmount,
        status,
        displayName,
        activeCartQuantity,
        uid,
    } = useSelector((state) => state);

    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    let localItems = [];
    let localTotal = [];

    useEffect(() => {
        if (uid) dispatch(getCartDB(uid));
    }, [dispatch, uid]);

    useEffect(() => {
        if (isAuthenticated) {
            localItems = activeCart;
            localTotal = activeCartAmount;
        } else {
            localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
            localTotal = JSON.parse(localStorage.getItem("total"));
        }
        if (localItems) {
            setGuestCartBooks(localItems);
        }
        if (localTotal) {
            setTotal(localTotal);
        }
    }, [
        isAuthenticated,
        dispatch,
        activeCart,
        activeCartAmount,
        activeCartQuantity,
    ]);

    // useEffect(() => {
    //   const item = JSON.parse(localStorage.getItem("book"));
    //   if (item) {
    //     setItems(item);
    //   }
    // }, []);
    //traer el localstorage cuando carga el componente
    // useEffect(() => {
    //     const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
    //     if (localItems) {
    //         setGuestCartBooks(localItems);
    //     }
    //     const localTotal = JSON.parse(localStorage.getItem("total"));
    //     if (localTotal) {
    //         setTotal(localTotal);
    //     }
    // }, []);

    function deleteData(id) {
        let newItems = guestCartBooks.filter((item) => item.id !== id);
        setGuestCartBooks(newItems);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            // recorrer el estado items y sumar los precios
            let totalBooks = 0;
            let totalAmount = 0;
            guestCartBooks.forEach((item) => {
                totalBooks += item.quantity;
                totalAmount += item.price * item.quantity;
            });
            const total = { totalBooks, totalAmount };
            setTotal(total);
            localStorage.setItem("total", JSON.stringify(total));
            localStorage.setItem(
                "guestCartBooks",
                JSON.stringify(guestCartBooks)
            );
        }
    }, [guestCartBooks]);

    const item = guestCartBooks.map((b) => {
        let id, title, image, quantity, price;
        if (isAuthenticated) {
            id = b.id;
            title = b.title;
            image = b.image;
            quantity = b.payment_book.quantity;
            price = b.payment_book.price;
        } else {
            id = b.id;
            title = b.title;
            image = b.image;
            quantity = b.quantity;
            price = b.price;
        }
        return (
            <div className={styles.item} key={id}>
                <img
                    className={styles.img}
                    src={image}
                    alt=""
                    width={10}
                    heigh={10}
                />

                <div className={styles.info}>
                    <h3 className={styles.title}>{title}</h3>
                    {/* <h2>{id}</h2> */}
                    <h2 className={styles.cantidad}>Cantidad: {quantity}</h2>
                    <h2 className={styles.precio}>$ {price}</h2>
                </div>

                <div className={styles.itemCancelar}>
                    <button onClick={() => deleteData(id)}>
                        <ImCross color="#01A86C" size="1rem" />
                    </button>
                </div>
            </div>
        );
    });
    const totalBooks = total.totalBooks;

    return (
        <div className={styles.shopping}>
            <NavBar />

            <NavBar2 />

            <div className={styles.carrito}>
                <h1 className={styles.titulo}>
                    Bienvenido {displayName} al carrito de LibreríaHENRY
                </h1>

                <div className={styles.container}>
                    <div className={styles.container1}>
                        <h3 className={styles.continuarComprando}>
                            <Link to="/home">Continuar Comprando...</Link>
                        </h3>
                        <div>{item}</div>
                    </div>

                    <div className={styles.container2}>
                        <h3 className={styles.itemTotales}>
                            N° Items totales:{" "}
                            {isAuthenticated ? activeCartQuantity : totalBooks}
                        </h3>

                        <div className={styles.infoCompra}>
                            <div className={styles.total}>
                                <h3>Total</h3>
                                <h3>
                                    $
                                    {isAuthenticated
                                        ? activeCartAmount
                                        : localTotal}
                                </h3>
                            </div>
                            <div className={styles.button}>
                                <button className={styles.comprar}>
                                    COMPRAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
}

export default ShoppingBook;
