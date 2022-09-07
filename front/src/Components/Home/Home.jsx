import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBooks,
  getAllFavorites,
  setPage,
  getCategories,
} from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";
import Book from "../Book/Book.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import Order from "../Sort/Order.jsx";
import Filters from "../Filters/Filters";

//CSS
import styles from "./Home.module.css";
import banner from "./banner.jpg";
import Loading from "../Loading/Loading.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { actualPage, allBooks, section, favorites } = useSelector(
    (state) => state
  );

  const itemsPorPagina = 12;
  const offset = actualPage * itemsPorPagina;
  const limit = offset + itemsPorPagina;

  useEffect(() => {
    if (section === "home") {
      dispatch(setPage(0));
      dispatch(getAllBooks());
    } else if (section === "favoritos") {
      dispatch(setPage(0));
      dispatch(getAllFavorites());
    }
  }, [dispatch, section, favorites]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const currentBooks = allBooks.length > 0 && allBooks.slice(offset, limit);

  return (
    <div className={styles.home}>
      <NavBar />
      <NavBar2 />

      {currentBooks.length > 0 ? (
        <>
          <div className={styles.banner}>
            <img src={banner} alt="banner" />
          </div>

          {/*Filtros - Paginado - Ordenamientos */}
          <div className={styles.paginado}>
            <Filters />
            <Paginated
              totalItems={allBooks.length}
              itemsPorPagina={itemsPorPagina}
            />
            <Order />
          </div>

          <div className={styles.cuerpo}>
            <div className={styles.cards}>
              {currentBooks &&
                currentBooks.map((b) => (
                  <Book
                    key={b.id}
                    id={b.id}
                    title={b.title}
                    authors={b.authors}
                    image={b.image}
                    price={b.price}
                    stock={b.currentStock}
                    allBooks={allBooks}
                  />
                ))}
            </div>
          </div>
        </>
      ) : allBooks.message ? (
        <div className={styles.ErrorSearch}>
          <h3 className={styles.errorH3}>{allBooks.message}</h3>
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </div>
  );
}
