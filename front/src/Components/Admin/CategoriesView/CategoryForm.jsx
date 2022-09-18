import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { postCategory} from '../../../actions/index.js';
import {  Input, FormLabel, Button , FormErrorMessage} from "@chakra-ui/react";
import styles from "./CategoryForm.module.css"
import Swal from "sweetalert2";



export default function CategoryForm() {
//create a controlled form to perform CRUD operations on the category table
//the form should have a text input for the name of the category
const dispatch = useDispatch();

const [input, setInput] = useState({
    name: "",
});
const [errors, setErrors] = useState({
    name: "",
});


const handleChange = function (e) {
    setInput((prevState) => {
        //creo un nuevo estado transitorio
        const newState = {
          ...prevState,
          [e.target.name]: e.target.value,
        };
        //valido los errores de mi nuevo estado transitorio
        setErrors(validate(newState))
  
        //devuelvo el nuevo estado
        return newState
      });
    };
//manejador del submit
function handleSubmit(evento){
    evento.preventDefault();
    if(input.name){
        // &&!errors.name ){
            
        try {
            dispatch(postCategory(input))
            setInput({
                name: ""
            })

            setErrors(validate({
                ...input,
            }))

            Swal.fire({
                icon: "success",
                title: "Se creo la categoria exitosamente ",
                showConfirmButton: true,
                confirmButtonColor: "#01A86C",
            });

        } catch (error) {
            // alert('La categoria no fue creada. Hay errores en la carga:',{errors})
            Swal.fire({
                icon: "success",
                title: `La categoria no fue creada. Hay errores en la carga:', ${errors}`,
                showConfirmButton: true,
                confirmButtonColor: "#01A86C",
            });
        }
            
    } else {
        // alert('La categoria no fue creada. Hay errores en la carga:',{errors})
        Swal.fire({
            icon: "success",
            title: `La categoria no fue creada. Hay errores en la carga:', ${errors}`,
            showConfirmButton: true,
            confirmButtonColor: "#01A86C",
        });
    }
    
}

//validaciones
function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "El nombre es obligatorio";
    } else if (!/^[A-Za-z]+/.test(input.name)) {
      errors.name = "El nombre debe contener solo letras";
    }
    return errors;
  } 



  return (
    <div className={styles.contenedor}>
    
    <h1 className={styles.title}>Crear una Categoria</h1>
    
    {/* <form onSubmit={(evento)=>handleSubmit(evento)}>
        <div >
            <label>Categoría:</label>
            <input
            type= "text"
            value= {input.name}
            name= "name"
            onChange={handleChange}
            placeholder='ingrese...'
            />
            <p>{errors.name || ''}</p>
        </div>

        <button type="submit">Crear</button>
    </form> */}

    <form >
        <div >
           <FormLabel fontWeight="bold" className={styles.text}>Categoría:</FormLabel>
            <Input
            value={input.name}
            type= "text"
            name="name"
            onChange={handleChange}
            focusBorderColor="#01A86C"
            placeholder='ingrese...'
            boxShadow="lg"
            rounded="lg"
            color="#01A86C"
          />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
        </div>
        <Button
              type="submit"
              w="30%"
              backgroundColor="#01A86C"
              variant="solid"
              onClick={handleSubmit}
              className={styles.boton}
              disabled={
                JSON.stringify(errors) === "{}"
                  ? false
                  : true
              }
            >
              Crear
            </Button>
    </form>
</div>
    );
}


