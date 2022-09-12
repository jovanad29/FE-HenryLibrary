import axios from "axios";
export const SET_ITEMS='SET_ITEMS';
export const SET_PAYMENT='SET_PAYMENT';
export const SET_ORDER='SET_ORDER';
export const CLEAR_PAYMENT='CLEAR_PAYMENT';
//pagos
export const PUT_USER_CARTS_STATUS = "PUT_USERS_CARTS_STATUS";

// const heroku = `https://db-proyecto-final.herokuapp.com`;//cambiar al nuestro cuando funcione!!
//axios.defaults.baseURL = 'https://api.mercadopago.com/v1';
//axios.defaults.baseURL='http://localhost:3000/'
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

// export async function asyncConfirmPayment(body) { // está dando problemas
//   try {
//       const response= await axios.post(`/paymentsOrder/create`, body).data  //Aqui se crea el pago en la base !!!!
//     //return {type:CLEAR_PAYMENT }
//     // console.log(' Se creo en paymentOrder con esto datos :', response)
//     // return response
//   } catch (error) {
//     console.log(error);
//   }

//   };

export function setOrder(order) {
    console.log("estoy en la action setOrder: ", order)
    return   {
          type: SET_ORDER,
          payload: order
        }
    }
export function asyncGetMP(mpID) { // ejecuta el pago en mercadopago
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`https://api.mercadopago.com/v1/payments/${mpID}`, {
          headers: {
            Authorization: `Bearer TEST-304236252926467-071712-29f3115ab12dc5ed7152e3a819778937-1162304452`
            //`Bearer TEST-6623451607855904-111502-83c610c2165674e9bba665cfb4aa6b0c-672708410`,
            //`Bearer TEST-1348940567218445-090211-5c24fe1e622ae718ae0317624678eff0-64199374`,//al cliente?
          },
        })
      ).data;
      console.log("estoy en la action asyncGetMP: ", response)
      
      const items = response.additional_info.items.map((i) => {
        return {
          id: i.id,
          quantity: i.quantity,
          image: i.picture_url,
          title: i.title,
          price: parseFloat(i.unit_price).toFixed(2),
        };
      });

      let orderobj={ ID: mpID,
            items: items,
            status: response.status,
            status_detail: response.status_detail,
            total: parseFloat(response.transaction_details.total_paid_amount)}
      dispatch( setOrder(orderobj));
      console.log("se envía a guardar la orden de compra si status === 'approved'") // si esto se imprime,
                                                                                  // hacer el cambio de estado en el cart debajo
      try {
        const status = {'approved': 4}
        axios.put(`/idDelCarritoEnBD/status/${status[response.status]}`) // de dónde lo saco?
        console.log("se cambió el estatus?")
      } catch (error) {
        console.log("no se cambió el estatus")
      }
    } catch (error) {
      console.log(error);
    }
  };
 
}



export function setItems(items) {
  //console.log('Estoy en la action', items);
  return {
    type: SET_ITEMS,
    payload: items
  };
}

  export function clearPayment ()  {
    return{
    type: CLEAR_PAYMENT,
    payload : null,
}}

export function setPayment (mpID)  {
  
  return{
    type: SET_PAYMENT,
    payload :mpID,
}
}



