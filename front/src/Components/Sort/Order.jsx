import React from "react";
import { orderByPrice, orderByRating, orderBySoldCopies } from "../../actions";
import { useDispatch } from "react-redux";

export default function Order() {
  const dispatch = useDispatch();

  //ORDENAMIENTO POR PRECIO
  const ordenByPriceHandler = (e) => {
    e.preventDefault();

    dispatch(orderByPrice(e.target.value));
  };
  //ORDENAMIENTO POR RATING
  const ordenByRatingHandler = (e) => {
    e.preventDefault();

    dispatch(orderByRating(e.target.value));
  };

  //ORDENAMIENTO POR VENTAS
  const ordenBySoldCopiesHandler = (e) => {
    e.preventDefault();

    dispatch(orderBySoldCopies(e.target.value));
  };

  return (
    <section>
      <select onChange={(e) => ordenByPriceHandler(e)}>
        <option value="mayor">Mayor precio</option>
        <option value="menor">Menor precio</option>
      </select>
      <select onChange={(e) => ordenByRatingHandler(e)}>
        <option value="mayor">Mejor calificación</option>
        <option value="menor">Peor calificación</option>
      </select>
      <select onChange={(e) => ordenBySoldCopiesHandler(e)}>
        <option value="mayor">Más vendidos</option>
        <option value="menor">Menos vendidos</option>
      </select>
    </section>
  );
}
