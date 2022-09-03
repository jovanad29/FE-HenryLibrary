import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameBooks, setPage } from "../../actions";
import { useHistory } from "react-router-dom";

//REACT ICONS
import { RiSearch2Line } from "react-icons/ri";

//CSS
import styles from "./SearchBar.module.css";

export default function SerachBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value.trim());
  };

  const handledSubmit = (event) => {
    event.preventDefault();

    history.push("/home", { search: true });
    dispatch(setPage(0));
    dispatch(getNameBooks(title));
    setTitle("");
  };

  return (
    <>
      <form className={styles.conteiner} onSubmit={handledSubmit}>
        <div className={styles.autocomplete}>
          <input
            className={styles.input}
            value={title}
            type={"text"}
            placeholder="Busca un Libro..."
            onChange={handleChange}
          />
          <ul>
            {/* {allBooks.map((book) => (
              <li
                key={book.id}
                id={book.id}
                value={book.title}
                // onClick={handledClick}
                _hover={{ cursor: "pointer" }}
                fontFamily="Quicksand"
              >
                {book.title}
              </li>
            ))} */}
            {/* <li>HOLA</li>
            <li>Hola</li>
            <li>Hola</li> */}
          </ul>
        </div>
        <button className={styles.button} title="Search" type="submit">
          <RiSearch2Line className={styles.icono} size="1.5rem" />
        </button>
      </form>
    </>
  );
}
