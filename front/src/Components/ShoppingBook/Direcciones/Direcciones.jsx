import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
//CSS
import styles from "./Direcciones.module.css";
import {
  Flex,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Input,
  Button,
} from "@chakra-ui/react";
import { getUserInfo } from "../../../actions/index";
import {
  setDeliveryAddress,
  setAddressUser,
  setItems,
} from "../../../actions/checkoutActions";
import { useTranslation } from "react-i18next";

export default function Direcciones() {
  let [errors, setErrors] = useState({});
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { address, uid } = useSelector((state) => state);
  const [checkbottom, setCheckbottom] = useState("1");
  const [input, setInput] = useState({
    addressUser: address ? address : "",
    otherAddress: "",
  });

  useEffect(() => {
    if (uid) {
      dispatch(getUserInfo(uid));
      setInput({
        ...input,
        addressUser: address,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, uid, address]);

  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  let validate = (input) => {
    let errors = {};

    if (
      (!input.addressUser && checkbottom === "1") ||
      (!input.otherAddress && checkbottom === "2")
    )
      return (errors.name = t("debeConfirmarAddress"));

    if (checkbottom === "1") {
      if (input.addressUser.length > 100 || input.addressUser.length < 20)
        errors.name = t("errorDirCantCaracteres");
      if (input.addressUser[0] === " ")
        errors.name = t("errorDirEspacio");
    }

    if (checkbottom === "2") {
      if (
        !input.otherAddress ||
        input.otherAddress.length > 100 ||
        input.otherAddress.length < 20
      )
        errors.name = t("errorDirCantCaracteres");
      if (input.otherAddress[0] === " ")
        errors.name = t("errorDirEspacio");
    }
    return errors;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      (!input.addressUser && checkbottom === "1") ||
      (!input.otherAddress && checkbottom === "2")
    )
      return Swal.fire({
        title: t("debeConfirmarAddress"),
        icon: "info",
        confirmButtonColor: "#01A86C",
        confirmButtonText: t("aceptar"),
      });

    if (checkbottom === "1") {
      dispatch(setAddressUser(uid, input.addressUser));
      dispatch(getUserInfo(uid));
      dispatch(setDeliveryAddress(input.addressUser));
    }

    if (checkbottom === "2") {
      dispatch(setDeliveryAddress(input.otherAddress));
    }

    if (checkbottom === "1" || checkbottom === "2") {
      const items = {
        id: 0,
        unit_price: 1000,
        picture_url:
          "https://media.istockphoto.com/vectors/free-shipping-and-delivery-icon-symbol-vector-id1290078102",
        quantity: 1,
        title: t("gastoEnvio"),
        description:
          checkbottom === "1" ? input.addressUser : input.otherAddress,
      };
      dispatch(setItems([items]));
    }
    if (checkbottom === "3") {
      const pickUpInStore = "Retira en sucursal";
      dispatch(setDeliveryAddress(pickUpInStore));
      const items = {
        id: 0,
        unit_price: 0,
        picture_url:
          "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/shakespeare-and-co-old-antique-book-shop-paris-france-ubachde-la-riva.jpg",
        quantity: 1,
        title: t("gastoEnvio"),
        description: "Retira en Sucursal",
      };
      dispatch(setItems([items]));
    }
    return Swal.fire({
      title: t("dirConfirmada"),
      icon: "info",
      confirmButtonColor: "#01A86C",
      confirmButtonText: t("aceptar")
    });
  }
  return (
    <div className={styles.containerDirecciones}>
      {" "}
      {/* Direcciones */}
      <h2 className={styles.titulo}>{t("dirEnvio")}:</h2>
      <Flex className={styles.formularioContainer}>
        <FormControl isRequired className={styles.formulario}>
          <RadioGroup onChange={setCheckbottom} value={checkbottom}>
            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio value="1" className={styles.radio}>
                  {t("direccion")}:
                </Radio>
              </FormLabel>

              <Input
                type="text"
                placeholder={t("direccion")}
                name="addressUser"
                disabled={checkbottom !== "1"}
                value={input.addressUser}
                onChange={(e) => handleInputChange(e)}
                className={styles.input}
                focusBorderColor="#01A86C"
              />
              {checkbottom === "1" && errors.name && (
                <p className={styles.errores}>{errors.name}</p>
              )}
            </div>
            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio value="2" className={styles.radio}>
                {t("otraDireccion")}:
                </Radio>
              </FormLabel>
              <Input
                variant="outline"
                type="text"
                placeholder={t("otraDireccion")}
                name="otherAddress"
                value={input.otherAddress}
                disabled={checkbottom !== "2"}
                onChange={(e) => handleInputChange(e)}
                focusBorderColor="#01A86C"
                className={styles.input2}
              />
              {checkbottom === "2" && errors.name && (
                <p className={styles.errores}>{errors.name}</p>
              )}
            </div>

            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio
                  value="3"
                  disabled={checkbottom !== "3"}
                  className={styles.radio}
                >
                  {t("retiraSucursal")}
                </Radio>
              </FormLabel>
            </div>
          </RadioGroup>

          <div className={styles.button}>
            <Button
              w="40%"
              backgroundColor="#01A86C"
              variant="solid"
              onClick={handleSubmit}
              className={styles.confirmar}
              disabled={JSON.stringify(errors) === "{}" ? false : true}
            >
              {t("confirmar")}
            </Button>
          </div>
        </FormControl>
      </Flex>
    </div>
  );
}
