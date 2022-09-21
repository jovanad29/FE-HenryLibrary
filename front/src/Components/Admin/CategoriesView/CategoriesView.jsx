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
  const { categories,errorMessage } = useSelector((state) => state);

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
    if (input.name && !errors.name) {
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
        if (errorMessage) {
            console.log("adentro")
          toast({
            title: "Error",
            description: errorMessage,
            status: "error",
            duration: 9000,
            isClosable: true,
          });onClose();
        } else {
        toast({
          title: "Género",
          description: "El género fue creado con éxito.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose();
        }
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
    <Box fontFamily="Segoe UI"  className={style.claroOscuro}>
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        <Box mb="5%" fontFamily="Segoe UI">
          <Button onClick={onOpen} background="#01A86C" size="md" color='black' _focus={{border: "2px solid #01A86C" }}>
            Crear Género
          </Button>

          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            fontFamily="Segoe UI"
          >
            <ModalOverlay />
            <ModalContent className={style.form}>
              <ModalHeader fontFamily="Segoe UI" color="#01A86C">
                Crear Género
              </ModalHeader>
              <ModalCloseButton color="#01A86C"/>
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <FormLabel fontFamily="Segoe UI" className={style.label}>Género</FormLabel>
                    <Input
                      value={input.name}
                      type="text"
                      name="name"
                      onChange={handleChange}
                      ref={initialRef}
                      placeholder="Nombre de género"
                      borderColor="#01A86C"
                      focusBorderColor="#01A86C"
                      fontFamily="Segoe UI"
                      className={style.label}
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
                  fontFamily="Segoe UI"
                  _focus={{
                    border: "2px solid #01A86C",
                  }}
                >
                  Guardar
                </Button>
                <Button
                  onClick={onClose}
                  bgColor="#01A86C"
                  fontFamily="Segoe UI"
                  _focus={{
                    border: "2px solid #01A86C",
                  }}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Box className={style.contentTable}>
          {/* CABECERA */}
          <Flex className={style.table}>
            <Box className={style.name}>Nombre</Box>
            <Box className={style.id}>Id</Box>
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
      </Box>
    </Box>
  );
}

export default CategoriesView;
