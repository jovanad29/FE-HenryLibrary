import React, { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addFavoriteBook,
    getAllBooks,
    setPage,
    setSection,
    deleteFavoriteBook,
} from "../../actions/index.js";

import reactImageSize from "react-image-size";

//CSS
import styles from "./Book.module.css";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import swal from "sweetalert";





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
    const { status } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    // const { uid } = useSelector((state) => state.user);
    const bookToCarrito = allBooks.filter((b) => b.id === id);
    const bookDetail = bookToCarrito[0];
    // const [guestCartBooks, setGuestCartBooks] = useState([]); //arreglo de libros guardados en local storage
    const [guestBook, setGuestBook] = useState({}); //objeto de libro a guardar en local storage
    // const [total, setTotal] = useState({}); //total de libros y monto total en el carrito

    const addItem = (id) => {
        id = bookDetail.id;
        const price = bookDetail.price;
        const quantity = 1;
        const title = bookDetail.title;
        const image = bookDetail.image;
        const bookToAdd = { id, price, quantity, title, image };
        swal({
            title: "Se agrego el libro al carrito",
            icon: "success",
        });
        console.log("bookToAdd desde bookdetail", bookToAdd);
        setGuestBook(bookToAdd);
    };

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
    }, []);

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
    }, [guestBook, guestBook.id, id]);

    // function saveData(){
    //   localStorage.setItem("book", JSON.stringify(bookToCarrito))
    //                        //key , value
    //   console.log(typeof bookToCarrito)
    //   alert("has guardado tu libro en el carrito")
    // }

    const handleOnFavorite = (id) => {
        dispatch(addFavoriteBook(id));
    };

    const handleDeleteFavorite = (id) => {
        dispatch(deleteFavoriteBook(id));
        if (favorites.length === 1 && section === "favoritos") {
            dispatch(getAllBooks());
            dispatch(setPage(0));
            dispatch(setSection("home"));
        }
    };

    const isFavorite = favorites?.filter((f) => f === id);

    // const loadImage = (setImageDimensions, imageUrl) => {
    //     const img = new Image();
    //     img.src = imageUrl;

    //     img.onload = () => {
    //         setImageDimensions({
    //             height: img.height,
    //             width: img.width,
    //         });
    //     };
    //     img.onerror = (err) => {
    //         console.log("img error");
    //         console.error(err);
    //     };
    // };

    // const [imageDimensions, setImageDimensions] = useState({});
    // const imageUrl = "https://picsum.photos/200/300";

    // useEffect(() => {
    //     loadImage(setImageDimensions, imageUrl);
    //     console.log(imageDimensions);
    // }, []);
    // const onImgLoad = ({ target: img }) => {
    //     const { offsetHeight, offsetWidth } = img;
    //     console.log(offsetHeight, offsetWidth);
    //     console.log(img);
    // };

    // reactImageSize(image)
    //     .then(({ width, height }) => {
    //         if (width < 100) {
    //             console.log(width);
    //             image =
    //                 "https://inmobiliariabernardi.com/wp-content/themes/realestate-7/images/no-image.png";
    //         }
    //     })
    //     .catch((errorMessage) => console.log(errorMessage));

    const [imgSrc, setImgSrc] = useState('');

    const loadImage = async () => {
        try {
            const { width, height } = await reactImageSize(image);
            if (width < 100) {
                setImgSrc('https://t3.ftcdn.net/jpg/00/54/90/30/360_F_54903050_NC9KIF3PjpPHEIX66oWlJFs9nqgipnR2.jpg');
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
                            onClick={() => addItem(id)}
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
