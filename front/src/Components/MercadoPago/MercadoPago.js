import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
const FORM_ID = "payment-form";

export default function MercadoPago({ items, setLoading, userID }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const history = useHistory();
  const { t } = useTranslation()
  useEffect(() => {
    axios
      .post("/mercadopago", {
        items,
        base_url: process.env.REACT_APP_BASE_URL || "http://localhost:3000",
        ID: userID,
      })
      .then((order) => {
        setPreferenceId(order.data.preferenceId);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        }).then(() => {
          history.push("/");
        });
      });
  }, []);

  useEffect(() => {
   
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
        button.innerHTML = t("pagarMP");
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceId]);
  
  return <form id={FORM_ID} method="GET" />;
}
