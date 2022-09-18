import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import { deleteLogicBook } from "../../../../actions/index";

import style from "./RowTable.module.css";

function RowTable({ book }) {
  const dispatch = useDispatch();
  const { id, image, title, description, authors, categories } = book;

  const handleClick = (event) => {
    Swal.fire({
      icon: "warning",
      title: "Esta seguro que desea eliminar este libro?",
      showConfirmButton: true,
      confirmButtonColor: "#01A86C",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
      focusDeny: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLogicBook(id));
      }
    });
  };

  return (
    <Box className={style.content}>
      <Flex className={style.table}>
        <Box className={style.bookRow}>
          <Flex>
            <Image
              className={style.image}
              src={image}
              boxSize="90px"
              flex={1}
            />
            <VStack flex={11} className={style.bookRow}>
              <Text
                noOfLines={1}
                height="30%"
                paddingLeft="5%"
                paddingRight="8%"
                fontWeight="bold"
              >
                {title}
              </Text>
              <Text
                noOfLines={1}
                height="30%"
                paddingLeft="5%"
                paddingRight="8%"
              >
                {description}
              </Text>
            </VStack>
          </Flex>
        </Box>
        <Box className={style.author}>
          {authors.length > 0 && book.authors[0].name}
        </Box>
        <Box className={style.categories}>
          {categories.length > 0 && book.categories[0].name}
        </Box>
        <Box className={style.rating}>{book.rating}</Box>
        <Box className={style.price}>{book.price}</Box>
        <Box className={style.stock}>
          {book.currentStock === 0 ? "No Disponible" : book.currentStock}
        </Box>
        <Box className={style.edit}>
          <NavLink
            to={{ pathname: `/user/admin/catalogue/${id}`, props: book }}
          >
            <Button colorScheme="green" size="xs">
              Editar
            </Button>
          </NavLink>
          <Button colorScheme="red" size="xs" onClick={handleClick}>
            Eliminar
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
export default RowTable;
