import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllOrders } from "../../actions/dashboardActions";
import { Box } from "@chakra-ui/react";

import Menu from "./Components/Menu";
import Title from "./Components/Title";
import NavBar from "./Components/NavBar";
import BarChart from "./Charts/BarChart";
import { getPaymentsStatistics } from "../../actions";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentsStatistics());
  }, [dispatch]);
  const { paymentsStatistics } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />
      <BarChart paymentsStatistics={paymentsStatistics} />
    </Box>
  );
}

export default Dashboard;
