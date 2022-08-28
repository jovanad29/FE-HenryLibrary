import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadBook } from "../../actions";

//CSS
import styles from "./NewBook.module.css";

export default function NewRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [publisherIdError, setPublisherIdError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [publishedDateError, setPublishedDateError] = useState(false);
  const [pageCountError, setPageCountError] = useState(false);
  const [currentStockError, setcurrentStockError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [isBannedError, setIsBannedError] = useState(false);

  let [book, setBook] = useState({
    publisherId: 0,
    title: "",
    description: "",
    price: 0,
    image: "",
    publishedDate: "",
    pageCount: 0,
    currentStock: 0,
    language: "",
    isBanned: false
  });

  const handleInputsChange = (e) => {
    setPublisherIdError(false);
    setTitleError(false);
    setDescriptionError(false);
    setPriceError(false);
    setImageError(false);
    setPublishedDateError(false);
    setPageCountError(false);
    setcurrentStockError(false);
    setLanguageError(false);
    setIsBannedError(false);
  

    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const patternURL = new RegExp(
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setPublisherIdError(false);
    setTitleError(false);
    setDescriptionError(false);
    setPriceError(false);
    setImageError(false);
    setPublishedDateError(false);
    setPageCountError(false);
    setcurrentStockError(false);
    setLanguageError(false);
    setIsBannedError(false);

    // if (!book.publisherId) {
    //   return setTitleError("Ya existe ID Cargada");
    // } ---> validar si no existe en BBDD

    if (!book.title) {
      return setTitleError("Ingrese un Titulo correcto para su Libro");
    }
    if (!book.description) {
      return setDescriptionError("Ingrese una Descripcion para su Libro");
    }
    if (!book.price || !book.price === Number) {
      return setPriceError("Ingrese un Precio correcto para su Libro");
    }

    if (!patternURL.test(book.image)) {
      return setImageError("Ingrese un formato correcro URL de imagen");
    }

    if (!book.currentStock || !book.currentStock === Number) {
      return setcurrentStockError("Ingrese un Stock correcto");
    }

    dispatch(uploadBook(book));

    setBook({
      publisherId: 0,
      title: "",
      description: "",
      price: 0,
      image: "",
      publishedDate: "",
      pageCount: 0,
      currentStock: 0,
      language: "",
      isBanned: false
    });
    alert("Libro creado Exitosamente!");
  };

  const handleBackSubmit = (e) => {
    e.preventDefault();
    history.push("/"); // ---> esta ruta debe volver al catalogo
  };

  return (
    <div className={styles.containerFormu}>
      <h1 className={styles.titleFormu}>Nuevo Libro</h1>
      <form action="POST">
        <div className={styles.containerInputs}>

          <div className={styles.containerInput}>
            <label>Id de Editorial: </label>
            <input
              placeholder="ingrese ID"
              type="text"
              name="publisherId"
              value={book.publisherId}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            *Campo Requerido
            <div className={styles.danger}>
              {publisherIdError && <p>{publisherIdError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Titulo: </label>
            <input
              placeholder="ingrese el titulo del Libro..."
              type="text"
              name="title"
              value={book.title}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            *Campo Requerido
            <div className={styles.danger}>
              {titleError && <p>{titleError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Descripcion: </label>
            <textarea
              placeholder="ingrese descripcion del Libro..."
              type="text"
              name="description"
              value={book.description}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            *Campo Requerido
            <div className={styles.danger}>
              {descriptionError && <p>{descriptionError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Precio: </label>
            <input
              placeholder="ingrese Precio del Libro..."
              type="number"
              name="price"
              value={book.price}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            *Campo Requerido
            <div className={styles.danger}>
              {priceError && <p>{priceError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Stock Actual: </label>
            <input
              placeholder="ingrese Stock actual..."
              type="number"
              name="currentStock"
              value={book.currentStock}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            *Campo Requerido
            <div className={styles.danger}>
              {currentStockError && <p>{currentStockError}</p>}
            </div>
          </div>


          <div className={styles.containerInput}>
            <label>Imagen: </label>
            <input
              placeholder="URL ej: http://..."
              type="text"
              name="image"
              value={book.image}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {imageError && <p>{imageError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Fecha de publicacion: </label>
            <input
              placeholder="Ingrese Fecha..."
              type="date"
              name="publishedDate"
              value={book.publishedDate}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {publishedDateError && <p>{publishedDateError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Cant. de Paginas:</label>
            <input
              placeholder="Ingrese Cant. Paginas del Libro..."
              type="number"
              name="pageCount"
              value={book.pageCount}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {pageCountError && <p>{pageCountError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Lenguaje: </label>
            <input
              type="text"
              name="language"
              value={book.language}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {languageError && <p>{languageError}</p>}
            </div>
          </div>

          <div className={styles.containerInput}>
            <label>Venta: </label>
            <input
              type="text"
              name="isBanned"
              value={book.isBanned}
              className={styles.inputs}
              onChange={handleInputsChange}
            />
            <div className={styles.danger}>
              {isBannedError && <p>{isBannedError}</p>}
            </div>
          </div>

          <div className={styles.containerButtons}>
            <button
              type="submit"
              onClick={handleOnSubmit}
              className={styles.button}>Enviar
            </button>
            <button onClick={handleBackSubmit} className={styles.button}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
