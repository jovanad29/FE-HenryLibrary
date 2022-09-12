import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

//CSS
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "./DashboardUser.module.css";

function DashboardUser() {
  return (
    <div className={styles.dashboardUser}>
      <NavBar />
      <NavBar2 />

      <div className={styles.container}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab >Datos Personales</Tab>
            <Tab>Direcciones</Tab>
            <Tab>Ordenes de compras</Tab>
            <Tab>Historial de Comentarios</Tab>
            <Tab>Seguridad</Tab>
          </TabList>
          <TabPanels className={styles.containerItem}>
            <TabPanel >
              <div>Datos personales</div>
            </TabPanel>
            <TabPanel>
            <div>Direcciones</div>
            </TabPanel>
            <TabPanel>
              <p>Ordenes de compras</p>
            </TabPanel>
            <TabPanel>
              <p>Historial de Comentario</p>
            </TabPanel>
            <TabPanel>
            <div>Seguridad</div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardUser;

