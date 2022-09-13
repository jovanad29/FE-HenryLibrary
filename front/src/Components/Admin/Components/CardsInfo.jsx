import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { BsWallet2 } from "react-icons/bs";

function CardsInfo({ title }) {
  return (
    <Box>
      <Box borderRadius="20px" border="2px solid green" h="130px" w="400px">
        <Heading
          fontFamily="Quicksand"
          color="#01A86C"
          opacity="0.3"
          size="sm"
          mt="3%"
          ml="3%"
        >
          Today's Money
        </Heading>

        <Heading size="md" ml="3%">
          $53,897
        </Heading>

        <Flex ml="3%" mt="8%">
          <Heading color="#01A86C" size="xs">
            +3.48%
          </Heading>
          <Heading size="xs" ml="1%">
            Since last month
          </Heading>
        </Flex>
        <Box
          bgColor="#01A86C"
          borderRadius="100px"
          w="25px"
          h="25px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          ml="85%"
          mb="-50%"
        >
          <BsWallet2 />
        </Box>
      </Box>
    </Box>
  );
}

export default CardsInfo;
