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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentsStatistics } from "../../../actions";

function BarChartPayments() {
  const dispatch = useDispatch();
  const { paymentsStatistics } = useSelector((state) => state);

  const [paymentsData, setPaymentsData] = useState({ datasets: [] });

  useEffect(() => {
    dispatch(getPaymentsStatistics());
  }, [dispatch]);

  useEffect(() => {
    setPaymentsData({
      labels: paymentsStatistics?.map((data) => data.description),
      datasets: [
        {
          label: "Detalles de Ordenes de Compra",
          data: paymentsStatistics?.map((data) => data.TotalCount),
          backgroundColor: ["rgba(1, 168, 108, 0.2)"],
          borderColor: ["rgba(1, 168, 108)"],
          borderWidth: 2,
        },
      ],
    });
  }, [paymentsStatistics]);

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
        display: false,
        position: "top",
        labels: {
          color: false,
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
      <Bar data={paymentsData} options={options} />
    </Box>
  );
}

export default BarChartPayments;
