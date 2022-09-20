import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, getAllOrders } from "../../actions/dashboardActions";
import { Box, Flex } from "@chakra-ui/react";
import styles from "./Dashboard.module.css";
import Menu from "./Components/Menu";
import Title from "./Components/Title";
import NavBar from "./Components/NavBar";
import BarChartPayments from "./Charts/BarChartPayments";
import PieCategories from "./Charts/PieCategories";
import PolarBestUser from "./Charts/PolarBestUser";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      {/* <div className={styles.icono}><NavBar2 /></div> */}
      <Box className={styles.claroOscuroAdmin} fontFamily="Segoe UI">
        <Menu />
        <NavBar />
        <Title />

        <Box className={styles.contentCharts}>
          <Box className={styles.contentUserCategories}>
            <PolarBestUser />
            <PieCategories />
          </Box>
          <Box className={styles.contentUserCategories}>
            <BarChartPayments />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
