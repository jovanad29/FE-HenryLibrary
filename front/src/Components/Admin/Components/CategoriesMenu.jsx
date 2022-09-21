import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { IoLibrarySharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function CategoriesMenu() {
  return (
    <Box mt="25%">
      <NavLink to={`/user/admin/categories`}>
        <Flex justifyContent="center">
          <IoLibrarySharp size="12%" color="#01A86C" />
          <Heading
            fontFamily="Quicksand"
            as="h2"
            size="md"
            ml="8%"
            color="#01A86C"
          >
            Géneros
          </Heading>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default CategoriesMenu;