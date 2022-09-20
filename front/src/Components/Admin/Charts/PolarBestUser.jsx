import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersMostBuy } from "../../../actions/dashboardActions";
import styles from "./Charts.module.css";

function PolarBestUser() {
  const dispatch = useDispatch();
  const { usersMostBuies } = useSelector((estate) => estate);

  const [usersData, setUsersData] = useState({ datasets: [] });

  useEffect(() => {
    dispatch(getUsersMostBuy());
  }, [dispatch]);

  useEffect(() => {
    const data =
      usersMostBuies.length >= 5
        ? usersMostBuies.splice(0, 5)
        : JSON.parse(JSON.stringify(usersMostBuies));
    setUsersData({
      labels: data.map((d) => d.nameUser),
      datasets: [
        {
          data: data.map((d) => {
            if (d.totalBookBuy) {
              return parseFloat(d.totalBookBuy).toFixed(2);
            }
            return 0;
          }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [usersMostBuies]);

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  return (
    <Box className={styles.content} w="30%" fontFamily="Quicksand">
      <Heading className={styles.head}>Mejores Clientes</Heading>
      <PolarArea data={usersData} />
    </Box>
  );
}

export default PolarBestUser;
