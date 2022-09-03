import axios from "axios";
import { clearPayment, setOrder } from "../reducer/checkoutSlice";
const heroku = `https://db-proyecto-final.herokuapp.com`;//cambiar al nuestro cuando funcione!!
axios.defaults.baseURL = heroku;

export function asyncConfirmPayment(body) {
  return async function (dispatch) {
    try {
      await axios.post(`/payments/create`, body);
      dispatch(clearPayment());
      return true;
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncGetMP(mpID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`https://api.mercadopago.com/v1/payments/${mpID}`, {
          headers: {
            Authorization: `Bearer TEST-304236252926467-071712-29f3115ab12dc5ed7152e3a819778937-1162304452`,
          },
        })
      ).data;
      var items = response.additional_info.items.map((i) => {
        return {
          ID: i.id,
          quantity: 1,
          image: i.picture_url,
          title: i.title,
          price: parseFloat(i.unit_price).toFixed(2),
        };
      });
      dispatch(
        setOrder({
          ID: mpID,
          items: items,
          status: response.status,
          status_detail: response.status_detail,
          total: parseFloat(response.transaction_details.total_paid_amount),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
