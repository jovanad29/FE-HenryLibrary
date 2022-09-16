import axios from "axios";

export const GET_DIRECTIONS_USERS = "GET_DIRECTIONS_USERS";

export function getDirectionsUser(uid) {
  return (dispatch) => {
    try {
    //  await
      axios.get(`/mercadopago/adresses/${uid}`)
        .then((response) => {
          dispatch({
            type: GET_DIRECTIONS_USERS,
            payload: response.data.addresses,
          });
        })
    } catch (error) {
      console.log("getDirectionsUser", error);
    };
  };
}
