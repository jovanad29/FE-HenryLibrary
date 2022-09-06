import axios from "axios";
import dotenv from "dotenv";
import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithGoogle,
  logoutFirebase,
} from "../firebase/providers";

dotenv.config();

// const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

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
export const ADD_FAVORITES = "ADD_FAVORITES";
export const SET_SECTION = "SET_SECTION";
export const GET_ALL_FAVORITES = "GET_ALL_FAVORITES";
export const DELETE_FAVORITES = "DELETE_FAVORITES";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECKING_CREDENTIALS = "CHECKING_CREDENTIALS";
export const GET_ALL_DETAILS_FAVORITES = "GET_ALL_DETAILS_FAVORITES";
export const ORDER_BY = "ORDER_BY";
export const GET_USER_INFO = "GET_USER_INFO";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
export const GET_CART = "GET_CART";
export const CLEAR_CART = "CLEAR_CART";
export const SET_FILTERS = "SET_FILTERS";

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
      .put(`/catalogue/banned/${id}`)
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
      .delete(`/catalogue/${id}`)
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
  return async function (dispatch) {
    await axios
      .put(`/catalogue/${id}`, body)
      .then((response) => {
        dispatch({ type: PUT_BOOK, payload: response.data });
        dispatch(getBooksId(id));
      })
      .catch((error) => {
        console.log("updateBook", error);
      });
  };
}

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

export function deleteFavoriteBook(id) {
  return function (dispatch) {
    dispatch({
      type: DELETE_FAVORITES,
      payload: id,
    });
  };
}

export function login(user) {
  return function (dispatch) {
    dispatch({ type: LOGIN, payload: user });
    // console.log("llega");
    // dispatch(getUserInfo(user.uid));
  };
}

export function logout(msg) {
  return function (dispatch) {
    dispatch({ type: LOGOUT, payload: msg });
  };
}

export function checkingCredentials() {
  return function (dispatch) {
    dispatch({ type: CHECKING_CREDENTIALS });
  };
}

export function clearLoginError() {
  return (dispatch) => {
    dispatch({ type: CLEAR_LOGIN_ERROR });
  };
}

export function createOrFindUser(user) {
  return async function (dispatch) {
    await axios
      .post(`/user`, user)
      .then((response) => {
        dispatch(getUserInfo(user.uid));
      })
      .catch((error) => {
        console.log("createOrFindUser", error);
      });
  };
}

export function getUserInfo(uid) {
  return async function (dispatch) {
    await axios
      .get(`/user/${uid}`)
      .then((response) => {
        dispatch({ type: GET_USER_INFO, payload: response.data });
      })
      .catch((error) => {
        console.log("getUserInfo", error);
      });
  };
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    const { uid, photoURL, displayName, email } = result;
    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    const { uid, photoURL } = result;
    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });

    if (!result.ok) return dispatch(logout(result));

    const { uid, photoURL, displayName } = result;
    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  };
};

//ORDENAMIENTOS

export function orderBy(order) {
  return (dispatch) => {
    dispatch({ type: ORDER_BY, payload: order });
  };
}

export function saveLocalCartToDB(userId, body) {
  return function (dispatch) {
    axios
      .post(`/payments/mergecart/${userId}`, body)
      .then((response) => {
        dispatch({ type: GET_CART, payload: response.data });
        localStorage.setItem("guestCartBooks", JSON.stringify([]));
      })
      .catch((error) => {
        console.log("saveLocalCartToDB", error);
      });
  };
}

export function clearCart() {
  return (dispatch) => {
    dispatch({ type: CLEAR_CART });
  };
}

export function getCartDB(userId) {
  return function (dispatch) {
    axios
      .get(`/payments/${userId}`)
      .then((response) => {
        dispatch({ type: GET_CART, payload: response.data });
      })
      .catch((error) => {
        console.log("getCartDB", error);
      });
  };
}

export function getBooksByCategoryAuthor(categoryId, authorId) {
  return function (dispatch) {
    axios
      .get(`/catalogue/filter?categoryId=${categoryId}&authorId=${authorId}`)
      .then((response) => {
        dispatch({ type: SET_FILTERS, payload: response.data });
      })
      .catch((error) => {
        console.log("getBooksByCategoryAuthor", error);
      });
  };
}
