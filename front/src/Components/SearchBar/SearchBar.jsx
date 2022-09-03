import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameBooks, setPage } from "../../actions";
import { useHistory } from "react-router-dom";

//REACT ICONS
// import { RiSearch2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

//CSS
// import styles from "./SearchBar.module.css";

//Componentes Chakra
import { FormLabel, Input, Button, Box } from "@chakra-ui/react";

export default function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const copyAllBooks = useSelector((state) => state.copyAllBooks);
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

  const handledClick = (event) => {
    event.preventDefault();

    history.push("/home", { search: true });
    dispatch(setPage(0));
    dispatch(getNameBooks(event.target.innerText));
    setTitle("");
  };

  return (
    <>
      {/* <form className={styles.conteiner} onSubmit={handledSubmit}>
        <input
          className={styles.input}
          value={title}
          type={"text"}
          placeholder="Busca un Libro..."
          onChange={handleChange}
        />
        <button className={styles.button} title="Search" type="submit">
          <RiSearch2Line className={styles.icono} size="1.5rem" />
        </button>
      </form> */}
      <form onSubmit={handledSubmit}>
        <Box mr="15rem" pr="15rem" width="100%" position="relative">
          <Box display="flex">
            <Input
              value={title}
              onChange={handleChange}
              width="50%"
              placeholder="Busca un Libro..."
            />
            <Box
              zIndex={50}
              borderRadius={5}
              border="3px #F1F1F1"
              bgColor="#F1F1F1"
              width="35%"
              pos="absolute"
              top={10}
            >
              {!title
                ? null
                : copyAllBooks.map(
                    (book, current) =>
                      book.title
                        .toLowerCase()
                        .includes(title.toLowerCase()) && (
                        <FormLabel
                          key={book.id}
                          onClick={handledClick}
                          value={book.title}
                          cursor="pointer"
                          _hover={{ fontWeight: "semibold" }}
                          textAlign="center"
                        >
                          {book.title}
                        </FormLabel>
                      )
                  )}
            </Box>
            <Button title="Search" type="submit" bgColor="#01A86C">
              <FiSearch size="2rem" />
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
