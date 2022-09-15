import React, { useEffect, useState } from 'react'

//CSS
import styles from "./Direcciones.module.css";
import { Flex, FormControl, FormLabel, RadioGroup, Radio, Input } from "@chakra-ui/react";
import { getUserById } from '../../../actions/dataUserIdActions';
import { useId } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export default function Direcciones() {
  const { address, uid } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [addressUser, setAddress] = useState({   //Estado para el manejo de direccioes
    direccion: address ? address : "",
    otraDireccion: "",
    sucursal: false
  });
  const [input, setInput] = useState({})
  const [errors, setss] = useState({})
  useEffect(() => {
    dispatch(getUserById(uid));
  }, [dispatch]);

  function addressHandleChange() {
    alert("Estoy manejando la dirección")
  }

  let handleInputChange = e => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    
    setss(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}

  let validate = input => {
    let  isAlpha =/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/
    let ss = {};

    if (!input.name || input.name.length > 150 ||input.name.length < 4 ) errors.name = "El nombre debe tener entre 4 y 150 caracteres"
    if (input.name[0] === " ") errors.name = "El primer caracter no puede ser un espacio"
    if ((input.height )&&(input.height > 15 || input.height < 0.1 || !/^\d*\.?\d*$/.test(input.height))) errors.height = "El valor debe estar entre 0.1  y 15.0" 
    if ((input.weight )&&(input.weight > 1000 || input.weight < 0.1 || !/^\d*\.?\d*$/.test(input.weight))) errors.weight = "El valor debe estar entre 0.1 y 1000.0" 
    return errors;
}

  return (
    <div className={styles.containerDirecciones}> {/* Direcciones */}

      <h2 className={styles.titulo}>Indique el lugar de envio de la compra:</h2>

      <Flex className={styles.formularioContainer}>
        <FormControl
          isRequired
          className={styles.formulario}
        >
          <RadioGroup onChange={addressHandleChange} value={address}>
            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio value={address.direccion}
                  onChange={addressHandleChange} >
                  Domicilio:</Radio></FormLabel>

                  <Input variant='outline' value={address.direccion}
                        onChange={e=>handleInputChange(e)}
                  className={styles.input} focusBorderColor='#01A86C' />
            </div>
            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio value={address.otraDireccion}
                       onChange={addressHandleChange} className={styles.radio}>
                        Otro Domicilio:</Radio></FormLabel>
                <Input variant='outline' value={address.direccion}
                onChange={e=>handleInputChange(e)}  focusBorderColor='#01A86C' />
            </div>
            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio value={address.sucursal}
                  onChange={addressHandleChange}
                  className={styles.radio}>Retiro en sucural:</Radio></FormLabel>
            </div>
          </RadioGroup>
        </FormControl>
      </Flex>
      <h3 className={styles.errores}>Debe ingresar un domicilio de envío o seleccionar retirar en sucursal</h3>
    </div>
  )
}
