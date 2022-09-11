import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {validateReview} from "../NewBook/validate.js";
import {getUserInfo, login, getAllReviews, createReviewByBook} from "../../actions/index.js"
import ReviewsCard from "./ReviewsCard.jsx";


//CSS
import styles from "./Reviews.module.css";
import {
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";







function Reviews({id}) { //Este id me lo traigo del componente BookDetail para traer los reviews por cada libro

    const dispatch = useDispatch();

    const {status, displayName, email, reviews, uid} = useSelector (state => state)

    useEffect(() => {
      setErrores("");
      dispatch(getAllReviews(id));
  }, [dispatch,id]);


    //ESTADO DE ERRORES
     const [errores, setErrores] = useState({});

    //ESTADO DEL FORMULARIO 
    const [input, setInput] = useState({
        uid: uid, //id user
        descrption:"",
        rating: 1
    })


    useEffect(() => {
      setInput({...input, 
                uid:uid
              })
  }, [uid]);


    function handleInputsChange(event) {
            setInput({
                ...input,
                [event.target.name]: event.target.value,
            });

            setErrores(
                validateReview({
                    ...input,
                    [event.target.name]: event.target.value,
                })
            );
        }
    

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(createReviewByBook(id, input));
    };



    const contadorDescription = input.descrption.length //Contador para ir monstrando los caracteres consumidos


  return (
    <div className={styles.reviews}>
      <h2 className={styles.titulo}> Opiniones de nuestros clientes </h2>

      <Flex className={styles.conteiner}>
        <Flex className={styles.review}>

          {/* Aca renderizo cada review */}
          <ReviewsCard reviews={reviews}/> 

        </Flex>

        {status === "authenticated" && (
        <Flex className={styles.formularioContainer}>

          <FormControl isRequired isInvalid={validateReview} className={styles.formulario}>
            
            <div className={styles.info}>
            <FormLabel className={styles.texto}>Nombre de usuario: {displayName}</FormLabel>
            <FormLabel className={styles.texto}>Mail: {email}</FormLabel>

            <Flex className={styles.texto}>aca van estrellitas de rating</Flex>
            </div>

            <div className={styles.descripcion}>

            <span className={contadorDescription > 90 ? styles.contadorError : styles.contador}>
                {contadorDescription} de 100 caracteres
            </span>
            <Textarea 
              className={styles.textarea}
              value={input.descrption}
              name="descrption"
              onChange={handleInputsChange}
              placeholder="escribe tu opinion"
              w="90%" h="70%"
              _focus={{borderColor:'#01A86C'}}
            />
            {errores.descrption && (<FormErrorMessage>{errores.descrption}</FormErrorMessage>)}


            <Button  margin-bottom="1rem" bg='#01A86C' w="90%" h="30%" onClick={handleOnSubmit}                                 
            className={JSON.stringify(errores) === "{}" &&  input.descrption !== "" && contadorDescription < 100
                       ? styles.buttonEnviar
                        : styles.buttonEnviarDisabled }>ENVIAR</Button>
            </div>
          </FormControl>
        </Flex>
        )}

      </Flex>
    </div>
  );
}

export default Reviews;
