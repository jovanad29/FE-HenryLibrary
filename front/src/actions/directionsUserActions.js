import axios from "axios";

export const GET_DIRECTIONS_USERS = "GET_DIRECTIONS_USERS";

export function getDirectionsUser(uid) {
  return (dispatch) => {
    try {
     
      axios.get(`/mercadopago/adresses/${uid}`)
        .then((response) => {
          dispatch({
            type: GET_DIRECTIONS_USERS,
            payload: response.data.deliveryAddress,
          });
        })
    } catch (error) {
      console.log("getDirectionsUser", error);
    };
  };
}
