import axios from "axios";
export const SET_ITEMS = "SET_ITEMS";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ORDER = "SET_ORDER";
export const CLEAR_PAYMENT = "CLEAR_PAYMENT";
export const SET_DELIVERY_ADDRESS="SET_DELIVERY_ADDRESS"

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

export function setOrder(order) {
  console.log("estoy en la action setOrder: ", order)
  return {
    type: SET_ORDER,
    payload: order
  }
}
export function asyncGetMP(mpID, idCart) { // ejecuta el pago en mercadopago
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`https://api.mercadopago.com/v1/payments/${mpID}`, {
          headers: {
            Authorization: `Bearer TEST-304236252926467-071712-29f3115ab12dc5ed7152e3a819778937-1162304452`,
          },
        })
      ).data;
      console.log("estoy en la action asyncGetMP: ", response)

      const items = response.additional_info.items.map((i) => {
        return {
          bookId: i.id,
          quantity: i.quantity,
          paymentMpId: mpID,
          image: i.picture_url,
          title: i.title,
          price: parseFloat(i.unit_price).toFixed(2),
        };
      });

      // let orderobj = { ID: mpID,
      //       items: items,
      //       status: response.status,
      //       status_detail: response.status_detail,
      //       total: parseFloat(response.transaction_details.total_paid_amount)}
      const order = {
        transactionId: mpID,
        items,
        // userId  -> se agrega en el componente que pide la orden (rel. Checkout)
        paymentType: response.payment_type_id,
        total: parseFloat(response.transaction_details.total_paid_amount),
        paymentMethodId: response.payment_type_id,
        status: response.status,
        statusDetail: response.status_detail,
        deliveryAddress: "dirección de envío"
      }
      dispatch(setOrder(order)); // esto va al store y se usa en el componente que lo pide
      const status = {'approved': 4, 'in_process': 2} // falta actualizar con el transactionID                                                         // hacer el cambio de estado en el cart debajo
      try {       
        await axios.put(`/payments/${idCart}/status/${status[response.status]}`) // cambio el estatus del pedido de carrito a aprobado
      } catch (error) {
        console.log(error)
      }
      
    } catch (error) {
      console.log(error);
    }
  };
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    payload: items,
  };
}

export function clearPayment() {
  return {
    type: CLEAR_PAYMENT,
    payload: null,
  };
}

export function setPayment(mpID) {
  return {
    type: SET_PAYMENT,
    payload: mpID,
  };
}


export function setDeliveryAddress(deliveryAddress) {
  return {
    type: SET_DELIVERY_ADDRESS,
    payload: deliveryAddress,
  };
}
