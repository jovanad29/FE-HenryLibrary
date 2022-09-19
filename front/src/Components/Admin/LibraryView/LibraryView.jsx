import React, { useEffect, useState } from "react";
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
import { NavLink } from "react-router-dom";

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
        <Box mb="5%">
          <NavLink to={`/user/admin/catalogue/new`}>
            <Button colorScheme="green" size="sm">
              Crear Libro
            </Button>
          </NavLink>
          <NavLink to={`/user/admin/catalogue/category`}>
            <Button colorScheme="green" size="sm" ml="5%">
              Crear Categoria
            </Button>
          </NavLink>
        </Box>
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.book}>Libro</Box>
          <Box className={style.author}>Autor</Box>
          <Box className={style.category}>Genero</Box>
          <Box className={style.rating}>Calificacion</Box>
          <Box className={style.price}>Precio</Box>
          <Box className={style.stock}>Stock</Box>
          <Box className={style.edit}></Box>
        </Flex>

        {/* CONTENIDO */}
        {allBooks.map(
          (book) => book.isActive && <RowTable key={book.id} book={book} />
        )}
      </Box>
    </Box>
  );
}

export default LibraryView;
