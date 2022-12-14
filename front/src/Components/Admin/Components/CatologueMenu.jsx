import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { IoLibrarySharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function CatalogueMenu() {
  return (
    <Box mt="25%">
      <NavLink to={`/user/admin/catalogue`}>
        <Flex justifyContent="flex-start">
          <IoLibrarySharp size="12%" color="#01A86C" />
          <Heading
            fontFamily="Segoe UI"
            as="h2"
            size="md"
            ml="8%"
            color="#01A86C"
          >
            Libros
          </Heading>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default CatalogueMenu;
