import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";

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
