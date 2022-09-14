import axios from "axios";

export const GET_DIRECTIONS_USERS = "GET_DIRECTIONS_USERS";

export function getDirectionsUser(uid) {
  return (dispatch) => {
    axios
      .get(`/user?uid=${uid}`)
      .then((response) => {
        dispatch({
          type: GET_DIRECTIONS_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("getDirectionsUser", error);
      });
  };
}
