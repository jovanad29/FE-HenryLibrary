import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

function Logo() {
  return (
    <Box fontFamily="Quicksand">
      <Flex justifyContent="center">
        <Heading fontFamily="Quicksand" as="h2" size="lg" color="#ABABAB">
          Libreria
        </Heading>
        <Heading fontFamily="Quicksand" as="h2" size="lg" color="#01A86C">
          HENRY
        </Heading>
      </Flex>
    </Box>
  );
}

export default Logo;
