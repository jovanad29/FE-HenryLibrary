import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCategories, postCategory, updateCategory} from '../../../actions/index.js';
import {useHistory} from 'react-router-dom';

export default function CategoryForm() {
//create a controlled form to perform CRUD operations on the category table
//the form should have a text input for the name of the category
const dispatch = useDispatch();
const history = useHistory();

const allCategories = useSelector((state) => state.categories);
const [input, setInput] = useState({
    name: "",
});
const [errors, setErrors] = useState({
    name: "",
});

useEffect(() => {
    dispatch(getCategories());
}, [dispatch]);

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
    console.log('aqui input', input.name);
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

        } catch (error) {
            alert('La categoria no fue creada. Hay errores en la carga:',{errors})
        }
            
    } else {
        alert('La categoria no fue creada. Hay errores en la carga:',{errors})
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
    <div >
    
    <h1>Crear una Categoria</h1>
    <form onSubmit={(evento)=>handleSubmit(evento)}>
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
    </form>
</div>
    );
}


