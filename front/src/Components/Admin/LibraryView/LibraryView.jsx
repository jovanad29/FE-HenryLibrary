import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, postCategory } from "../../../actions/index";

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
import style from "./LibraryView.module.css";
import RowTable from "./RowTable/RowTable";
import { NavLink } from "react-router-dom";

function LibraryView() {
  const dispatch = useDispatch();
  const { allBooks } = useSelector((state) => state);

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
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Box fontFamily="Segoe UI" className={style.claroOscuro}>
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        <Box mb="5%" fontFamily="Quicksand">
          <NavLink to={`/user/admin/catalogue/new`}>
            <Button
              backgroundColor="#01A86C"
              size="sm"
              fontFamily="Segoe UI"
              color="black"
            >
              Crear Libro
            </Button>
          </NavLink>

          <Button
            onClick={onOpen}
            backgroundColor="#01A86C"
            size="sm"
            ml="5%"
            fontFamily="Segoe UI"
            color="black"
          >
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
        <Box className={style.contentTable}>
          {/* CABECERA */}
          <Flex className={style.table}>
            <Box className={style.book}>Libro</Box>
            <Box className={style.author}>Autor</Box>
            <Box className={style.category}>Genero</Box>
            <Box className={style.rating}>Calificacion</Box>
            <Box className={style.price}>Precio</Box>
            <Box className={style.stock}>Stock</Box>
            <Box className={style.edit}></Box>
          </Flex>

          {/* CONTENIDO */}
          {allBooks.map(
            (book) => book.isActive && <RowTable key={book.id} book={book} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default LibraryView;
