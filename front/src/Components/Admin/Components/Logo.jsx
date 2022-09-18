import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/">
      <Box fontFamily="Quicksand">
        <Flex justifyContent="center">
          <Heading fontFamily="Quicksand" as="h2" size="lg" color="#ABABAB">
            Librería
          </Heading>
          <Heading fontFamily="Quicksand" as="h2" size="lg" color="#01A86C">
            HENRY
          </Heading>
        </Flex>
      </Box>
    </NavLink>
  );
}

export default Logo;
