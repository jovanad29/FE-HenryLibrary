import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";

function OrdersMenu() {
  return (
    <Box mt="25%">
      <NavLink to={`/user/admin/payments`}>
        <Flex justifyContent="center">
          <MdPayment size="12%" color="#01A86C" />
          <Heading
            fontFamily="Quicksand"
            as="h2"
            size="md"
            ml="8%"
            color="#01A86C"
          >
            Ordenes
          </Heading>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default OrdersMenu;
