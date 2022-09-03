import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, setPage } from "../../actions/index.js";


//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";
import Book from "../Book/Book.jsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import Paginated from "../Paginated/Paginated.jsx";
import Order from "../Sort/Order.jsx";

//CSS
import styles from "./Home.module.css";
import banner from "./banner.jpg";
import Loading from "../Loading/Loading.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { actualPage, allBooks, section } = useSelector((state) => state);

  const location = useLocation();
  const search = location.state ? location.state.search : null;
  const itemsPorPagina = 12;
  const offset = actualPage * itemsPorPagina;
  const limit = offset + itemsPorPagina;

  useEffect(() => {
    if (section === "home") {
      dispatch(getAllBooks());
      dispatch(setPage(0));
    }
  }, [dispatch, section]);

  // useEffect(() => {

  // }, [actualPage])

  // console.log(allBooks, actualPage);

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

          {/* ORDENAMIENTOS */}
          <div className={styles.ordenamientos}>
            <Order />
          </div>

          <div className={styles.paginado}>
            <Paginated
              totalItems={allBooks.length}
              itemsPorPagina={itemsPorPagina}
            />
          </div>

          <div className={styles.cuerpo}>
            <div className={styles.filtro}>
              <CategoryFilter />
              <AuthorFilter />
            </div>

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
