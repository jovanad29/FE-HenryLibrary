import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllOrders } from "../../actions/dashboardActions";
import { Box } from "@chakra-ui/react";
import styles from "./Dashboard.module.css"
import Menu from "./Components/Menu";
import Title from "./Components/Title";
import NavBar from "./Components/NavBar";
// import NavBar2 from "../NavBar2/NavBar2.jsx"
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
    <>
    {/* <div className={styles.icono}><NavBar2 /></div> */}
    <Box className={styles.claroOscuroAdmin} fontFamily='Segoe UI'>
      <Menu />
      <NavBar />
      <Title />
      <BarChart paymentsStatistics={paymentsStatistics} />
    </Box>
    </>
  );
}

export default Dashboard;
