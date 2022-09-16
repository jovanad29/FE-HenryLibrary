import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import style from "./UserView.module.css";
import RowTable from "./RowTable/RowTable";

function UserView({ allUsers }) {
  return (
    <>
      <Box className={style.content}>
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.user}>Usuario</Box>
          <Box className={style.address}>Direccion</Box>
          <Box className={style.ative}>Activo</Box>
          <Box className={style.admin}>Administrador</Box>
          <Box className={style.banned}>Bloquear</Box>
          <Box className={style.edit}>Editar</Box>
        </Flex>

        {/* INFORMACION */}
        {allUsers.map((user) => {
          console.log();
          return <RowTable key={user.uid} user={user} />;
        })}
      </Box>
    </>
  );
}

export default UserView;
