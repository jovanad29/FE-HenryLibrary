import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getBooksId,
    deleteBookDetail,
    // deleteLogicBook,
    addCartItem,
    discountCurrentStock,
    setBookDetailCurrentStock,
} from "../../actions";
import { Link, useParams } from "react-router-dom";

//COMPONENTES
import NavBar from "../NavBar/NavBar";
import NavBar2 from "../NavBar2/NavBar2";
import Footer from "../Footer/Footer";
// import EditBook from "../EditBook/EditBook";
import Recomendados from "../Recomendados/Recomendados";
import Reviews from "../Reviews/Reviews";

//CSS
import styles from "./BookDetail.module.css";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Button, Stack, Flex } from "@chakra-ui/react";

//pago
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
// import { setItems } from "../../actions/checkoutActions";

export default function BookDetail() {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const { id } = useParams();
    const { bookDetail, status, uid, activeCart } = useSelector(
        (state) => state
    );
    // const history = useHistory();

    // const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getBooksId(id));

        return () => {
            dispatch(deleteBookDetail(id));
            //TENGO QUE DESMONTAR EL COMPONENTE SINO ME QUEDA AHI COLGADO
        };
    }, [dispatch, id]);

    // useEffect(() => {
    //     setIsActive(bookDetail.isActive);

    // }, [bookDetail.isActive]);

    //FUNCIONALIDADES PARA CARRITO
    //  const [guestCartBooks, setGuestCartBooks] = useState([]);//arreglo de libros guardados en local storage
    const [guestBook, setGuestBook] = useState({}); //objeto de libro a guardar en local storage
    //  const [ total, setTotal ] = useState({});//total de libros y monto total en el carrito
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    function handleOnAdd(id, price) {
        if (isAuthenticated) {
            try {
                dispatch(addCartItem(uid, id, price));
                Swal.fire({
                    icon: "success",
                    title: t("agregoCarrito"),
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
                title: t("agregoCarrito"),
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
            const guestCartBooks = JSON.parse(
                localStorage.getItem("guestCartBooks")
            );
            if (guestCartBooks) {
                const guestBook = guestCartBooks.find(
                    (book) => book.id === bookDetail.id
                );
                if (guestBook) {
                    // si existe, actualizar el stock
                    let currentStock =
                        bookDetail.currentStock - guestBook.quantity;
                    dispatch(setBookDetailCurrentStock(currentStock));
                }
            }
            //encontrar el id actual en el state activeCart de Redux (si existe)
            if (activeCart) {
                const book = activeCart.find(
                    (book) => book.id === bookDetail.id
                );
                if (book) {
                    // si existe, actualizar el stock
                    let currentStock =
                        bookDetail.currentStock - book.payment_book.quantity;
                    dispatch(setBookDetailCurrentStock(currentStock));
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        if (guestBook.id) {
            const totals = JSON.parse(localStorage.getItem("total")) || {
                totalBooks: 0,
                totalAmount: 0,
            };
            const itemsLS =
                JSON.parse(localStorage.getItem("guestCartBooks")) || [];
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

    const arrAuthores =
        bookDetail.authors &&
        bookDetail.authors.map((a) => {
            return (
                <Link
                    to={`/catalog/author/${a.id}`}
                    className={styles.active}
                    key={a.id}
                >
                    {a.name},{" "}
                </Link>
            );
        });

    const arrCategories =
        bookDetail.categories &&
        bookDetail.categories.map((a) => {
            return `${a.name}, `;
        });

    return (
        <div className={styles.detail}>
            <NavBar />
            <NavBar2 />

            <Flex className={styles.container}>
                <div className={styles.containerItems}>
                    <div>
                        <img
                            className={styles.img1}
                            src={bookDetail.image}
                            alt={t("altImg")}
                        />
                    </div>

                    <div className={styles.img}>
                        <img
                            className={styles.img2}
                            src={bookDetail.image}
                            alt={t("altImg")}
                        />
                        <img
                            className={styles.img2}
                            src={bookDetail.image}
                            alt={t("altImg")}
                        />
                        <img
                            className={styles.img2}
                            src={bookDetail.image}
                            alt={t("altImg")}
                        />
                    </div>
                </div>

                {/* CONTENIDO DEL LIBRO */}
                <Flex className={styles.conteiner2}>
                    <Flex className={styles.info}>
                        <h2 className={styles.title}>{bookDetail.title}</h2>
                        <h2 className={styles.datos}>
                            {t("genero")}: {arrCategories}
                        </h2>
                        <h4 className={styles.datos}>{t("autores")}: {arrAuthores}</h4>
                        <h4 className={styles.datos}>
                            {t("editorial")}:{" "}
                            {bookDetail.publisher && bookDetail.publisher.name}
                        </h4>
                        <h4 className={styles.datos}>
                            {t("publicacion")}: {bookDetail.publishedDate}
                        </h4>
                        <h2 className={styles.datos}>
                            {t("paginas")}: {bookDetail.pageCount}
                        </h2>
                        <h4 className={styles.datos}>
                            {t("calificacion")}: {bookDetail.rating} {t("puntos")}
                        </h4>
                        <h4 className={styles.description}>
                            {bookDetail.description}
                        </h4>
                    </Flex>

                    {/* CONTENIDO DE LA COMPRA */}
                    <div className={styles.compra}>
                        <div className={styles.compra1}>
                            <h2 className={styles.precio}>
                                $ {bookDetail.price}
                            </h2>
                            <div className={styles.stockItems}>
                                <h6 className={styles.stock}>Stock: </h6>
                                <h6 className={styles.NumeroStock}>
                                    {bookDetail?.currentStock}
                                </h6>
                            </div>
                        </div>

                        <div className={styles.botones}>
                            <div className={styles.carrito}>
                                <Stack direction="row" spacing={10}>
                                    <Button
                                        rightIcon={<RiShoppingCart2Fill />}
                                        variant="solid"
                                        fontSize="15px"
                                        backgroundColor="#01A86C"
                                        height="60px"
                                        className={
                                            bookDetail.currentStock > 0
                                                ? styles.boton
                                                : styles.boton +
                                                  " " +
                                                  styles.botonDisabled
                                        }
                                        disabled={bookDetail.currentStock <= 0}
                                        onClick={() =>
                                            handleOnAdd(
                                                bookDetail.id,
                                                bookDetail.price
                                            )
                                        }
                                    >
                                        {t("agregarCarrito")}
                                    </Button>
                                </Stack>
                            </div>
                            <div className={styles.carrito2}></div>
                        </div>
                    </div>
                </Flex>
            </Flex>

            {/* REVIEWS */}
            <div className={styles.review}>
                <Reviews id={id} />
            </div>

            {/* RECOMENDADOS */}
            <div className={styles.recomendados}>
                <Recomendados />
            </div>

            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
