import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { AiFillDashboard } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function DashboardMenu() {
  return (
    <Box mt="25%">
      <NavLink to={`/user/admin`}>
        <Flex justifyContent="center">
          <AiFillDashboard size="12%" color="#01A86C" />
          <Heading
            fontFamily="Quicksand"
            as="h2"
            size="md"
            ml="8%"
            color="#01A86C"
          >
            Dashboard
          </Heading>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default DashboardMenu;
