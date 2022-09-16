import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const FORM_ID = "payment-form";

export default function MercadoPago({ items, setLoading, userID }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const history = useHistory();
  useEffect(() => { // cuando se monta (en /checkout) pide el preferenceId a MP
    // console.log("Estoy en el primer userEffect: ", userID)
    axios
    .post("/mercadopago", {
        items,
        base_url: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
        ID: userID,
      })
      .then((order) => {
        setPreferenceId(order.data.preferenceId);
      })
      .catch((error) => {
        console.log(error) // el error no se imprime en el swal
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        }).then(() => {
          history.push("/"); // checkout?
        });
      });
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   
  useEffect(() => {
   // console.log('estoy en mercado pago ' , preferenceId)
    if (preferenceId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
      setTimeout(() => {
        const button = document.querySelector(".mercadopago-button");
        button.innerHTML = "Pagar (Mercado Pago)";
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceId]);
  return <form id={FORM_ID} method="GET" />; // esto es el botón
}
