import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBook,
  getAllAuthors,
  getCategories,
  getAllPublishers,
} from "../../actions";


import validate from "../NewBook/validate.js";

//CSS
import styles from "./EditBook.module.css";
import swal from 'sweetalert';
import {ImCross} from "react-icons/im"








export default function EditBook({ bookDetail, setModal }) {
  const dispatch = useDispatch();
  const allAuthors = useSelector((state) => state.authors);
  const allCategories = useSelector((state) => state.categories);
  const allPublishers = useSelector((state) => state.publishers);

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


  //ESTADO DE ERRORES
  const [errores, setErrores] = useState({});


  useEffect(() => {
    setErrores('');
  }, [])
  

  //FUNCION QUE MANIPULA LOS INPUTS

  function handleInputsChange(event) {
    if (event.target.name === "authors") {
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

    swal({
      title: "Buen Trabajo!",
      text: "Se modifico el libro!",
      icon: "success",
    });

    setTimeout(function(){
      window.location.reload()
  }, 1500);

  };



  const handleBackSubmit = (e) => {
    e.preventDefault();
    setModal(false);
  };



  const eliminarAuthor = (e) => {
    e.preventDefault();

    let filtrados = book.authors?.filter((t) => t !== Number(e.target.value));
    setBook({
      ...book,
      authors: filtrados
    });
  };


  
  const eliminarCategories = (e) => {
    e.preventDefault();

    let filtrados = book.categories?.filter((t) => t !== Number(e.target.value));
    setBook({
      ...book,
      categories: filtrados
    });
  };






  return (
    <div className={styles.fondo}>
    <div className={styles.container}>
      
     
        <form className={styles.form}>
          <div className={styles.containerInput}>


            {/* TITULO */}

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
          </div>


          {/* DESCRIPCION */}

          <div className={styles.containerInputDescripcion}>
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
          </div>


          {/* PRECIO */}

          <div className={styles.containerInput}>
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
          </div>


          {/* STOCK  */}

          <div className={styles.containerInput}>
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
          </div>


          {/* IMAGEN */}

          <div className={styles.containerInput}>
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
          </div>


          {/* FECHA DE PUBLICACION */}

          <div className={styles.containerInput}>
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
          </div>


          {/* CANTIDAD DE PAGINAS  */}

          <div className={styles.containerInput}>
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
          </div>

          <div className={styles.containerInput}>
            <label className={styles.label}>Rating:</label>
            <input
              type="number"
              name="rating"
              value={book.rating}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
          </div>


          {/* LENGUAJES */}

          <div className={styles.containerInput}>
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
          </div>




          {/* EDITORIAL */}

          <div className={styles.containerInput}>
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
          </div>

        


        {/* AUTORES */}

          <div className={styles.containerInput2}>

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
                  <option
                    key={authors.id}
                    value={authors.id}
                  >
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
                  <div className={styles.contenedorLista} key={author.id}>
                    <li className={styles.nombreLista}>{autor}</li>
                    <button value={author} onClick={(e) => {eliminarAuthor(e)}}><ImCross color="red" /></button>
                  </div>
                );
              })}
            </ul>
            </div>
          </div>
       



           {/* GENERO */}
         
            <div className={styles.Input2}>
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
                  <option
                    key={categories.id}
                    value={categories.id}
                  >
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
                  <div className={styles.contenedorLista} key={categorias.id}>
                    <li className={styles.nombreLista}>{genero}</li>
                    <button value={categorias} onClick={(e) => {eliminarCategories(e)}}><ImCross color="red" /></button>
                  </div>
                );
              })}
            </ul>
            </div>
            </div>
          </div>




          {/* BOTONES FORMULARIO */}

          <div className={styles.containerButtons}>
            <div className={styles.itemsButtonsEnviar}>
              <button
                type="submit"
                onClick={handleOnSubmit}
                className={ JSON.stringify(errores) === "{}" && book.title !== ""
                ? styles.buttonEnviar  : styles.buttonEnviarDisabled}
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
          </div>
        </form>
      
    </div>
    </div>
  );
}
