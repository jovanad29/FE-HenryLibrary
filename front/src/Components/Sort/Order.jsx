// import React from "react";
// import { orderByPrice, orderByRating, orderBySoldCopies } from "../../actions";
// import { useDispatch } from "react-redux";
//

//;

// export default function Order() {
//   const dispatch = useDispatch();


//   const handleChange = (event) => {
//     event.preventDefault();
//     const selected = event.target.value;

//     //ORDENAMIENTO POR VENTAS
//     if (selected === "bestSellers" || selected === "lessSold") {
//       dispatch(orderBySoldCopies(selected));
//     }

//     //ORDENAMIENTO POR PRECIO
//     if (selected === "higherPrice" || selected === "lowerPrice") {
//       dispatch(orderByPrice(selected));
//     }

//     //ORDENAMIENTO POR RATING
//     if (selected === "bestRating" || selected === "lowestRating") {
//       dispatch(orderByRating(selected));
//     }
//   };

//   return (
//     <Box
//       display={"flex"}
//       justifyContent={"center"}
//       alignItems={"center"}
//       fontFamily="Quicksand"
//     >
//       <Box fontWeight={"bold"}>
//         <label> Ordenado por: </label>
//       </Box>
//       <Select
//         size="sm"
//         borderColor="#01A86C"
//         focusBorderColor="#01A86C"
//         variant={"flushed"}
//         icon={<BsChevronDown />}
//         width={"40%"}
//         pl={"3%"}
//         fontWeight={"semibold"}
//         cursor="pointer"
//         onChange={handleChange}
//       >
//         {sorts.map((sort) => (
//           <option key={sort.id} value={sort.value}>
//             {sort.title}
//           </option>
//         ))}
//       </Select>
//     </Box>
//   );
// }

import React from "react";
import { orderBy, getAllBooks } from "../../actions";
import { useDispatch } from "react-redux";
import { Box, Select } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs"

export default function Order() {
  const dispatch = useDispatch();
    const sorts = [
    { id: 1, title: "Más vendidos", value: "bestSellers" },
    { id: 2, title: "Menos vendidos", value: "lessSold" },
    { id: 3, title: "Mayor precio", value: "higherPrice" },
    { id: 4, title: "Menor precio", value: "lowerPrice" },
    { id: 5, title: "Mejor calificación", value: "bestRating" },
    { id: 6, title: "Peor calificación", value: "lowestRating" },
  ];

  //ORDENAMIENTO
  const ordenByHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "defecto") {
      dispatch(getAllBooks());
    } else {
      dispatch(orderBy(e.target.value));
    }
  };

  return (
  <>
    <Box
      display={"flex"}
      justifyContent={"end"}
      alignItems={"center"}
      fontFamily="Quicksand"
      // width={"20%"}
    >
      <Box fontWeight={"bold"}>
        <label> Ordenado por: </label>
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
        onChange={(e) => ordenByHandler(e)}
      >
        {sorts.map((sort) => (
          <option key={sort.id} value={sort.value}>
            {sort.title}
          </option>
        ))}
      </Select>
    </Box>

    <section>
      <label>Ordenar por:</label>
      <select onChange={(e) => ordenByHandler(e)}>
        <option value="defecto"></option>
        <option value="mayorPrecio">Mayor precio</option>
        <option value="menorPrecio">Menor precio</option>
        <option value="mayorRating">Mejor calificación</option>
        <option value="menorRating">Peor calificación</option>
        <option value="masVendidos">Más vendidos</option>
        <option value="menosVendidos">Menos vendidos</option>
      </select>
    </section>
</>
  );
}
