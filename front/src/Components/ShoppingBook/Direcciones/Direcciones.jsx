import React,{useState} from 'react'

//CSS
import styles from "./Direcciones.module.css";
import { Flex, FormControl, FormLabel, RadioGroup, Radio, Input } from "@chakra-ui/react";




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

    <h2>Indique el lugar de envio de la compra:</h2>

    <Flex className={styles.formularioContainer}>
      <FormControl
        isRequired
        className={styles.formulario}
      >
      <RadioGroup onChange={addressHandleChange} value={address}>
        <FormLabel className={styles.texto}><Radio value={address.direccion} onChange={addressHandleChange}>Domicilio:</Radio></FormLabel>
            <Input variant='outline' value={address.direccion} onChange={addressHandleChange}/>
        <FormLabel className={styles.texto}><Radio value={address.otraDireccion} onChange={addressHandleChange}>Otro Domicilio:</Radio></FormLabel>
            <Input variant='outline' value={address.direccion} onChange={addressHandleChange}/>
        <Radio value={address.sucursal} onChange={addressHandleChange}>Retiro en sucural:</Radio>
      </RadioGroup>
      </FormControl>
    </Flex>

    <h3>Debe ingresar un domicilio de envio o seleccionar retirar en sucursal</h3>
  </div>
  )
}
