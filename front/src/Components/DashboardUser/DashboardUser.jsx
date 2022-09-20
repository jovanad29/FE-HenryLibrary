import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";
import PurchaseOrders from "./PurchaseOrders/PurchaseOrders.jsx";
import ReviewUser from "./ReviewUser/ReviewUser.jsx";

//CSS
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import styles from "./DashboardUser.module.css";
import DataUser from "./DataUser/DataUser.jsx";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startResetPasswordEmail } from "../../actions/index.js";

function DashboardUser() {
  const { status, displayName, email, reviews, uid } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    dispatch(startResetPasswordEmail({ email }));
    Swal.fire({
      title: "Mail de reseteo de password enviado!",
      icon: "success",
      iconColor: "#01A86C",
      confirmButtonColor: "#01A86C",
    });
  };

  return (
    <div className={styles.dashboardUser}>
      <NavBar />
      <NavBar2 />

      <div className={styles.container}>
        <Tabs variant="solid-rounded" colorScheme="whatsapp">
          <TabList className={styles.containerItems}>
            <Tab className={styles.titulos}>Datos Personales</Tab>
            <Tab className={styles.titulos}>Ordenes de compras</Tab>
            <Tab className={styles.titulos}>Historial de Comentarios</Tab>
            <Tab className={styles.titulos}>Seguridad</Tab>
          </TabList>

          <TabPanels className={styles.containerItem}>
            <TabPanel>
              <DataUser uid={uid} />
            </TabPanel>

            <TabPanel>
              <PurchaseOrders />
            </TabPanel>

            <TabPanel>
              <ReviewUser uid={uid} />
            </TabPanel>

            <TabPanel className={styles.boton}>
              <Button
                w="40%"
                h="3.5rem"
                backgroundColor="#E43E3E"
                color="white"
                onClick={handleResetPassword}
              >
                Resetear contraseña
              </Button>
              {/* </div> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardUser;
