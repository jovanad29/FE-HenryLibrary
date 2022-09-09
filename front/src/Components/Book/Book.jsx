import React, { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addFavoriteBook,
    getAllBooks,
    setPage,
    setSection,
    deleteFavoriteBook,
    addCartItem,
} from "../../actions/index.js";

import reactImageSize from "react-image-size";

//CSS
import styles from "./Book.module.css";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Swal from "sweetalert2";

export default function Book({
    id,
    title,
    authors,
    image,
    price,
    stock,
    allBooks,
}) {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    const section = useSelector((state) => state.section);
    const {
        activeCart,
        activeCartAmount,
        status,
        displayName,
        activeCartQuantity,
        uid,
    } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    // const { uid } = useSelector((state) => state.user);
    const bookToCarrito = allBooks.filter((b) => b.id === id);
    const bookDetail = bookToCarrito[0];
    const [guestCartBooks, setGuestCartBooks] = useState([]); //arreglo de libros guardados en local storage
    const [guestBook, setGuestBook] = useState({}); //objeto de libro a guardar en local storage
    const [total, setTotal] = useState({}); //total de libros y monto total en el carrito

    function handleOnAdd(id, price) {
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
    }

    let localItems = [];
    let localTotal = [];

    //traer el localstorage cuando carga el componente
    useEffect(() => {
        if (isAuthenticated) {
            localItems = activeCart;
            localTotal = {
                totalAmount: activeCartAmount,
                totalBooks: activeCartQuantity,
            };
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

    const handleOnFavorite = (id) => {
        dispatch(addFavoriteBook(uid, id));
    };

    const handleDeleteFavorite = (id) => {
        dispatch(deleteFavoriteBook(uid, id));
        if (favorites.length === 1 && section === "favoritos") {
            dispatch(getAllBooks());
            dispatch(setPage(0));
            dispatch(setSection("home"));
        }
    };

    const isFavorite = favorites?.filter((f) => f === id);

    const [imgSrc, setImgSrc] = useState("");

    const loadImage = async () => {
        try {
            const { width } = await reactImageSize(image);
            if (width < 100) {
                setImgSrc(
                    "https://t3.ftcdn.net/jpg/00/54/90/30/360_F_54903050_NC9KIF3PjpPHEIX66oWlJFs9nqgipnR2.jpg"
                );
            } else {
                setImgSrc(image);
            }
        } catch {
            setImgSrc(image);
        }
    };

    useEffect(() => {
        loadImage();
    }, []);

    return (
        <div className={styles.book}>
            <div className={styles.imagenes}>
                <NavLink to={`/catalog/detail/${id}`}>
                    <img
                        className={styles.img}
                        // onLoad={loadImage}
                        src={imgSrc}
                        key={imgSrc}
                        alt="imagenDelLibro"
                    />
                </NavLink>
            </div>

            <p className={styles.title}>{title}</p>
            <h4 className={styles.authors}>
                {authors && authors.map((a) => `Autor: ${a.name}`)}
            </h4>

            {isAuthenticated && (
                <div className={styles.containerIconoFavAdd}>
                    {isFavorite.length === 0 ? (
                        <button
                            className={styles.iconoFavAdd}
                            onClick={() => handleOnFavorite(id)}
                        >
                            <MdOutlineFavoriteBorder
                                className={
                                    isAuthenticated
                                        ? styles.iconoFav
                                        : styles.iconoNoFav
                                }
                            />
                        </button>
                    ) : (
                        <button
                            className={styles.iconoFavAdd}
                            onClick={() => handleDeleteFavorite(id)}
                        >
                            <MdOutlineFavorite />
                        </button>
                    )}
                </div>
            )}

            <div className={styles.conteiner}>
                <div className={styles.info}>
                    <h4 className={styles.precio}>$ {price}</h4>
                </div>

                {/* Renderizado condicional verificando si hay stock disponible */}
                {stock > 0 ? (
                    <div className={styles.pago}>
                        <button
                            className={styles.boton}
                            onClick={() => handleOnAdd(id, price)}
                        >
                            Agregar al carrito
                        </button>
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
