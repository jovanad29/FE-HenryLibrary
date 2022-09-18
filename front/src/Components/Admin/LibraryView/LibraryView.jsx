import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../../actions/index";

// COMPONENTES
import Menu from "../Components/Menu";
import Title from "../Components/Title";
import NavBar from "../Components/NavBar";

// ESTILOS Y COMPONENTES CHAKRA
import { Box, Button, Flex } from "@chakra-ui/react";
import style from "./LibraryView.module.css";
import RowTable from "./RowTable/RowTable";

function LibraryView() {
  const dispatch = useDispatch();
  const { allBooks } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        <Button colorScheme="green" size="sm" mb="5%">
          Crear Libro
        </Button>
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.book}>Libro</Box>
          <Box className={style.author}>Autor</Box>
          <Box className={style.category}>Genero</Box>
          <Box className={style.rating}>Calificacion</Box>
          <Box className={style.price}>Precio</Box>
          <Box className={style.edit}></Box>
        </Flex>

        {/* CONTENIDO */}
        {allBooks.map((book) => (
          <RowTable key={book.id} book={book} />
        ))}
      </Box>
    </Box>
  );
}

export default LibraryView;
