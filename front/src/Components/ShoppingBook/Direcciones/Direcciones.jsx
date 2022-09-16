import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

//CSS
import styles from "./Direcciones.module.css";
import { Flex, FormControl, FormLabel, RadioGroup, Radio, Input } from "@chakra-ui/react";
import { getUserInfo } from '../../../actions/index';

export default function Direcciones() {
  let [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { address, uid } = useSelector((state) => state);
  const [checkbottom, setCheckbottom] = useState("1") //Estado para el manejo de checkbox



  const [input, setInput] = useState({
    addressUser: address ? address : "",
    otherAddress: ""
  }) //Estado para el manejo de direccioes);



  useEffect(() => {
    dispatch(getUserInfo(uid));

  }, [dispatch, uid]);


  let handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }


  let validate = input => {

    let errors = {};

    if ((!input.addressUser && checkbottom === "1") || (!input.otherAddress && checkbottom === "2"))
      return errors.name = 'Debe ingresar un domicilio de envío o seleccionar retirar en sucursal'

    if (checkbottom === "1") {
      if (input.addressUser.length > 100 || input.addressUser.length < 20) errors.name = "La direccion debe  tener entre 20 y 100 caracteres"
      if (input.addressUser[0] === " ") errors.name = "El primer caracter no puede ser un espacio"
    }

    if (checkbottom === "2") {
      if (!input.otherAddress || input.otherAddress.length > 100 || input.otherAddress.length < 20) errors.name = "La direccion debe  tener entre 200 y 100 caracteres"
      if (input.otherAddress[0] === " ") errors.name = "El primer caracter no puede ser un espacio"
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const pickUpInStore = 'Retira en sucursal el cliente'
    if (checkbottom === "1") {
      //dispatch(updateAdrress(uid,input.addressUser));//ruta nueva de user
      dispatch(getUserInfo(uid))
      // dispatch(updateDeliveryAddress(uid,input.addressUser)) // ruta nueva para payment
      console.log('otra direccion', input.addressUser);
    }
    if (checkbottom === "2") {
      //dispatch(updateDeliveryAddress(uid,otherAddress)) //ruta nueva para payment
      console.log('otra direccion', input.otherAddress);
    }
    if (checkbottom === "3") {
      //  dispatch(updateDeliveryAddress(uid,pickUpInStore)) //
      console.log('retira store', pickUpInStore);
    }
    alert(`Direccion de Envio registrado`);
  }

  

return (
  <div className={styles.containerDirecciones}> {/* Direcciones */}

    <h2 className={styles.titulo}>Indique el lugar de envio de la compra:</h2>

    <Flex className={styles.formularioContainer}>
      <FormControl
        isRequired
        className={styles.formulario} onSubmit={(e) => handleSubmit(e)}
      >
        <RadioGroup onChange={setCheckbottom} value={checkbottom}>
          <div className={styles.form}>
            <FormLabel className={styles.formLabel}>
              <Radio value="1"
                className={styles.radio}>
                Domicilio:</Radio></FormLabel>

            <Input
              type="text" placeholder='Ingrese dirección envio '
              name='addressUser'
              disabled={checkbottom !== "1"}
              value={input.addressUser}
              onChange={e => handleInputChange(e)}

              className={styles.input} focusBorderColor='#01A86C' />
            {checkbottom === "1" && errors.name && <p className={styles.errores} >{errors.name}</p>}
          </div>
          <div className={styles.form}>
            <FormLabel className={styles.formLabel}>
              <Radio value="2"
                className={styles.radio}>

                Otro Domicilio:
              </Radio>
            </FormLabel>
            <Input variant='outline' type="text" placeholder='Ingrese otra dirección de envío'
              name='otherAddress'
              value={input.otherAddress}
              disabled={checkbottom !== "2" || !input.addressUser}

              onChange={e => handleInputChange(e)}
              focusBorderColor='#01A86C' />
            {checkbottom === "2" && errors.name && <p className={styles.errores} >{errors.name}</p>}
          </div>

          <div className={styles.form}>
            <FormLabel className={styles.formLabel}>
              <Radio value="3"
                id="noDelivery"
                disabled={checkbottom !== "3"}
                className={styles.radio}>Retiro en sucural:</Radio></FormLabel>
          </div>
        </RadioGroup>

        <div  className={styles.button}>
          <button disabled={Object.keys(errors).length > 0} type="submit"
            className={styles.confirmar}>Guardar Dirección </button>
        </div>
      </FormControl>
    </Flex>

  </div>
)
}
