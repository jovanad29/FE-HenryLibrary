import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/dashboardActions";
import { Box } from "@chakra-ui/react";
import UserView from "./UserView/UserView";

import Menu from "./Components/Menu";
import BreadCrumb from "./Components/BreadCrumb";
import Title from "./Components/Title";
import CardsInfo from "./Components/CardsInfo";
import PaymentsView from "./PaymentsView/PaymentsView";

function Dashboard() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <BreadCrumb />
      <Title />

      {/* <Box ml="20%" mt="5%">
        <CardsInfo />
      </Box> */}
      <PaymentsView />
      {/* <UserView allUsers={allUsers} /> */}
    </Box>
  );
}

export default Dashboard;
