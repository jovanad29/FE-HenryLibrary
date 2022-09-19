import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { UserData } from "./data";
import Chart from "chart.js/auto";
import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function BarChart() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Cantidad de Visitantes",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#01A86C", "#94d5bd"],
      },
    ],
  });

  useEffect(() => {
    // dispatch(paymentsStatistics());
  }, [dispatch]);

  return (
    <Box ml="18%" w="30%">
      <Bar data={userData} />
    </Box>
  );
}

export default BarChart;
