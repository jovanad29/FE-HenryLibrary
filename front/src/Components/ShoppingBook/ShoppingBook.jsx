import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCartItem } from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

//CSS
import styles from "./ShoppingBook.module.css";
import { FaBackward, FaTrashAlt } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

import { Button } from "@chakra-ui/react";

//pago
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { setItems } from "../../actions/checkoutActions";

function ShoppingBook() {
    const history = useHistory(); //para ir al  checkout del pago
    const dispatch = useDispatch();
    const [guestCartBooks, setGuestCartBooks] = useState([]); //arreglo de libros guardados en local storage
    const [total, setTotal] = useState({}); //total de libros y monto total en el carrito

    const { activeCart, activeCartAmount, status, activeCartQuantity, uid } =
        useSelector((state) => state);

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
    // boton pagar handle
    function handleBuyingBooks(e) {
        e.preventDefault();
        if (!isAuthenticated) {
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
        } else {
            const booksBuy = guestCartBooks.map((b) => {
                return {
                    id: b.id,
                    title: b.title,
                    image: b.image,
                    quantity: isAuthenticated
                        ? b.payment_book?.quantity
                        : b.quantity,
                    price: isAuthenticated ? b.payment_book?.price : b.price,
                };
            });
            console.log("estoy en boton pago carrito ", booksBuy);

            dispatch(setItems(booksBuy));
            history.push("/checkout");
        }
    }

    // fin handle boton pagar

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
            localStorage.setItem(
                "guestCartBooks",
                JSON.stringify(guestCartBooks) || []
            );
        }
    }, [guestCartBooks, isAuthenticated]);

    const handleChangeQuantity = (e, id, price) => {
        // let newItems = guestCartBooks.filter((item) => item.id !== id);
        let newItems = guestCartBooks.map((item) => {
            if (item.id === id)
                item.payment_book.quantity =
                    e.target.value > 0 ? e.target.value : 0;
            return item;
        });

        setGuestCartBooks(newItems);
        console.log(newItems);
        if (isAuthenticated) {
            dispatch(
                editCartItem(
                    uid,
                    id,
                    e.target.value > 0 ? e.target.value : 0,
                    price
                )
            );
        }
    };

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
                    <div className={styles.infoItem1}>
                        <h3 className={styles.title}>{title}</h3>
                    </div>
                    <div className={styles.infoItem2}>
                        <h2 className={styles.precio}>Precio: $ {price}</h2>
                        <div className={styles.cantidadContainer}>
                            <label className={styles.cantidad}>
                                Cantidad:{" "}
                            </label>
                            <input
                                type="number"
                                className={styles.cantidadInput}
                                defaultValue={quantity}
                                min={"1"}
                                max={"100"}
                                onChange={(e) =>
                                    handleChangeQuantity(e, id, price)
                                }
                            />{" "}
                            {/*quantity*/}
                        </div>
                        <h2 className={styles.precio}>
                            Total: $ {price * quantity}
                        </h2>
                        <button
                            className={styles.itemCancelar}
                            onClick={() => handleOnDelete(id, 0, 0)}
                        >
                            <FaTrashAlt color="#01A86C" size="1rem" />
                        </button>
                    </div>
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

            <div className={styles.carrito}>
                <div className={styles.containerGeneral}>
                    <div className={styles.tituloPrincipal}>
                        <h3>CARRITO</h3>
                        <h3>N° Items totales: {totalBooks}</h3>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.container1}>
                            <div className={styles.continuarComprando}>
                                <Button
                                    className={styles.textoContinuarComprando}
                                    leftIcon={<FaBackward />}
                                    bg="none"
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    _focus={{ borderColor: "none" }}
                                >
                                    Continuar comprando...
                                </Button>
                            </div>

                            {guestCartBooks?.length > 0 ? (
                                <div>{item}</div>
                            ) : (
                                <div className={styles.containerVacio}>
                                    <h2>Tu carrito está vacío</h2>
                                    <h4>
                                        {" "}
                                        ¿No sabés qué comprar? ¡Miles de libros
                                        te esperan!
                                    </h4>
                                </div>
                            )}
                        </div>

                        <div className={styles.container2}>
                            {guestCartBooks?.length > 0 && (
                                <div className={styles.infoCompra}>
                                    <div className={styles.total}>
                                        <h3>
                                            Total a pagar: $
                                            {parseFloat(totalAmount).toFixed(2)}
                                        </h3>
                                    </div>
                                    <div className={styles.button}>
                                        <button
                                            className={styles.comprar}
                                            onClick={(e) =>
                                                handleBuyingBooks(e)
                                            }
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ShoppingBook;
