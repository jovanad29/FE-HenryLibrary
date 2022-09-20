import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postCategory } from "../../../actions/index";

// COMPONENTES
import Menu from "../Components/Menu";
import Title from "../Components/Title";
import NavBar from "../Components/NavBar";

// ESTILOS Y COMPONENTES CHAKRA
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import style from "../LibraryView/LibraryView.module.css";

import RowTable from "./RowTable/RowTable";
import { NavLink } from "react-router-dom";

function CategoriesView() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state);

  const toast = useToast();

  const [input, setInput] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const handleChange = function (e) {
    setInput((prevState) => {
      //creo un nuevo estado transitorio
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      //valido los errores de mi nuevo estado transitorio
      setErrors(validate(newState));

      //devuelvo el nuevo estado
      return newState;
    });
  };

  //manejador del submit
  function handleSubmit(evento) {
    evento.preventDefault();
    if (input.name) {
      // &&!errors.name ){

      try {
        dispatch(postCategory(input));
        setInput({
          name: "",
        });

        setErrors(
          validate({
            ...input,
          })
        );

        toast({
          title: "Categoria",
          description: "La categoria fue creada.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose();
      } catch (error) {
        toast({
          title: "Categoria",
          description: `La categoria no fue creada.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        onClose();
      }
    } else {
      toast({
        title: "Categoria",
        description: `La categoria no fue creada.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      onClose();
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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        <Box mb="5%" fontFamily="Quicksand">

          <Button onClick={onOpen} colorScheme="green" size="sm" ml="5%">
            Crear Categoria
          </Button>

          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            fontFamily="Quicksand"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontFamily="Quicksand" color="#01A86C">
                Crear Categoria
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <FormLabel fontFamily="Quicksand">Categoria</FormLabel>
                    <Input
                      value={input.name}
                      type="text"
                      name="name"
                      onChange={handleChange}
                      ref={initialRef}
                      placeholder="Nombre de la categoria"
                      borderColor="#01A86C"
                      focusBorderColor="#01A86C"
                      fontFamily="Quicksand"
                    />
                    {errors.name && (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={handleSubmit}
                  bgColor="#01A86C"
                  mr={3}
                  fontFamily="Quicksand"
                >
                  Guardar
                </Button>
                <Button
                  onClick={onClose}
                  bgColor="#01A86C"
                  fontFamily="Quicksand"
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.book}>Nombre</Box>
          <Box className={style.author}>Id</Box>
          <Box className={style.category}>Está activa_</Box>

          <Box className={style.edit}></Box>
        </Flex>

        {/* CONTENIDO */}
        {categories.map(
          (category) => category.isActive && <RowTable key={category.id} category={category} />
        )}
      </Box>
    </Box>
  );
}

export default CategoriesView;