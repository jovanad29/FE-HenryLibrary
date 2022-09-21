import React from "react";
import { Box, Select } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import styles from "./Order.module.css"
import { orderBy, getAllBooks } from "../../actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Order() {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const sorts = [
    { id: 1, title: "", value: "defecto" },
    { id: 2, title: t("masVendidos"),  value: "masVendidos" },
    { id: 3, title: t("menosVendidos"), value: "menosVendidos" },
    { id: 4, title: t("mayorPrecio"),   value: "mayorPrecio" },
    { id: 5, title: t("menorPrecio"),   value: "menorPrecio" },
    { id: 6, title: t("mayorRating"),   value: "mayorRating" },
    { id: 7, title: t("menorRating"),   value: "menorRating" },
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
          <label className={styles.claroOscuro} fontFamily= 'Segoe UI'>{t("ordenarPor")}: </label>
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
          className={styles.claroOscuro}
          fontFamily= 'Segoe UI'
        >
          {sorts.map((sort) => (
            <option key={sort.id} value={sort.value} className={styles.claroOscuro}>
              {sort.title}
            </option>
          ))}
        </Select>
      </Box>
    </>
  );
}
