import axios from "axios";

export const GET_USERS_BY_ID = "GET_USERS_BY_ID";

export function getUserById(uid) {
  return (dispatch) => {
    axios
      .get(`/user?uid=${uid}`)
      .then((response) => {
        dispatch({
          type: GET_USERS_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getUserById", error);
      });
  };
}
