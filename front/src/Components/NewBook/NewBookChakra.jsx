import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  uploadBook,
  getAllAuthors,
  getCategories,
  getAllPublishers,
  uploadImage,
} from "../../actions";
import validate from "./validate.js";

//Componentes Chakra
import {
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  Stack,
  Flex,
  Select,
  Box,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { CgCheck } from "react-icons/cg";
import { TbBookUpload } from "react-icons/tb";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

export default function NewBookChakra() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allAuthors = useSelector((state) => state.authors);
  const allCategories = useSelector((state) => state.categories);
  const allPublishers = useSelector((state) => state.publishers);

  //ESTADO DEL FORMULARIO
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    publisherId: null,
    publishedDate: "",
    pageCount: 0,
    language: "",
    currentStock: 0,
    categories: [],
    authors: [],
  });

  const [error, setError] = useState({}),
    languages = [
      { id: 1, name: "Español", value: "es" },
      { id: 2, name: "Ingles", value: "en" },
      { id: 3, name: "Portugues", value: "pr" },
    ];

  function handleInputsChange(event) {
    if (event.target.name === "authors") {
      console.log(event.target.value);
      if (!book.authors.includes(event.target.value)) {
        setBook({
          ...book,
          authors: [...book.authors, parseInt(event.target.value)],
        });
      }
    } else if (event.target.name === "categories") {
      if (!book.categories.includes(event.target.value)) {
        setBook({
          ...book,
          categories: [...book.categories, parseInt(event.target.value)],
        });
      }
    } else {
      setBook({
        ...book,
        [event.target.name]: event.target.value,
      });

      setError(
        validate({
          ...book,
          [event.target.name]: event.target.value,
        })
      );
    }
  }

  function handleChangePrice(value) {
    setBook({
      ...book,
      price: value,
    });

    setError(
      validate({
        ...book,
        price: value,
      })
    );
  }

  const handleChangePage = (value) => {
    setBook({
      ...book,
      pageCount: value,
    });

    setError(
      validate({
        ...book,
        pageCount: value,
      })
    );
  };

  const handleChangeStock = (value) => {
    setBook({
      ...book,
      currentStock: value,
    });

    // setError(
    //   validate({
    //     ...book,
    //     currentStock: value,
    //   })
    // );
  };

  const filterOptions = (event) => {
    console.log(event.target.title);
    event.target.title === "category" &&
      setBook({
        ...book,
        categories: book.categories.filter(
          (category) => category !== Number(event.target.id)
        ),
      });

    event.target.title === "author" &&
      setBook({
        ...book,
        authors: book.authors.filter(
          (author) => author !== Number(event.target.id)
        ),
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(uploadBook(book));

    setBook({
      title: "",
      description: "",
      price: 0,
      image: "",
      publisherId: null,
      publishedDate: "",
      pageCount: 0,
      language: "",
      currentStock: 0,
      categories: [],
      authors: [],
    });

    swal({
      title: "Buen Trabajo!",
      text: "Se Creo el libro!",
      icon: "success",
    });
  };

  const handleBackSubmit = (e) => {
    e.preventDefault();
    history.push("/"); // ---> esta ruta debe volver al catalogo
  };

  //=======================================================================================
  //FUNCIONES PARA NO REPETIR CODIGO

  //INPUT SENCILLO CONTROLADO
  const elementInput = (label, validate, value, name, placeholder = null) => {
    return (
      <FormControl isRequired isInvalid={validate}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <Input
            value={value}
            name={name}
            onChange={handleInputsChange}
            focusBorderColor="#01A86C"
            placeholder={placeholder}
            boxShadow="lg"
            rounded="lg"
          />
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === ""
              ? null
              : !validate && <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
        {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
      </FormControl>
    );
  };

  //TEXT AREA CONTROLADO
  const elementTestArea = (
    label,
    validate,
    value,
    name,
    placeholder = null
  ) => {
    return (
      <FormControl isRequired isInvalid={validate}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <Textarea
            value={value}
            name={name}
            onChange={handleInputsChange}
            focusBorderColor="#01A86C"
            placeholder={placeholder}
            boxShadow="lg"
            rounded="lg"
          />
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === ""
              ? null
              : !validate && <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
        {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
      </FormControl>
    );
  };

  // INPUT DE TIPO NUMERO VALIDADO
  const elementNumberInputValidate = (
    label,
    validate = null,
    value,
    name,
    handle
  ) => {
    return (
      <FormControl isRequired isInvalid={validate}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <NumberInput
            defaultValue={0}
            min={1}
            value={value}
            name={name}
            onChange={handle}
            focusBorderColor="#01A86C"
            boxShadow="lg"
            rounded="lg"
            width="97.5%"
          >
            <NumberInputField />
          </NumberInput>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === 0
              ? null
              : !validate && <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
        {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
      </FormControl>
    );
  };

  // INPUT DE TIPO NUMERO
  const elementNumberInput = (label, value, name, handle) => {
    return (
      <FormControl isInvalid={false}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <NumberInput
            min={1}
            value={value}
            name={name}
            onChange={handle}
            focusBorderColor="#01A86C"
            boxShadow="lg"
            rounded="lg"
            width="97.5%"
          >
            <NumberInputField />
          </NumberInput>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === 0 ? null : <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
      </FormControl>
    );
  };

  //SELECT VALIDADO
  const elementSelectValidate = (
    label,
    validate,
    value,
    name,
    placeholder = null,
    handle,
    arr
  ) => {
    return (
      <FormControl isRequired isInvalid={validate}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <Select
            value={value}
            name={name}
            onChange={handle}
            focusBorderColor="#01A86C"
            placeholder={placeholder}
            boxShadow="lg"
            rounded="lg"
          >
            {arr.map((elemen) => {
              return (
                <option key={elemen.id} value={elemen.id}>
                  {elemen.name}
                </option>
              );
            })}
          </Select>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === null || value === "" || validate ? null : (
              <CgCheck size="30px" color="#01A86C" />
            )}
          </Box>
        </Box>
        {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
      </FormControl>
    );
  };

  //SELECT
  const elementSelect = (
    label,
    value,
    name,
    placeholder = null,
    handle,
    arr
  ) => {
    return (
      <>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <Select
            value={value}
            name={name}
            onChange={handle}
            focusBorderColor="#01A86C"
            placeholder={placeholder}
            boxShadow="lg"
            rounded="lg"
          >
            {arr.map((elemen) => {
              return (
                <option key={elemen.id} value={elemen.value}>
                  {elemen.name}
                </option>
              );
            })}
          </Select>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === null || value === "" ? null : (
              <CgCheck size="30px" color="#01A86C" />
            )}
          </Box>
        </Box>
      </>
    );
  };

  //SELECT PARA AUTORES Y CATEGORIAS
  const elementSelectOthers = (
    label,
    value,
    name,
    title,
    placeholder = null,
    handle,
    arr
  ) => {
    return (
      <>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <Select
            value={value}
            name={name}
            onChange={handle}
            focusBorderColor="#01A86C"
            placeholder={placeholder}
            boxShadow="lg"
            rounded="lg"
          >
            {arr.map((elemen) => {
              return (
                <option key={elemen.id} value={elemen.id}>
                  {elemen.name}
                </option>
              );
            })}
          </Select>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value.length === 0 ? null : (
              <CgCheck size="30px" color="#01A86C" />
            )}
          </Box>
        </Box>
        {value.map((element) => (
          <FormLabel
            key={element}
            id={element}
            title={title}
            onClick={filterOptions}
            cursor="pointer"
            boxShadow="lg"
            rounded="lg"
            textAlign="center"
            width="91%"
          >
            {arr.filter((e) => e.id === Number(element))[0].name}
          </FormLabel>
        ))}
      </>
    );
  };

  //INPUT DE TIPO FECHA
  const elementInputDate = (type, label, value, name) => {
    return (
      <>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <Input
            type={type}
            value={value}
            name={name}
            onChange={handleInputsChange}
            focusBorderColor="#01A86C"
            boxShadow="lg"
            rounded="lg"
          />
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === "" ? null : <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
      </>
    );
  };

  //INPUT TIPO ARCHIVO CONTROLADO
  const elementInputImage = (
    label,
    validate,
    value,
    name,
    placeholder = null,
    handle
  ) => {
    return (
      <FormControl isRequired isInvalid={validate}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <InputGroup>
            <Input
              value={value}
              name={name}
              onChange={handleInputsChange}
              focusBorderColor="#01A86C"
              placeholder={placeholder}
              boxShadow="lg"
              rounded="lg"
            />
            <InputRightElement>
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                cursor={"pointer"}
                onChange={handle}
              ></Input>
              <TbBookUpload size={"70%"} color="green" />
            </InputRightElement>
          </InputGroup>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === ""
              ? null
              : !validate && <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
        {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
      </FormControl>
    );
  };

  useEffect(() => {
    dispatch(getAllAuthors());
    dispatch(getCategories());
    dispatch(getAllPublishers());
  }, [dispatch]);

  //======================= CLOUDINARY =======================

  //MENSAJES INFORMATIVOS
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //VENTANA DE INFORMACION
  const toast = useToast();

  //FUCION PARA SETAR LA URL RESULTANTE Y VALIDAR SI ES CORRECTA
  const setImage = (value) => {
    setBook({
      ...book,
      image: value,
    });

    setError(
      validate({
        ...book,
        image: value,
      })
    );
  };

  //FUNCION PARA SETEAR EL MENSAJE SATISFACTORIO
  const successMessage = () => {
    setSuccessMsg("La imagen se cargó correctamente");
  };

  //FUNCION PARA SETEAR EL MENSAJE ERRONEO
  const errorMessage = () => {
    setErrMsg("Error al cargar la imagen!");
  };

  //FLOW COMPLETO
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSuccessMsg("");
    setErrMsg("");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(
        uploadImage(reader.result, setImage, successMessage, errorMessage)
      );
    };
  };

  //PARA MOSTRAR VENTANAS EMERGENTES, NO PASAR AL ARREGLO LA FUNCION setImage GENERA UN BUCLE INFINITO
  useEffect(() => {
    if (successMsg) {
      let temp = successMsg;
      setSuccessMsg("");

      return toast({
        title: "Imagen",
        description: temp,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    if (errMsg) {
      let temp = errMsg;
      setErrMsg("");
      setImage("");

      return toast({
        title: "Imagen",
        description: temp,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [successMsg, errMsg, toast]);

  return (
    <>
      <NavBar />

      <NavBar2 />

      <Box
        display="flex"
        justifyContent="center"
        fontFamily="Quicksand"
        pt="5%"
        pb="5%"
      >
        <Stack
          border="2px"
          borderColor="#D9D9D9"
          padding="2%"
          spacing={4}
          w="40%"
          boxShadow="lg"
          rounded="2xl"
        >
          {/* NOMBRE DEL LIBRO */}
          {elementInput("Nombre del Libro", error.title, book.title, "title")}

          {/* DESCRIPCION DEL LIBRO */}
          {elementTestArea(
            "Descripcion",
            error.description,
            book.description,
            "description"
          )}

          {/* PRECIO DEL LIBRO */}
          {elementNumberInputValidate(
            "Precio",
            error.price,
            book.price,
            "price",
            handleChangePrice
          )}

          {/* IMAGEN DEL LIBRO */}
          {elementInputImage(
            "Imagen",
            error.image,
            book.image,
            "image",
            null,
            handleFileInputChange
          )}

          {/* EDITORIAL DEL LIBRO */}
          {elementSelectValidate(
            "Editorial",
            error.publisherId,
            book.publisherId,
            "publisherId",
            "Seleccione una opcion",
            handleInputsChange,
            allPublishers
          )}

          {/* FECHA DE PUBLICACION DEL LIBRO */}
          {elementInputDate(
            "date",
            "Fecha de Publicacion",
            book.publishedDate,
            "publishedDate"
          )}

          {/* NUMERO DE PAGINAS DEL LIBRO */}
          {elementNumberInputValidate(
            "Numero de Paginas",
            error.pageCount,
            book.pageCount,
            "pageCount",
            handleChangePage
          )}

          {/* IDIOMA DEL LIBRO */}
          {elementSelect(
            "Idioma",
            book.language,
            "language",
            "Seleccione una opcion",
            handleInputsChange,
            languages
          )}

          {/* STOCK DEL LIBRO */}
          {elementNumberInput(
            "Stock",
            book.currentStock,
            "currentStock",
            handleChangeStock
          )}

          {/* CATEGORIAS DEL LIBRO */}
          {elementSelectOthers(
            "Categoria",
            book.categories,
            "categories",
            "category",
            "Seleccione una opcion",
            handleInputsChange,
            allCategories
          )}

          {/* AUTORES DEL LIBRO */}
          {elementSelectOthers(
            "Autor",
            book.authors,
            "authors",
            "author",
            "Seleccione una opcion",
            handleInputsChange,
            allAuthors
          )}

          {/* BOTONES DE INTERACCION */}
          <Flex justifyContent="space-around">
            <Button
              w="30%"
              backgroundColor="#01A86C"
              variant="solid"
              onClick={handleOnSubmit}
              disabled={
                JSON.stringify(error) === "{}" && book.title !== ""
                  ? false
                  : true
              }
            >
              Enviar
            </Button>

            <Button
              w="30%"
              backgroundColor="#01A86C"
              variant="solid"
              onClick={handleBackSubmit}
            >
              Cancelar
            </Button>
          </Flex>
        </Stack>
      </Box>
      <Footer />
    </>
  );
}
