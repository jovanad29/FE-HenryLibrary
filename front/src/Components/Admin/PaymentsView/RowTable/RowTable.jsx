import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import style from "./RowTable.module.css";

function RowTable({ allPayments }) {
  const { id, books, total, statusId, paymentMethodId, createdAt } =
    allPayments;
  return (
    <Box className={style.content}>
      <Flex className={style.table}>
        <Box className={style.numOrder}>{id}</Box>
        <Box className={style.items}>{books.length}</Box>
        <Box className={style.amount}>{total}</Box>
        <Box className={style.status}>{statusId}</Box>
        <Box className={style.paymentMethod}>{paymentMethodId}</Box>
        <Box className={style.date}>{createdAt}</Box>
      </Flex>
    </Box>
  );
}
export default RowTable;
