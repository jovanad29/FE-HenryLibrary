import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, getAllOrders } from "../../actions/dashboardActions";
import { Box } from "@chakra-ui/react";

import Menu from "./Components/Menu";
import Title from "./Components/Title";
import NavBar from "./Components/NavBar";
import BarChartPayments from "./Charts/BarChartPayments";
import PieCategories from "./Charts/PieCategories";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />
      <BarChartPayments />
      <PieCategories />
    </Box>
  );
}

export default Dashboard;
