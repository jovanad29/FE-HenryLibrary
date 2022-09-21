import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { startLogout } from "../../../actions";

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleCloseSesion = () => {
    dispatch(startLogout());
  };
  return (
    <Box>
      <Button background="#01A86C" size="lg" onClick={handleCloseSesion}>
        Logout
      </Button>
    </Box>
  );
}

export default Logout;
