import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";

function UserMenu() {
  return (
    <Box mt="25%">
      <Flex justifyContent="center">
        <FaUser size="10%" />
        <Heading fontFamily="Quicksand" as="h2" size="md" ml="8%">
          Usuarios
        </Heading>
      </Flex>
    </Box>
  );
}

export default UserMenu;
