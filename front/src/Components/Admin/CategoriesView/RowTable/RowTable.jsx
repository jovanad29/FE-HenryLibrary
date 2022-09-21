import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

//cambiar por deleteCategory
import { deleteCategory } from "../../../../actions/index";

import style from "./RowTable.module.css";

function RowTable({ category }) {
  const dispatch = useDispatch();
  const { id, name } = category;

  const handleClick = (event) => {
    Swal.fire({
      icon: "warning",
      title: "Esta seguro que desea eliminar este género?",
      showConfirmButton: true,
      confirmButtonColor: "#01A86C",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
      focusDeny: true,
    }).then((result) => {
      if (result.isConfirmed) {
        
          dispatch(deleteCategory(id))
        
         
        }
      }
    );
  };

  return (
    <Box className={style.content}>
      <Flex >
              <Text
                noOfLines={1}
                height="100%"
                paddingLeft="5%"
                paddingRight="8%"
                fontWeight="bold"
                className={style.text}
              >
                {name}
              </Text>
              <Text

                height="50%"
                paddingLeft="5%"
                paddingRight="8%"
                fontWeight="bold"
                className={style.text}
              >
                {id}  
              </Text>
 
          <Button background="red" size="" color='white' onClick={handleClick}  _focus={{border: "2px solid red" }}>
            Eliminar
          </Button>

      </Flex>
    </Box>
  );
}
export default RowTable;
