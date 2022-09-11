import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCartItem } from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx"

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

    useEffect(() => {
        if (isAuthenticated) {
            setGuestCartBooks(activeCart || []);
            setTotal({
                totalAmount: activeCartAmount,
                totalBooks: activeCartQuantity,
            });
        } else {
            setGuestCartBooks(
                JSON.parse(localStorage.getItem("guestCartBooks")) || []
            );
            setTotal(JSON.parse(localStorage.getItem("total")) || []);
        }
    }, [isAuthenticated, activeCart, activeCartAmount, activeCartQuantity]);

    function handleOnDelete(id, quantity, price) {
        let newItems = guestCartBooks.filter((item) => item.id !== id);
        setGuestCartBooks(newItems);
        if (isAuthenticated) {
            dispatch(editCartItem(uid, id, quantity, price));
        }
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
            localStorage.setItem("total", JSON.stringify(total) || []);
            // localStorage.setItem("guestCartBooks", JSON.stringify(guestCartBooks) || []);
        }
    }, [guestCartBooks, isAuthenticated]);

    const item = guestCartBooks?.map((b) => {
        let id, title, image, quantity, price;
        id = b.id;
        title = b.title;
        image = b.image;
        if (isAuthenticated) {
            quantity = b.payment_book?.quantity;
            price = b.payment_book?.price;
        } else {
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
                    <button onClick={() => handleOnDelete(id, 0, 0)}>
                        <ImCross color="#01A86C" size="1rem" />
                    </button>
                </div>
            </div>
        );
    });

    const totalBooks = total.totalBooks;
    const totalAmount = total.totalAmount;




    return (

            <div className={styles.shopping}>
                <NavBar />
                <NavBar2 />

                {guestCartBooks?.length > 0 ?(
                <div className={styles.carrito}>

                    <div className={styles.container}>
                        <div className={styles.container1}>
                            <h3 className={styles.continuarComprando}>
                                <Link to="/home">Continuar Comprando...</Link>
                            </h3>
                            <div>{item}</div>
                        </div>

                        <div className={styles.container2}>
                            <h3 className={styles.itemTotales}>
                                N° Items totales: {totalBooks}
                            </h3>

                            <div className={styles.infoCompra}>
                                <div className={styles.total}>
                                    <h3>Total</h3>
                                    <h3>
                                        ${parseFloat(totalAmount).toFixed(2)}
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
                </div>) 
                
                : (

                 <div className={styles.containerVacio}>
                    <h2>Tu carrito está vacío</h2>
                    <h4> ¿No sabés qué comprar? ¡Miles de libros te esperan!</h4>
                </div>

                )}

                <Footer /> 
            </div>

);
}


export default ShoppingBook;
