import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/dashboardActions";
import { Box } from "@chakra-ui/react";

import Menu from "./Components/Menu";
import Title from "./Components/Title";
import NavBar from "./Components/NavBar";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />
    </Box>
  );
}

export default Dashboard;
