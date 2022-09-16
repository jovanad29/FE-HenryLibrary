import { Box, Flex, Image, Switch, Text, VStack } from "@chakra-ui/react";
import React from "react";

import style from "./RowTable.module.css";

import { AiFillEdit } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

function RowTable({ user }) {
  const {
    uid,
    nameUser,
    email,
    isActive,
    profilePic,
    isAdmin,
    address,
    isBanned,
  } = user;
  return (
    <Box className={style.content}>
      <Flex className={style.table}>
        <Box className={style.user}>
          <Flex>
            {profilePic ? (
              <Image className={style.image} src={profilePic} boxSize="90px" />
            ) : (
              <FaUserAlt className={style.noImage} size="90px" />
            )}
            <VStack className={style.infoUser}>
              <Text noOfLines={1} className={style.nameUser}>
                {nameUser}
                {console.log(nameUser)}
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
        <Box className={style.address}>{address ? address : "None"}</Box>
        <Box className={style.ative}>
          <Switch isChecked={isActive} colorScheme="green" />
        </Box>
        <Box className={style.admin}>
          <Switch isChecked={isAdmin} colorScheme="green" />
        </Box>
        <Box className={style.banned}>
          <Switch isChecked={isBanned} colorScheme="green" />
        </Box>
        <Box className={style.edit}>
          <AiFillEdit className={style.fillEdit} size="30px" />
        </Box>
      </Flex>
    </Box>
  );
}
export default RowTable;
