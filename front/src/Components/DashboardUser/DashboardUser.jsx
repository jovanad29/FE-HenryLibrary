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
import { useTranslation } from "react-i18next";

function DashboardUser() {
  const { status, displayName, email, reviews, uid } = useSelector(
    (state) => state
  );
  const { t } = useTranslation()

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    dispatch(startResetPasswordEmail({ email }));
    Swal.fire({
      title: t("correoEnviado"),
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
            <Tab className={styles.titulos} _focus={{ outlineColor: 'none' }}>{t("infoPersonal")}</Tab>
            <Tab className={styles.titulos} _focus={{ outlineColor: 'none' }}>{t("purchaseOrders")}</Tab>
            <Tab className={styles.titulos} _focus={{ outlineColor: 'none' }}>{t("commentsHistory")}</Tab>
            <Tab className={styles.titulos} _focus={{ outlineColor: 'none' }}>{t("seguridad")}</Tab>
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
                _focus={{ outlineColor: 'none' }}
                className={styles.reset}
              >
                {t("resetPass")}
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
