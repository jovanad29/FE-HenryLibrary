import React, { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    addFavoriteBook,
    getAllBooks,
    setPage,
    setSection,
    deleteFavoriteBook,
    addCartItem,
    deleteFavoriteBookWithoutReducer,
} from "../../actions/index.js";

import reactImageSize from "react-image-size";

//CSS
import styles from "./Book.module.css";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/react";

export default function Book({
    id,
    title,
    authors,
    image,
    price,
    stock,
    allBooks,
}) {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    const section = useSelector((state) => state.section);
    const {
        // activeCart,
        // activeCartAmount,
        status,
        // displayName,
        // activeCartQuantity,
        uid,
    } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    // const { uid } = useSelector((state) => state.user);
    const bookToCarrito = allBooks.filter((b) => b.id === id);
    const bookDetail = bookToCarrito[0];
    // const [guestCartBooks, setGuestCartBooks] = useState([]); //arreglo de libros guardados en local storage
    const [guestBook, setGuestBook] = useState({}); //objeto de libro a guardar en local storage
    // const [total, setTotal] = useState({}); //total de libros y monto total en el carrito

    function handleOnAdd(id, price) {
        if (isAuthenticated) {
            try {
                dispatch(addCartItem(uid, id, price));
                Swal.fire({
                    icon: "success",
                    title: t("agregoAlCarrito"),
                    showConfirmButton: true,
                    confirmButtonColor: "#01A86C",
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: t("noAgregoCarrito"),
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
                title: t("agregoAlCarrito"),
                showConfirmButton: true,
                confirmButtonColor: "#01A86C",
            });
        }
    }

    // let localItems = [];
    // let localTotal = [];

    //traer el localstorage cuando carga el componente
    // useEffect(() => {
    // if (isAuthenticated) {
    // setGuestCartBooks(activeCart);
    // setTotal({
    // totalAmount: activeCartAmount,
    // totalBooks: activeCartQuantity,
    // });
    // } else {
    // setGuestCartBooks(JSON.parse(localStorage.getItem("guestCartBooks")));
    // setTotal(JSON.parse(localStorage.getItem("total")));
    // }
    // }, [isAuthenticated, activeCart, activeCartAmount, activeCartQuantity]);

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         // recorrer el estado items y sumar los precios
    //         let totalBooks = 0;
    //         let totalAmount = 0;
    //         guestCartBooks.forEach((item) => {
    //             totalBooks += item.quantity;
    //             totalAmount += item.price * item.quantity;
    //         });
    //         const total = { totalBooks, totalAmount };
    //         setTotal(total);
    //         localStorage.setItem("total", JSON.stringify(total));
    //         localStorage.setItem(
    //             "guestCartBooks",
    //             JSON.stringify(guestCartBooks)
    //         );
    //     }
    // }, [guestCartBooks, isAuthenticated]);

    useEffect(() => {
        if (guestBook.id) {
            const totals = JSON.parse(localStorage.getItem("total")) || {
                totalBooks: 0,
                totalAmount: 0,
            };
            const itemsLS =
                JSON.parse(localStorage.getItem("guestCartBooks")) || [];
            const itemExist = itemsLS.find((item) => item.id === id);
            if (itemExist) {
                const items = itemsLS.map((item) => {
                    if (item.id === id) {
                        item.quantity += 1;
                    }
                    return item;
                });
                // setGuestCartBooks(items);
                // console.log("items desde books", items);
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
        return () => {
          
        }
    }, [guestBook, guestBook.id, id]);
    

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

    const handleDeleteFavoriteHome = (id) => {
        dispatch(deleteFavoriteBookWithoutReducer(uid, id));
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={stock > 0 ? styles.book : styles.bookSinStock}>
            <div className={styles.imagenes}>
                <NavLink to={`/catalog/detail/${id}`}>
                    <img
                        className={styles.img}
                        src={imgSrc}
                        key={imgSrc}
                        alt="imagenDelLibro"
                    />
                </NavLink>
            </div>

            <p className={styles.title}>{title}</p>
            <h4 className={styles.authors}>
                {authors && authors.map((a) => `${t("autor")}: ${a.name}`)}
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
                            onClick={
                                section === "favoritos"
                                    ? () => handleDeleteFavorite(id)
                                    : () => handleDeleteFavoriteHome(id)
                            }
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
                        {/* <button
                            className={styles.boton}
                            onClick={() => handleOnAdd(id, price)}
                        >
                            Agregar al carrito
                        </button> */}
                        <Button
                            w="87%"
                            backgroundColor="#01A86C"
                            variant="solid"
                            onClick={() => handleOnAdd(id, price)}
                            _focus={{ outlineColor: 'none' }}
                            className={styles.boton}
                        >
                            {t("agregarCarrito")}
                        </Button>
                    </div>
                ) : (
                    <div className={styles.pago}>
                        <div className={styles.botonSinStock} disabled={true}>
                            {t("sinStock")}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
