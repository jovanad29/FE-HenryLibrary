import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_REVIEW_BY_USER = "GET_ALL_REVIEW_BY_USER";
export const UPDATE_TO_ADMIN = "UPDATE_TO_ADMIN";
export const DELETE_USER = "DELETE_USER";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const UPDATE_ORDER_STATE = "UPDATE_ORDER_STATE";
export const FILTER_ORDER = "FILTER_ORDER";

//Trae la información de todos los usuarios
export function getAllUsers() {
  return (dispatch) => {
    axios
      .get(`/user`)
      .then((response) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getAllUsers", error);
      });
  };
}

//Convierte un usuario en admin
export function updateToAdmin(uid) {
  return (dispatch) => {
    axios
      .put(`/user/${uid}`)
      .then((response) => {
        dispatch({
          type: UPDATE_TO_ADMIN,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("updateToAdmin", error);
      });
  };
}

//Borrar usuario
export function deleteUser(uid) {
  return (dispatch) => {
    axios
      .delete(`/user/${uid}`)
      .then((response) => {
        dispatch({
          type: DELETE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("deleteUser", error);
      });
  };
}

//Trae la información de todas las órdenes
export function getAllOrders() {
  return (dispatch) => {
    axios
      .get(`/payments`)
      .then((response) => {
        dispatch({
          type: GET_ALL_ORDERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getAllOrders", error);
      });
  };
}

//Detalle de una orden
export function getOrderDetail(id) {
  return (dispatch) => {
    axios
      .get(`/payments/${id}`)
      .then((response) => {
        dispatch({
          type: GET_ORDER_DETAIL,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getOrderDetail", error);
      });
  };
}

//Actualizar estado de una orden
export function updateOrderDetail(paymentID, statusID) {
  return (dispatch) => {
    axios
      .put(`/payments/${paymentID}/status/${statusID}`)
      .then((response) => {
        dispatch({
          type: UPDATE_ORDER_STATE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("updateOrderDetail", error);
      });
  };
}

export function getAllReviewByUser(uid) {
  return (dispatch) => {
    axios
      .get(`/reviews?uid=${uid}`)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: GET_ALL_REVIEW_BY_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getAllReviewByUser", error);
      });
  };
}
