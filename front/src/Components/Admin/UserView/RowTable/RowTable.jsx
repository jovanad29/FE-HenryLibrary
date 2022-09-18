import {
    Box,
    Button,
    Flex,
    Image,
    Switch,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";

import style from "./RowTable.module.css";

import { AiFillEdit } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
    deleteUser,
    setUserAdmin,
    setUserBanned,
    startResetPasswordEmail,
} from "../../../../actions";
import { getAllUsers } from "../../../../actions/dashboardActions";

function RowTable({ user }) {
    const { uid, nameUser, email, profilePic, isAdmin, address, isBanned } =
        user;

    const dispatch = useDispatch();

    const handleResetPassword = () => {
        dispatch(startResetPasswordEmail({ email }));
    };

    const handleDeleteUser = () => {
        Swal.fire({
            icon: "warning",
            title: "Esta seguro que desea eliminar este usuario?",
            showConfirmButton: true,
            confirmButtonColor: "#01A86C",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: "No",
            focusDeny: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(uid));
            }
        });
    };

    const handleBannedUser = () => {
        dispatch(setUserBanned(uid));
    };

    const handleUserAdmin = () => {
        dispatch(setUserAdmin(uid));
    };

    return (
        <Box className={style.content}>
            <Flex className={style.table}>
                <Box className={style.user}>
                    <Flex>
                        {profilePic ? (
                            <Image
                                className={style.image}
                                src={profilePic}
                                boxSize="90px"
                            />
                        ) : (
                            <FaUserAlt className={style.noImage} size="90px" />
                        )}
                        <VStack className={style.infoUser}>
                            <Text noOfLines={1} className={style.nameUser}>
                                {nameUser}
                            </Text>
                            <Text noOfLines={1} className={style.uid}>
                                {uid}
                            </Text>
                            <Text noOfLines={1} className={style.email}>
                                {email}
                            </Text>
                        </VStack>
                    </Flex>
                </Box>
                <Box className={style.address}>
                    {address ? address : "None"}
                </Box>
                <Box className={style.admin}>
                    <Switch
                        colorScheme="green"
                        defaultChecked={isAdmin || email === "admin@gmail.com"}
                        isReadOnly={email === "admin@gmail.com"}
                        onChange={handleUserAdmin}
                    />
                </Box>
                <Box className={style.banned}>
                    <Switch
                        colorScheme="green"
                        defaultChecked={isBanned}
                        isReadOnly={email === "admin@gmail.com"}
                        onChange={handleBannedUser}
                    />
                </Box>
                <Box className={style.edit}>
                    <Button
                        colorScheme="green"
                        size="xs"
                        onClick={handleResetPassword}
                        disabled={email === "admin@gmail.com"}
                    >
                        Restablecer Contraseña
                    </Button>
                    <Button
                        colorScheme="red"
                        size="xs"
                        onClick={handleDeleteUser}
                        disabled={email === "admin@gmail.com"}
                    >
                        Eliminar
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
}
export default RowTable;
