import React,{useState} from 'react'

//CSS
import styles from "./Direcciones.module.css";
import { Flex, FormControl, RadioGroup, Radio, Input, FormLabel } from "@chakra-ui/react";




export default function Direcciones() {


    const [address, setAddress] = useState({   //Estado para el manejo de direccioes
        direccion: "",
        otraDireccion: "",
        sucursal: ""
      });
    
    function addressHandleChange(){

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
            <FormLabel className={styles.formLabel}><Radio value={address.direccion} onChange={addressHandleChange} >Domicilio:</Radio></FormLabel>
            <Input variant='outline' value={address.direccion} onChange={addressHandleChange} className={styles.input} focusBorderColor='#01A86C'/>
        </div>
        <div className={styles.form}>
            <FormLabel className={styles.formLabel}><Radio value={address.otraDireccion} onChange={addressHandleChange} className={styles.radio}>Otro Domicilio:</Radio></FormLabel>
            <Input variant='outline' value={address.direccion} onChange={addressHandleChange} focusBorderColor='#01A86C'/>
        </div>
        <div className={styles.form}>
            <FormLabel className={styles.formLabel}><Radio value={address.sucursal} onChange={addressHandleChange} className={styles.radio}>Retiro en sucural:</Radio></FormLabel>
        </div>
      </RadioGroup>
      </FormControl>
    </Flex>

    <h3 className={styles.errores}>Debe ingresar un domicilio de envio o seleccionar retirar en sucursal</h3>
  </div>
  )
}
