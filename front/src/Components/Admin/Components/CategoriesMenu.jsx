import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";

function CategoriesMenu() {
  return (
    <Box mt="25%">
      <NavLink to={`/user/admin/categories`}>
        <Flex justifyContent="flex-start">
          <MdCategory size="12%" color="#01A86C" />
          <Heading
            fontFamily="Segoe UI"
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
