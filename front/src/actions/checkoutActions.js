import axios from "axios";
export const SET_ITEMS='SET_ITEMS';
export const SET_PAYMENT='SET_PAYMENT';
export const SET_ORDER='SET_ORDER';
export const CLEAR_PAYMENT='CLEAR_PAYMENT';

// const heroku = `https://db-proyecto-final.herokuapp.com`;//cambiar al nuestro cuando funcione!!
// axios.defaults.baseURL = 'https://api.mercadopago.com/v1';

export function asyncConfirmPayment(body) {
  //await axios.post(`/payments/create`, body)
    return {type:CLEAR_PAYMENT }
  };


export function asyncGetMP(mpID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`https://api.mercadopago.com/v1/payments/${mpID}`, {
          headers: {
            Authorization: `Bearer TEST-304236252926467-071712-29f3115ab12dc5ed7152e3a819778937-1162304452`,
            //`Bearer TEST-1348940567218445-090211-5c24fe1e622ae718ae0317624678eff0-64199374`,
          },
        })
      ).data;
      var items = response.additional_info.items.map((i) => {
        return {
          id: i.id,
          quantity: 1,
          image: i.picture_url,
          title: i.title,
          price: parseFloat(i.unit_price).toFixed(2),
        };
      });
      dispatch({
        type:SET_ORDER, 
        payload:
        {
          id: mpID,
          items: items,
          status: response.status,
          status_detail: response.status_detail,
          total: parseFloat(response.transaction_details.total_paid_amount),
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  };
 
}
export function setOrder(order) {
  return  function (dispatch) {
    try {      
      dispatch({
        type: SET_ORDER,
        payload: order
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export function setItems(items) {
  console.log('Estoy en la action', items);
  return {
    type: SET_ITEMS,
    payload: items
  };
}
