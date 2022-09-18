import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import style from "./UserView.module.css";
import RowTable from "./RowTable/RowTable";
import Menu from "../Components/Menu";
import Title from "../Components/Title";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../actions/dashboardActions";
import NavBar from "../Components/NavBar";

function UserView() {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <Box fontFamily="Quicksand">
            <Menu />
            <NavBar />
            <Title />

            <Box className={style.content}>
                {/* CABECERA */}
                <Flex className={style.table}>
                    <Box className={style.user}>Usuario</Box>
                    <Box className={style.address}>Direccion</Box>
                    <Box className={style.admin}>Administrador</Box>
                    <Box className={style.banned}>Bloquear</Box>
                    <Box className={style.edit}>Acciones</Box>
                </Flex>

                {/* INFORMACION */}
                {allUsers.map((user) => {
                    if (user.isActive)
                        return <RowTable key={user.uid} user={user} />;
                })}
            </Box>
        </Box>
    );
}

export default UserView;
