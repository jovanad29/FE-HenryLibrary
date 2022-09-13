import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserView from "./UserView";
import { getAllUsers } from "../../actions/dashboardActions";
import { Box } from "@chakra-ui/react";

import Menu from "./Components/Menu";
import BreadCrumb from "./Components/BreadCrumb";
import Title from "./Components/Title";
import CardsInfo from "./Components/CardsInfo";

function Dashboard() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand" bgColor="blackAlpha.50">
      <Menu />
      <BreadCrumb />
      <Title />

      <Box ml="20%" mt="5%">
        <CardsInfo />
      </Box>
    </Box>
  );
}

export default Dashboard;
