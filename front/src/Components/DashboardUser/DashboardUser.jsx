import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";
import PurchaseOrders from "../PurchaseOrders/PurchaseOrders.jsx";

//CSS
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "./DashboardUser.module.css";
import ReviewUser from "./ReviewUser/ReviewUser.jsx";


function DashboardUser() {

  const {status, displayName, email, reviews, uid} = useSelector (state => state)



  
  return (
    <div className={styles.dashboardUser}>
      <NavBar />
      <NavBar2 />

      <div className={styles.container}>
        <Tabs variant="soft-rounded" colorScheme='green'  >
          <TabList>
            <Tab className={styles.titulos}>Datos Personales</Tab>
            <Tab className={styles.titulos}>Direcciones</Tab>
            <Tab className={styles.titulos}>Ordenes de compras</Tab>
            <Tab className={styles.titulos}>Historial de Comentarios</Tab>
            <Tab className={styles.titulos}>Seguridad</Tab>
          </TabList>
          <TabPanels className={styles.containerItem}>
            <TabPanel >
             <div>Datos personales</div>
            </TabPanel>
            <TabPanel>
            <div>Direcciones</div>
            </TabPanel>
            <TabPanel>
              <PurchaseOrders/>
            </TabPanel>
            <TabPanel>
              <ReviewUser uid={uid}/>
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

