import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import BreadCrumb from "./BreadCrumb";
import Logout from "./Logout";

function NavBar() {
  return (
    <Box pl="18%" pr="5%" pt="3%" pb="2%">
      <Flex justifyContent="space-between">
        <BreadCrumb />
        <Logout />
      </Flex>
    </Box>
  );
}

export default NavBar;
