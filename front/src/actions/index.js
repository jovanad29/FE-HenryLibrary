import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_NAME_BOOKS = "GET_NAME_BOOKS";
export const GET_BOOKS_ID = "GET_BOOKS_ID";
export const DELETE_BOOKS_DETAIL = "DELETE_BOOKS_DETAIL";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_BOOKS_BY_CATEGORY = "GET_ALL_BOOKS_BY_CATEGORY";
export const POST_BOOK = "POST_BOOK";
export const SET_PAGE = "SET_PAGE";
export const BANNED_BOOK = "BANNED_BOOK";
export const DELETE_LOGICO_BOOK = "DELETE_LOGICO_BOOK";
export const SET_ALL_BOOKS_BY_AUTHOR = "GET_ALL_BOOKS_BY_AUTHOR";
export const SET_AUTHOR_BY_NAME = "GET_AUTHOR_BY_NAME";
export const GET_ALL_AUTHORS = "GET_ALL_AUTHORS";
export const GET_ALL_PUBLISHERS = "GET_ALL_PUBLISHERS";
export const EMPTY_AUTHORS = "EMPTY_AUTHORS";
export const PUT_BOOK = "PUT_BOOK";
export const ADD_CARRITO = "ADD_CARRITO";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const SET_SECTION = "SET_SECTION";
export const GET_ALL_FAVORITES = "GET_ALL_FAVORITES";
export const GET_ALL_DETAILS_FAVORITES = "GET_ALL_DETAILS_FAVORITES";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const ORDER_BY_SOLD_COPIES = "ORDER_BY_SOLD_COPIES";

export function getAllBooks(pagina = 0, items = 10) {
  return function (dispatch) {
    axios
      .get(`/catalogue?pagina=${pagina}&items=${items}`)
      .then((response) => {
        dispatch({
          type: GET_ALL_BOOKS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getAllBooks", error);
      });
  };
}

export function getNameBooks(title) {
  return function (dispatch) {
    axios
      .get(`/catalogue?title=${title}`)
      .then((response) => {
        dispatch({
          type: GET_NAME_BOOKS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getNameBooks", error);
      });
  };
}

export function getBooksId(id) {
  return function (dispatch) {
    axios
      .get(`/catalogue/${id}`)
      .then((response) => {
        dispatch({
          type: GET_BOOKS_ID,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getBooksId", error);
      });
  };
}

export function deleteBookDetail(id) {
  //--> Lo utilizo para desmontar el componente de detalle
  return {
    type: DELETE_BOOKS_DETAIL,
    payload: id,
  };
}

export function uploadBook(book) {
  return function (dispatch) {
    axios
      .post(`/catalogue`, book)
      .then((response) => {
        dispatch({ type: POST_BOOK, payload: response.data });
      })
      .catch((error) => {
        console.log("uploadBook", error);
      });
  };
}

export function getCategories() {
  return function (dispatch) {
    axios
      .get(`/categories`)
      .then((response) => {
        dispatch({
          type: GET_ALL_CATEGORIES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getBooksByCategory", error);
      });
  };
}

export function getBooksByCategory(idCategory) {
  return function (dispatch) {
    axios
      .get(`/categories/${idCategory}/books`)
      .then((response) => {
        dispatch({
          type: GET_ALL_BOOKS_BY_CATEGORY,
          payload: response.data.books,
        });
      })
      .catch((error) => {
        console.log("getBooksByCategory", error);
      });
  };
}

export function setPage(page) {
  return function (dispatch) {
    dispatch({ type: SET_PAGE, payload: page });
  };
}

export function bannedBook(id) {
  return function (dispatch) {
    axios
      .put(`/catalog/banned/${id}`)
      .then((response) => {
        dispatch({
          type: "BANNED_BOOK",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("bannedBook", error);
      });
  };
}

export function deleteLogicBook(id) {
  return function (dispatch) {
    axios
      .delete(`/catalog/${id}`)
      .then((response) => {
        dispatch({
          type: DELETE_LOGICO_BOOK,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("deleteLogicBook", error);
      });
  };
}

export function getBooksByAuthor(idAutor) {
  return function (dispatch) {
    axios
      .get(`/authors/${idAutor}/books`)
      .then((response) => {
        dispatch({
          type: SET_ALL_BOOKS_BY_AUTHOR,
          payload: response.data.books,
        });
      })
      .catch((error) => {
        console.log("getBooksByCategory", error);
      });
  };
}

export function getAuthorByName(name) {
  return function (dispatch) {
    axios
      .get(`/authors?name=${name}`)
      .then((response) => {
        dispatch({
          type: SET_AUTHOR_BY_NAME,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_AUTHOR_BY_NAME,
          payload: [],
        });
        console.log("getAuthorByName", error);
      });
  };
}

export function getAllAuthors() {
  return function (dispatch) {
    axios
      .get(`/authors`)
      .then((response) => {
        dispatch({
          type: GET_ALL_AUTHORS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getAllAuthors", error);
      });
  };
}

export function getAllPublishers() {
  return function (dispatch) {
    axios
      .get(`/publisher`)
      .then((response) => {
        dispatch({
          type: GET_ALL_PUBLISHERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getAllPublishers", error);
      });
  };
}

export function emptyAuthors() {
  return function (dispatch) {
    dispatch({ type: EMPTY_AUTHORS });
  };
}

export function updateBook(id, body) {
  return function (dispatch) {
    axios
      .put(`/catalogue/${id}`, body)
      .then((response) => {
        dispatch({ type: PUT_BOOK, payload: response.data });
      })
      .catch((error) => {
        console.log("updateBook", error);
      });
  };
}

// export const addCart = () => {
//     const miStorage = window.localStorage;
//     let Productos = Object.values(miStorage);
//     let objetos = Productos.map((producto) => {
//         return JSON.parse(producto);
//     });
//     let productos = objetos.filter((producto) => producto.hasOwnProperty("product_id"));
//     productos.reduce((acc, producto) => acc + producto.cantidad, 0);

//     return (dispatch) => {
//         return dispatch({
//             type: "ADD_CARRITO",
//             payload: productos,
//         });
//     };
// };

export function addFavoriteBook(id) {
  return function (dispatch) {
    dispatch({
      type: ADD_FAVORITES,
      payload: id,
    });
  };
}

export function setSection(section) {
  return function (dispatch) {
    dispatch({
      type: SET_SECTION,
      payload: section,
    });
  };
}

export function getAllFavorites() {
  return function (dispatch) {
    dispatch({
      type: GET_ALL_FAVORITES,
    });
  };
}

// export function getAllDetailsFavorites(){
//     return function (dispatch) {
//         dispatch({
//             type: GET_ALL_DETAILS_FAVORITES,

//         });
//     }

// }

//ORDENAMIENTOS

export function orderByPrice(order) {
  return (dispatch) => {
    dispatch({ type: ORDER_BY_PRICE, payload: order });
  };
}

export function orderByRating(order) {
  return (dispatch) => {
    dispatch({ type: ORDER_BY_RATING, payload: order });
  };
}

export function orderBySoldCopies(order) {
  return (dispatch) => {
    dispatch({ type: ORDER_BY_SOLD_COPIES, payload: order });
  };
}
