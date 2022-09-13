import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { MdPayment } from "react-icons/md";

function OrdersMenu() {
  return (
    <Box mt="25%">
      <Flex justifyContent="center">
        <MdPayment size="12%" />
        <Heading fontFamily="Quicksand" as="h2" size="md" ml="8%">
          Ordenes
        </Heading>
      </Flex>
    </Box>
  );
}

export default OrdersMenu;
