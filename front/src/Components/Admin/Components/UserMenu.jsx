import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <Box mt="25%">
      <NavLink to={`/user/admin/users`}>
        <Flex justifyContent="flex-start">
          <FaUser size="10%" color="#01A86C" />
          <Heading
            fontFamily="Segoe UI"
            as="h2"
            size="md"
            ml="8%"
            color="#01A86C"
          >
            Usuarios
          </Heading>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default UserMenu;
