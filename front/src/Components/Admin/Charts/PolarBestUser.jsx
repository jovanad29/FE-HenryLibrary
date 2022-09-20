import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PolarBestUser() {
  const data = {
    labels: [
      "Usuario1",
      "Usuario2",
      "Usuario3",
      "Usuario4",
      "Usuario5",
      "Usuario6",
    ],
    datasets: [
      {
        data: [50, 48, 30, 25, 12, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box ml="18%" w="30%" fontFamily="Segoe UI">
      <PolarArea data={data} />
    </Box>
  );
}

export default PolarBestUser;
