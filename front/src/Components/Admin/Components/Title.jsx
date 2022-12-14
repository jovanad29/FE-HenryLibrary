import React from "react";

import { Box, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function Title() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Box pl="10.8%" textAlign="center" fontFamily="Quicksand">
      <Heading
        fontFamily="Quicksand"
        as="h2"
        size="md"
        ml="8%"
        fontSize="3xl"
        color="#01A86C"
      >
        {pathName.includes("catalogue")
          ? "Libros"
          : pathName.includes("users")
          ? "Usuarios"
          : pathName.includes("payments/")
          ? `Orden de Compra # ${pathName.split("/").pop()}`
          : pathName.includes("payments")
          ? "Ordenes de Compra"
          : pathName.includes("categories")
          ? "Géneros"
          : null}
      </Heading>
    </Box>
  );
}

export default Title;
