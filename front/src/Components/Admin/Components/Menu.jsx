import React from "react";

import { Box, Divider } from "@chakra-ui/react";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import OrdersMenu from "./OrdersMenu";

function Menu() {
  return (
    <Box
      border="2px solid green"
      borderRadius="20px"
      height="57rem"
      width="14%"
      maxWidth="14%"
      padding="1.5%"
      ml="1%"
      mt="1%"
      pos="fixed"
      fontFamily="Quicksand"
    >
      <Logo />

      <Divider mt="15%" />

      <UserMenu />

      <OrdersMenu />
    </Box>
  );
}

export default Menu;
