import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../../actions/dashboardActions";

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import style from "./DetailPayment.module.css";
import Menu from "../../Components/Menu";
import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";

function DetailPayment() {
  const location = useLocation();
  const { orderNumber, allOrderStatus } = location.state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { allOrders } = useSelector((state) => state);
  const currentOrder = allOrders.find((e) => e.id === orderNumber.nro);

  console.log("ggggggggggggggg", currentOrder);

  const { id, user, books, total, order_status, payment_method, createdAt } =
    currentOrder;

  const dateFormat = (createAt) => {
    let tuple = createAt.split("T");
    let date = tuple[0];
    let dateTuple = date.split("-");
    let day = parseInt(dateTuple[2]);
    let month = parseInt(dateTuple[1]);
    let year = parseInt(dateTuple[0]);
    let newFormatedDate = [day, month, year].join("/");

    return newFormatedDate;
  };

  const onSelectHandler = (e) => {
    console.log("eeeeeeeee", e.target.value);
    dispatch(updateOrderStatus(orderNumber.nro, e.target.value));
    dispatch(getAllOrders());
  };

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />

      {/* PAYMENTS DEATAIL */}
      <Box className={style.content}>
        {/* CABECERA */}
        <Box>
          <Flex className={style.table}>
            <Box className={style.numOrder}>Numero de Orden</Box>
            <Box className={style.status}>Usuario</Box>
            <Box className={style.amount}>Importe/s</Box>
            <Box className={style.status}>Estado</Box>
            <Box className={style.paymentMethod}>Metodo de Pago</Box>
            <Box className={style.date}>Fecha</Box>
            <Box className={style.edit}></Box>
          </Flex>
        </Box>

        {/* DETALLES */}
        <Box className={style.contentRow}>
          <Flex className={style.tableRow}>
            <Box className={style.numOrderRow}>{id}</Box>
            <Box className={style.status}>{user.nameUser}</Box>
            <Box className={style.amountRow}>{total}</Box>
            <Box className={style.statusRow}>
              <Select
                variant="flushed"
                width="70%"
                defaultValue={order_status.id}
                onChange={(e) => onSelectHandler(e)}
              >
                {allOrderStatus?.map((status) => {
                  return (
                    <option key={status.id} value={status.id}>
                      {status.description}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box className={style.paymentMethodRow}>
              {payment_method.descrption}
            </Box>
            <Box className={style.dateRow}>{dateFormat(createdAt)}</Box>
            <Box className={style.editRow}>
              <Button colorScheme="green" size="xs">
                Guardar
              </Button>
              <Button colorScheme="green" size="xs">
                Cancelar
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* LIBROS */}

      {/* TITULO */}
      <Box pl="10.8%" pt="5%" textAlign="center">
        <Heading
          fontFamily="Quicksand"
          as="h2"
          size="md"
          ml="8%"
          fontSize="3xl"
          color="#01A86C"
        >
          Detalles de la Orden
        </Heading>
      </Box>

      <Box className={style.content}>
        {/* CABECERA */}
        <Box>
          <Flex className={style.table}>
            <Box className={style.book}>Libro</Box>
            <Box className={style.price}>Precio</Box>
            <Box className={style.quantity}>Catidad</Box>
            <Box className={style.total}>Total</Box>
          </Flex>
        </Box>

        {/* CONTENIDO */}
        {books.map((book) => (
          <Box key={book.id} className={style.contentBook}>
            <Flex className={style.table}>
              <Box className={style.bookRow}>
                <Flex>
                  <Image
                    className={style.image}
                    src={book.image}
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
                      {book.title}
                    </Text>
                    <Text
                      noOfLines={1}
                      height="30%"
                      paddingLeft="5%"
                      paddingRight="8%"
                    >
                      {book.description}
                    </Text>
                  </VStack>
                </Flex>
              </Box>
              <Box className={style.price}>{book.price}</Box>
              <Box className={style.price}>{book.payment_mp_book.quantity}</Box>
              <Box className={style.price}>{book.payment_mp_book.price}</Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
export default DetailPayment;
