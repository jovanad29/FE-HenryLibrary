import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import BreadCrumb from "./BreadCrumb";
import Logout from "./Logout";

import styles from "../Dashboard.module.css"

function NavBar() {
  return (
    <Box pl="18%" pr="5%" pt="3%" pb="2%" className={styles.claroOscuroAdmin} >
      <Flex justifyContent="space-between">
        <BreadCrumb />
        <Logout />
      </Flex>
    </Box>
  );
}

export default NavBar;
