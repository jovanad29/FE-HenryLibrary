import React from "react";
import { Box, Select } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import { orderBy, getAllBooks } from "../../actions";
import { useDispatch } from "react-redux";

export default function Order() {
  const dispatch = useDispatch();
  const sorts = [
    { id: 1, title: "", value: "defecto" },
    { id: 2, title: "Más vendidos", value: "masVendidos" },
    { id: 3, title: "Menos vendidos", value: "menosVendidos" },
    { id: 4, title: "Mayor precio", value: "mayorPrecio" },
    { id: 5, title: "Menor precio", value: "menorPrecio" },
    { id: 6, title: "Mejor calificación", value: "mayorRating" },
    { id: 7, title: "Peor calificación", value: "menorRating" },
  ];

  //ORDENAMIENTO
  const ordenByHandler = (event) => {
    event.preventDefault();

    const selected = event.target.value;

    if (selected === "defecto") {
      dispatch(getAllBooks());
    } else {
      dispatch(orderBy(selected));
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        fontFamily="Quicksand"
      >
        <Box fontWeight={"bold"}>
          <label>Ordenado por: </label>
        </Box>
        <Select
          size="sm"
          borderColor="#01A86C"
          focusBorderColor="#01A86C"
          variant={"flushed"}
          icon={<BsChevronDown />}
          width={"59%"}
          fontWeight={"semibold"}
          cursor="pointer"
          onChange={ordenByHandler}
        >
          {sorts.map((sort) => (
            <option key={sort.id} value={sort.value}>
              {sort.title}
            </option>
          ))}
        </Select>
      </Box>
    </>
  );
}
