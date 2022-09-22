import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Select } from "@chakra-ui/react";

import style from "./PaymentsView.module.css";
import RowTable from "./RowTable/RowTable";

import Menu from "../Components/Menu";
import Title from "../Components/Title";
import NavBar from "../Components/NavBar";

import {
  filterByStatusOrder,
  getAllOrders,
  getAllOrderStatus,
} from "../../../actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";

function PaymentsView() {
  const dispatch = useDispatch();
  const { allOrders, allOrderStatus, filterOrders } = useSelector(
    (state) => state
  );
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllOrderStatus());
  }, [dispatch]);

  const onSelectHandler = (event) => {
    const id = Number(event.target.value);
    setFilter(true);

    if (id === 1000) {
      setOrders([...JSON.parse(JSON.stringify(allOrders))]);
    } else {
      dispatch(filterByStatusOrder(id));
    }
  };

  useEffect(() => {
    !filter
      ? setOrders([...JSON.parse(JSON.stringify(allOrders))])
      : setOrders([...JSON.parse(JSON.stringify(filterOrders))]);
  }, [filterOrders, allOrders, filter]);

  return (
    <Box fontFamily="Segoe UI" className={style.claroOscuro}>
      <Menu />
      <NavBar />
      <Title />

      <Box ml="19%" mt="4%">
        <Flex>
          <Box fontWeight="bold" color="#01A86C">
            <label className={style.claroOscuro} fontFamily="Segoe UI">
              Ordenar Por:
            </label>
          </Box>
          <Select
            variant="flushed"
            width="10%"
            ml="1%"
            size="sm"
            borderColor="#01A86C"
            focusBorderColor="#01A86C"
            fontWeight="semibold"
            cursor="pointer"
            onChange={(e) => onSelectHandler(e)}
            className={style.claroOscuro}
            fontFamily="Segoe UI"
          >
            <option key={1000} value={1000}>
              TODAS
            </option>
            {allOrderStatus?.map((status) => {
              return (
                <option key={status.id} value={status.id}>
                  {status.description}
                </option>
              );
            })}
          </Select>
        </Flex>
      </Box>

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
        {orders?.map((payment) => (
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
