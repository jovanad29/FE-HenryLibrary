import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBook,
  getAllAuthors,
  getCategories,
  getAllPublishers,
  uploadImage,
} from "../../../../actions/index";

import validate from "../../../NewBook/validate";

import {
  elementButton,
  elementInput,
  elementInputDate,
  elementInputImage,
  elementInputValidate,
  elementNumberValidate,
  elementSelectOthers,
  elementSelectValidate,
  elementTestArea,
} from "./elements";

//CSS

// import swal from "sweetalert2";
// import { ImCross } from "react-icons/im";
import { Box, Stack, useToast } from "@chakra-ui/react";
import Menu from "../../Components/Menu";
import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";

export default function EditBook({ props }) {
  const dispatch = useDispatch();
  const allAuthors = useSelector((state) => state.authors);
  const allCategories = useSelector((state) => state.categories);
  const allPublishers = useSelector((state) => state.publishers);
  const location = useLocation();
  const bookDetail = location.props;
  const history = useHistory();

  const languages = [
    { id: 1, name: "Español", value: "es" },
    { id: 2, name: "Ingles", value: "en" },
    { id: 3, name: "Portugues", value: "pr" },
  ];

  useEffect(() => {
    dispatch(getAllAuthors());
    dispatch(getCategories());
    dispatch(getAllPublishers());
  }, [dispatch]);

  const authors2 = bookDetail.authors.map((a) => {
    return a && a.id;
  });

  const categories2 = bookDetail.categories.map((a) => {
    return a && a.id;
  });

  //ESTADO DEL FORMULARIO

  const [book, setBook] = useState({
    title: bookDetail.title,
    description: bookDetail.description,
    price: bookDetail.price,
    image: bookDetail.image,
    publisherId: bookDetail.publisherId,
    publishedDate: bookDetail.publishedDate,
    pageCount: bookDetail.pageCount,
    currentStock: bookDetail.currentStock,
    rating: bookDetail.rating,
    language: bookDetail.language,
    authors: authors2,
    categories: categories2,
  });

  const copyInitialBook = JSON.stringify({
    ...book,
    authors: [...authors2],
    categories: [...categories2],
  });

  //ESTADO DE ERRORES
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setErrores("");
  }, []);

  //FUNCION QUE MANIPULA LOS INPUTS

  function handleInputsChange(event) {
    if (event.target.name === "authors") {
      if (!book.authors.includes(Number(event.target.value))) {
        setBook({
          ...book,
          authors: [...book.authors, parseInt(event.target.value)],
        });
      }
    } else if (event.target.name === "categories") {
      if (!book.categories.includes(Number(event.target.value))) {
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

      setErrores(
        validate({
          ...book,
          [event.target.name]: event.target.value,
        })
      );
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(updateBook(bookDetail.id, book));

    // swal.fire({
    //   title: "Buen Trabajo!",
    //   text: "Se Modificó el libro!",
    //   icon: "success",
    //   iconColor: "#01A86C",
    //   confirmButtonColor: "#01A86C",
    // });

    history.push("/user/admin/catalogue");

    //   setTimeout(function(){
    //     window.location.reload()
    // }, 1500);
  };

  const handleBackSubmit = (e) => {
    e.preventDefault();
    history.push("/user/admin/catalogue");
  };

  const eliminarAuthor = (e) => {
    e.preventDefault();
    let filtrados = book.authors?.filter((t) => t !== Number(e.target.id));
    setBook({
      ...book,
      authors: filtrados,
    });
  };

  const eliminarCategories = (e) => {
    e.preventDefault();
    console.log(e.target.val);
    let filtrados = book.categories?.filter((t) => t !== Number(e.target.id));
    setBook({
      ...book,
      categories: filtrados,
    });
  };

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

    setErrores(
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
    <Box>
      <Menu />
      <NavBar />
      <Title />
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
          <form onSubmit={handleOnSubmit}>
            {/* TITULO CHAKRA */}
            {elementInputValidate(
              "Nombre del Libro",
              errores.title,
              book.title,
              "title",
              null,
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* DESCRIPCION CHAKRA*/}
            {elementTestArea(
              "Descripcion",
              errores.description,
              book.description,
              "description",
              null,
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* PRECIO CHAKRA */}
            {elementNumberValidate(
              "Precio",
              errores.price,
              book.price,
              "price",
              null,
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* IMAGEN DEL LIBRO */}
            {elementInputImage(
              "Imagen",
              errores.image,
              book.image,
              "image",
              null,
              handleInputsChange,
              handleFileInputChange
            )}

            {/* =============================================================== */}

            {/* EDITORIAL CHAKRA*/}
            {elementSelectValidate(
              "Editorial",
              errores.publisherId,
              book.publisherId,
              "publisherId",
              "Seleccione una opcion",
              handleInputsChange,
              allPublishers
            )}

            {/* =============================================================== */}

            {/* FECHA DE PUBLICACION CHAKRA*/}

            {elementInputDate(
              "date",
              "Fecha de Publicacion",
              book.publishedDate,
              "publishedDate",
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* CANTIDAD DE PAGINAS CHAKRA */}
            {elementNumberValidate(
              "Numero de Paginas",
              errores.pageCount,
              book.pageCount,
              "pageCount",
              null,
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* LENGUAJES CHAKRA*/}
            {elementSelectValidate(
              "Idioma",
              errores.language,
              book.language,
              "language",
              "Seleccione una opcion",
              handleInputsChange,
              languages
            )}

            {/* =============================================================== */}

            {/* STOCK  CHAKRA*/}
            {elementNumberValidate(
              "Stock",
              errores.currentStock,
              book.currentStock,
              "currentStock",
              null,
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* RATING CHAKRA*/}
            {elementInput(
              "Rating",
              book.rating,
              "rating",
              null,
              handleInputsChange
            )}

            {/* =============================================================== */}

            {/* CATEGORIAS CHAKRA*/}
            {elementSelectOthers(
              "Categorias",
              book.categories,
              "categories",
              "category",
              "Seleccione una opcion",
              handleInputsChange,
              eliminarCategories,
              allCategories,
              book.categories
            )}

            {/* AUTORES CHAKRA*/}
            {elementSelectOthers(
              "Autores",
              book.authors,
              "authors",
              "author",
              "Seleccione una opcion",
              handleInputsChange,
              eliminarAuthor,
              allAuthors,
              book.authors
            )}

            {/* =============================================================== */}

            {/* BOTONES FORMULARIO */}
            {elementButton(
              handleOnSubmit,
              handleBackSubmit,
              errores,
              book,
              copyInitialBook
            )}
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
