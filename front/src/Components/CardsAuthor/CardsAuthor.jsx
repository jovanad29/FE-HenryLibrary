import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, getBooksByAuthor } from "../../actions";
import { useParams, NavLink } from "react-router-dom";

//COMPONENTES
import NavBar from "../NavBar/NavBar";
import NavBar2 from "../NavBar2/NavBar2";
import Footer from "../Footer/Footer";

//CSS
import styles from "./CardsAuthor.module.css";
import { RiShoppingCart2Fill } from "react-icons/ri";

import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";

export default function CardsAuthor() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { allBooks, status, uid } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    const [guestBook, setGuestBook] = useState({});

    // console.log(allBooks);

    useEffect(() => {
        dispatch(getBooksByAuthor(id));
    }, [dispatch, id]);

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
            const bookDetail = allBooks.filter((book) => book.id === id);
            const quantity = 1;
            const title = bookDetail[0].title;
            const image = bookDetail[0].image;
            const bookToAdd = { id, price, quantity, title, image };
            setGuestBook(bookToAdd);

            Swal.fire({
                icon: "success",
                title: "Se agrego el libro al carrito",
                showConfirmButton: true,
                confirmButtonColor: "#01A86C",
            });
        }
    }

    useEffect(() => {
        if (guestBook.id) {
            const totals = JSON.parse(localStorage.getItem("total")) || {
                totalBooks: 0,
                totalAmount: 0,
            };
            const itemsLS =
                JSON.parse(localStorage.getItem("guestCartBooks")) || [];
            const itemExist = itemsLS.find((item) => item.id === guestBook.id);
            if (itemExist) {
                const items = itemsLS.map((item) => {
                    if (item.id === guestBook.id) {
                        item.quantity += 1;
                    }
                    return item;
                });
                // setGuestCartBooks(items);
                console.log("items desde books", items);
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
    }, [guestBook, guestBook.id]);

    return (
        <div className={styles.container}>
            <NavBar />
            <NavBar2 />

            {allBooks?.map((a) => (
                <div className={styles.CardsAuthor} key={a.id}>
                    <div className={styles.image}>
                        <NavLink to={`/catalog/detail/${a.id}`}>
                            <img
                                className={styles.img}
                                src={a.image}
                                alt="imagenDelLibro"
                            />
                        </NavLink>
                    </div>

                    <div className={styles.info}>
                        <h2 className={styles.titulo}>{a.title}</h2>
                        <h4 className={styles.infoItem}>
                            {a.authors &&
                                a.authors.map((a) => `Autores: ${a.name}`)}
                        </h4>

                        <div className={styles.pago}>
                            <h4 className={styles.precio}>$ {a.price}</h4>

                            {/* Renderizado condicional verificando si hay stock disponible */}
                            {/* {a.currentStock > 0 ? (
                                <button
                                    onClick={() => handleOnAdd(a.id, a.price)}
                                >
                                    Agregar al carrito
                                </button>
                            ) : (
                                <div>
                                    <button disabled={true}>Sin stock</button>
                                </div>
                            )} */}
                            <Button
                                rightIcon={<RiShoppingCart2Fill />}
                                background="#01A86C"
                                variant="solid"
                                height="60px"
                                className={
                                    a.currentStock > 0
                                        ? styles.boton
                                        : styles.boton +
                                          " " +
                                          styles.botonDisabled
                                }
                                disabled={a.currentStock === 0}
                                onClick={() => handleOnAdd(a.id, a.price)}
                            >
                                Agregar al carrito
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            <Footer />
        </div>
    );
}
