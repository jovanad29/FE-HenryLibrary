import React, { useState } from 'react'

//CSS
import styles from "./Direcciones.module.css";
import { Flex, FormControl, FormLabel, RadioGroup, Radio, Input } from "@chakra-ui/react";
import { getUserById } from '../../../actions/dataUserIdActions';
import { useId } from 'react';


export default function Direcciones() {

  const { address, uid } = useSelector((state) => state);
  const [checkbottom , setCheckbottom] = useState({   //Estado para el manejo de direccioes
    addressUser: address ? address : "",
    anotherAddress: "",
    booStore: false
  });

  const [input, setAddress] = useState({   //Estado para el manejo de direccioes
    addressUser: address ? address : "",
    anotherAddress: "",
    bookStore: false
  });

  useEffect(() => {
    dispatch(getUserById(uid));

  }, [dispatch]);

  function HandleChange(e) {
// si clickeo dir user inhabilito el input de otheraddress input  y bookStore=false 
// si clickeo dir user inhabilito el input de otheraddress input  y bookStore=false 
// si clicleo bookstore 
  }

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

    if (!input.addressUser || input.addressUser.length > 100 ||input.addressUser.length < 30 ) errors.name = "La direccion debe  tener entre 30 y 100 caracteres"
    if (input.addressUser[0] === " ") errors.addressUser = "El primer caracter no puede ser un espacio"

    if (!input.anotherAddress || input.name.length > 150 ||input.name.length < 4 ) errors.name = "La direccion debe  tener entre 30 y 100 caracteres"
    if (input.name[0] === " ") errors.name = "El primer caracter no puede ser un espacio"
    
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
          <RadioGroup onChange={e=>handleCheckBottom=>(e)} value={address}>
            <div className={styles.form}>
              <FormLabel className={styles.formLabel}>
                <Radio value={checkbottom.addressUser}

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
