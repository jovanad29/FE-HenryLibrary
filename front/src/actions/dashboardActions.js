import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_REVIEW_BY_USER = "GET_ALL_REVIEW_BY_USER"



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



export function getAllReviewByUser(uid) {
  return (dispatch) => {
    axios
      .get(`/reviews?uid=${uid}`)
      .then((response) => {
        console.log(response.data)
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
