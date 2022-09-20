import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoriesMostBuy } from "../../../actions/dashboardActions";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieCategories() {
  const dispatch = useDispatch();
  const { categoriesMostBuies } = useSelector((estate) => estate);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
  };

  useEffect(() => {
    dispatch(getCategoriesMostBuy());
  }, [dispatch]);

  return (
    <Box ml="18%" w="30%" fontFamily="Quicksand">
      {console.log(categoriesMostBuies)}
      <Pie data={data} />
    </Box>
  );
}

export default PieCategories;
