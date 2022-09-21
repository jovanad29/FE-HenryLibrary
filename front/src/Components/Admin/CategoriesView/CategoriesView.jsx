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

import style from "./CategoriesView.module.css";

import RowTable from "./RowTable/RowTable";

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
    if (input.name &&!errors.name) {


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
          title: "Género",
          description: "El género fue creado con éxito.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose();
      } catch (error) {
        toast({
          title: "Género",
          description: `El género no fue creado.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        onClose();
      }
    } else {
      toast({
        title: "Género",
        description: `El género no fue creado.`,
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
    <Box fontFamily="Segoe UI">
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        <Box mb="5%" fontFamily="Quicksand">
<<<<<<< HEAD
          <Button onClick={onOpen} colorScheme="green" size="sm">
            Crear Categoría
=======

          <Button onClick={onOpen} colorScheme="green" size="sm" ml="5%">
            Crear Género
>>>>>>> 2f2f4779a76fe3ec07af96e94d5ade457ca70c9e
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
                Crear Género
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <FormLabel fontFamily="Quicksand">Género</FormLabel>
                    <Input
                      value={input.name}
                      type="text"
                      name="name"
                      onChange={handleChange}
                      ref={initialRef}
                      placeholder="Nombre de género"
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
<<<<<<< HEAD

        <Box className={style.contentTable}>
          {/* CABECERA */}
          <Flex className={style.table}>
            <Box className={style.name}>Nombre</Box>
            <Box className={style.id}>Id</Box>
            <Box className={style.isActive}>Está activa_</Box>
            <Box className={style.button}></Box>
          </Flex>

          {/* CONTENIDO */}
          {categories.map(
            (category) =>
              category.isActive && (
                <RowTable key={category.id} category={category} />
              )
          )}
        </Box>
=======
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.book}>Nombre</Box>
          <Box className={style.edit}></Box>
        </Flex>

        {/* CONTENIDO */}
        {categories.map(
          (category) => category.isActive && <RowTable key={category.id} category={category} />
        )}
>>>>>>> 2f2f4779a76fe3ec07af96e94d5ade457ca70c9e
      </Box>
    </Box>
  );
}

export default CategoriesView;
