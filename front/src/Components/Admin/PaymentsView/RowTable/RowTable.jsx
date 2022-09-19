import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import style from "./RowTable.module.css";

function RowTable({ allPayments, allOrderStatus }) {
  const { id, user, books, total, order_status, payment_status, createdAt } =
    allPayments;

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

  const orderNumber = { nro: id };

  return (
    <NavLink
      className={style.link}
      to={{
        pathname: `/user/admin/payments/${id}`,
        state: { orderNumber, allOrderStatus },
      }}
    >
      <Box className={style.content}>
        <Flex className={style.table}>
          <Box className={style.numOrder}>{id}</Box>
          <Box className={style.status}>{user.nameUser}</Box>
          <Box className={style.numOrder}>{user.email}</Box>
          <Box className={style.items}>{books.length}</Box>
          <Box className={style.amount}>{total}</Box>
          <Box className={style.date}>{dateFormat(createdAt)}</Box>
          <Box className={style.status}>{payment_status.description}</Box>
          <Box className={style.status}>{order_status.description}</Box>
        </Flex>
      </Box>
    </NavLink>
  );
}
export default RowTable;
