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
  const [hidden, setHidden] = useState(false);

  const handleChange = (event) => {
    setTitle(event.target.value.trim());
    setHidden(false);
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

    setTitle(event.target.innerText);

    history.push("/home", { search: true });
    dispatch(setPage(0));
    dispatch(getNameBooks(event.target.innerText));

    setHidden(true);
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
        <Box
          fontFamily="Quicksand"
          mr="20rem"
          pr="10rem"
          width="100%"
          position="relative"
        >
          <Box display="flex">
            <Input
              value={title}
              onChange={handleChange}
              width="50%"
              focusBorderColor="#01A86C"
              placeholder="Busca un Libro..."
            />
            <Box
              zIndex={50}
              borderRadius={5}
              border="3px #F1F1F1"
              bgColor="#F1F1F1"
              width="34%"
              pos="absolute"
              top={10}
            >
              {!title || hidden
                ? null
                : copyAllBooks
                    .filter((book) =>
                      book.title.toLowerCase().includes(title.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((book) => (
                      <FormLabel
                        key={book.id}
                        onClick={handledClick}
                        value={book.title}
                        cursor="pointer"
                        _hover={{
                          fontWeight: "semibold",
                          backgroundColor: "#01A86C",
                        }}
                        textAlign="center"
                        width={"100%"}
                      >
                        {book.title}
                      </FormLabel>
                    ))}
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
