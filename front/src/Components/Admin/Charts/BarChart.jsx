import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

function BarChart({ paymentsStatistics }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    labels: paymentsStatistics?.map((data) => data.description),
    datasets: [
      {
        label: "Detalles de Ordenes de Compra",
        data: paymentsStatistics?.map((data) => data.TotalCount),
        backgroundColor: ["#01A86C", "#94d5bd"],
      },
    ],
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Quicksand",
          },
        },
        data: {
          font: {
            size: 14,
            family: "Quicksand",
          },
        },
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <Box ml="18%" w="30%" fontFamily="Quicksand">
      <Bar data={userData} options={options} />
    </Box>
  );
}

export default BarChart;
