import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

//cambiar por deleteCategory
import { deleteLogicBook } from "../../../../actions/index";

import style from "./RowTable.module.css";

function RowTable({ category }) {
  const dispatch = useDispatch();
  const { id, name , isActive } = category;

  const handleClick = (event) => {
    Swal.fire({
      icon: "warning",
      title: "Esta seguro que desea eliminar esta Categoría?",
      showConfirmButton: true,
      confirmButtonColor: "#01A86C",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
      focusDeny: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLogicBook(id));
      }
    });
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
              >
                {name}
              </Text>
            {/* </VStack> */}
       


        
{/* //cambiar a ruta de edicion de la categoria */}

          {/* <NavLink
            to={{ pathname: `/user/admin/catalogue/${id}`, props: book }}
          > */}
            {/* <Button colorScheme="green" size="xs">
              Editar
              </Button>
          </NavLink> */}
          <Button colorScheme="red" size="xs" onClick={handleClick}>
            Eliminar
          </Button>
        {/* </Box> */}
      </Flex>
    </Box>
  );
}
export default RowTable;
