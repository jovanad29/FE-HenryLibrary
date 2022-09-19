import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBook,
  getAllAuthors,
  getCategories,
  getAllPublishers,
  uploadImage,
} from "../../actions";

import validate from "../NewBook/validate.js";

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
import styles from "./EditBook.module.css";
import swal from "sweetalert2";
// import { ImCross } from "react-icons/im";
import { useToast } from "@chakra-ui/react";

export default function EditBook({ bookDetail, setModal }) {
  const dispatch = useDispatch();
  const allAuthors = useSelector((state) => state.authors);
  const allCategories = useSelector((state) => state.categories);
  const allPublishers = useSelector((state) => state.publishers);

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

    setModal(false);

    swal.fire({
      title: "Buen Trabajo!",
      text: "Se Modificó el libro!",
      icon: "success",
      iconColor: "#01A86C",
      confirmButtonColor: "#01A86C",
    });

    //   setTimeout(function(){
    //     window.location.reload()
    // }, 1500);
  };

  const handleBackSubmit = (e) => {
    e.preventDefault();
    setModal(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMsg, errMsg, toast]);

  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <form className={styles.form}>
          {/* TITULO */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Titulo: </label>
            <input
              placeholder="ingrese el titulo del Libro..."
              type="text"
              name="title"
              value={book.title}
              className={styles.inputs}
              onChange={handleInputsChange}
            />

            <div className={styles.danger}>
              {errores.title && <span>{errores.title}</span>}
            </div>
          </div> */}

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

          {/* DESCRIPCION */}
          {/* <div className={styles.containerInputDescripcion}>
            <label className={styles.label}>Descripcion: </label>
            <textarea
              placeholder="ingrese descripcion del Libro..."
              type="text"
              name="description"
              value={book.description}
              className={styles.inputsDescripcion}
              onChange={handleInputsChange}
            />

            <div className={styles.danger}>
              {errores.description && <span>{errores.description}</span>}
            </div>
          </div> */}

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

          {/* PRECIO */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Precio: </label>
            <input
              placeholder="ingrese Precio del Libro..."
              type="number"
              name="price"
              value={book.price}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {errores.price && <span>{errores.price}</span>}
            </div>
          </div> */}

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

          {/* IMAGEN */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Imagen: </label>
            <input
              placeholder="URL ej: http://..."
              type="text"
              name="image"
              value={book.image}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {errores.image && <span>{errores.image}</span>}
            </div>
          </div> */}

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

          {/* EDITORIAL */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Editorial: </label>
            <select
              className={styles.inputs}
              value={book.publisherId}
              name="publisherId"
              onChange={handleInputsChange}
            >
              <option value="default">Elegir editorial</option>
              {allPublishers &&
                allPublishers.map((a) => (
                  <option key={a.name} value={a.id}>
                    {a.name}
                  </option>
                ))}
            </select>
            <div className={styles.danger}>
              {errores.publisherId && <span>{errores.publisherId}</span>}
            </div>
          </div> */}

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

          {/* FECHA DE PUBLICACION */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Fecha de publicacion: </label>
            <input
              placeholder="Ingrese Fecha..."
              type="date"
              name="publishedDate"
              value={book.publishedDate}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {errores.publishedDate && <span>{errores.publishedDate}</span>}
            </div>
          </div> */}

          {elementInputDate(
            "date",
            "Fecha de Publicacion",
            book.publishedDate,
            "publishedDate",
            handleInputsChange
          )}

          {/* =============================================================== */}

          {/* CANTIDAD DE PAGINAS  */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Cant. de Paginas:</label>
            <input
              placeholder="Ingrese Cant. Paginas del Libro..."
              type="number"
              name="pageCount"
              value={book.pageCount}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {errores.pageCount && <span>{errores.pageCount}</span>}
            </div>
          </div> */}

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

          {/* LENGUAJES */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Lenguaje: </label>
            <select
              name="language"
              value={book.language}
              className={styles.inputs}
              onChange={handleInputsChange}
              // defaultValue="default"
            >
              <option value="es">Español</option>
              <option value="en">Ingles</option>
              <option value="pt">Portugues</option>
            </select>
          </div> */}

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

          {/* STOCK  */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Stock Actual: </label>
            <input
              placeholder="ingrese Stock actual..."
              type="number"
              name="currentStock"
              value={book.currentStock}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {errores.currentStock && <span>{errores.currentStock}</span>}
            </div>
          </div> */}

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

          {/* RATING */}
          {/* <div className={styles.containerInput}>
            <label className={styles.label}>Rating:</label>
            <input
              type="number"
              name="rating"
              value={book.rating}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
          </div> */}

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

          {/* AUTORES */}
          {/* <div className={styles.containerInput2}>
            <div className={styles.Input1}>
              <div className={styles.autCat}>
                <label className={styles.label}>Autores </label>
                <select
                  className={styles.inputs}
                  name="authors"
                  onChange={handleInputsChange}
                  defaultValue="default"
                >
                  <option value="default">Elegir autor</option>
                  {allAuthors?.map((authors) => {
                    return (
                      <option key={authors.id} value={authors.id}>
                        {authors.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={styles.lista}>
                <ul>
                  {book.authors.map((author) => {
                    let autor = allAuthors?.map((a) => {
                      return a.id === author && a.name;
                    });

                    return (
                      <div className={styles.contenedorLista} key={author}>
                        <li className={styles.nombreLista}>{autor}</li>
                        <button
                          id={author}
                          value={author}
                          onClick={(e) => {
                            eliminarAuthor(e);
                          }}
                        >
                          <ImCross color="red" />
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div> */}

          {/* GENERO */}
          {/* <div className={styles.Input2}>
              <div className={styles.autCat}>
                <label className={styles.label}>Genero </label>
                <select
                  className={styles.inputs}
                  name="categories"
                  onChange={handleInputsChange}
                  defaultValue="default"
                >
                  <option value="default">Elegir genero</option>
                  {allCategories.map((categories) => {
                    return (
                      <option key={categories.id} value={categories.id}>
                        {categories.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={styles.lista}>
                <ul>
                  {book.categories.map((categorias) => {
                    let genero = allCategories?.map((c) => {
                      return c.id === categorias && c.name;
                    });

                    return (
                      <div
                        className={styles.contenedorLista}
                        key={categorias.id}
                      >
                        <li className={styles.nombreLista}>{genero}</li>
                        <button
                          value={categorias}
                          onClick={(e) => {
                            eliminarCategories(e);
                          }}
                        >
                          <ImCross color="red" />
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div> */}

          {/* BOTONES FORMULARIO */}
          {/* <div className={styles.containerButtons}>
            <div className={styles.itemsButtonsEnviar}>
              <button
                type="submit"
                onClick={handleOnSubmit}
                className={
                  JSON.stringify(errores) === "{}" && book.title !== ""
                    ? styles.buttonEnviar
                    : styles.buttonEnviarDisabled
                }
              >
                Enviar
              </button>
            </div>
            <div className={styles.itemsButtonsCancelar}>
              <button
                onClick={handleBackSubmit}
                className={styles.buttonCancelar}
              >
                Cancelar
              </button>
            </div>
          </div> */}

          {elementButton(
            handleOnSubmit,
            handleBackSubmit,
            errores,
            book,
            copyInitialBook
          )}
        </form>
      </div>
    </div>
  );
}
