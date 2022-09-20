import React from "react";

import { Box, Divider } from "@chakra-ui/react";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import OrdersMenu from "./OrdersMenu";
import CatalogueMenu from "./CatologueMenu";
import CategoriesMenu from "./CategoriesMenu";
import DashboardMenu from "./DashboardMenu";
import styles from "./Menu.module.css";
import NavBar2 from "../../NavBar2/NavBar2.jsx";



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
      fontFamily="Segoe UI"
      className={styles.claroOscuroAdmin}
    >
      <div className={styles.icono}>
        <div className={styles.icono2}><NavBar2/></div>
      </div>

      <Logo />

      <Divider mt="15%" />

      <DashboardMenu />

      <CatalogueMenu />

      <CategoriesMenu />

      <UserMenu />

      <OrdersMenu />
    </Box>
  );
}

export default Menu;
