import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import style from "./PaymentsView.module.css";
import RowTable from "./RowTable/RowTable";

import Menu from "../Components/Menu";
import Title from "../Components/Title";
import NavBar from "../Components/NavBar";

import {
  getAllOrders,
  getAllOrderStatus,
} from "../../../actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";

function PaymentsView() {
  const dispatch = useDispatch();
  const { allOrders, allOrderStatus } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllOrderStatus());
  }, [dispatch]);

  return (
    <Box fontFamily="Segoe UI" className={style.claroOscuroAdmin}>
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.numOrder}>Nº Orden</Box>
          <Box className={style.user}>Usuario</Box>
          <Box className={style.email}>E-mail</Box>
          <Box className={style.items}>Cantidad</Box>
          <Box className={style.amount}>Importe/s</Box>
          <Box className={style.date}>Fecha Compra</Box>
          <Box className={style.paymentMethod}>Pago</Box>
          <Box className={style.status}>Estado</Box>
        </Flex>

        {/* INFORMACION */}
        {allOrders.map((payment) => (
          <RowTable
            key={payment.id}
            allPayments={payment}
            allOrderStatus={allOrderStatus}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PaymentsView;
