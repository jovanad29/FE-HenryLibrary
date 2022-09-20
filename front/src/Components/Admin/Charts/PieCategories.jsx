import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoriesMostBuy } from "../../../actions/dashboardActions";

function PieCategories() {
  const dispatch = useDispatch();
  const { categoriesMostBuies } = useSelector((estate) => estate);

  const [categoriesData, setCategoriesData] = useState({ datasets: [] });

  useEffect(() => {
    dispatch(getCategoriesMostBuy());
  }, [dispatch]);

  useEffect(() => {
    const data = categoriesMostBuies.splice(0, 4);
    setCategoriesData({
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: "Categorias mas vendidas",
          data: data.map((d) => d.soldCopies),
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
  }, [categoriesMostBuies]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Box ml="18%" w="30%" fontFamily="Quicksand">
      <Pie data={categoriesData} />
    </Box>
  );
}

export default PieCategories;
