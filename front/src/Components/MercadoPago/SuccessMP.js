import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  asyncConfirmPayment,
  asyncGetMP,
  clearPayment,
} from "../../actions/checkoutActions.js";
import {getCartDB} from '../../actions/index';
import axios from "axios";
// import s from "./MercadoPago.module.sass";
import Loading from "../Loading/Loading";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button
} from '@chakra-ui/react'
import s from "./SuccessMP.module.css"




export default function SuccessMP() {
  const dispatch = useDispatch();

  const { mpID, order, activeCartPaymentId, uid} = useSelector((state) => state);
  // console.log("Estoy recuperando el store en SuccessMP", mpID, order, activeCartPaymentId)
 // const { stack } = useSelector((state) => state.stack);
  const history = useHistory();
  // const [change, setChange] = useState(true); // para qué es esto?
  // const order = {
  //   transactionId: mpID,
  //   items,
  //   // userId  -> se agrega en el componente que pide la orden (rel. Checkout)
  //   paymentType: response.payment_type_id,
  //   total: parseFloat(response.transaction_details.total_paid_amount),
  //   paymentMethodId: response.payment_type_id,
  //   status: response.status,
  //   statusDetail: response.status_detail,
  //   deliveryAddress: "dirección de envío"
  // }
  // const [front, setOrder1] = useState({ // hace falta de verdad? No sería mejor usar order del store directamente?
  //   ID: order.transactionId,
  //   items: order.items,
  //   status: order.status,
  //   status_detail: order.statusDetail,
  //   total: order.total,
  // });
  // const [paymentId, setPaymentId] = useState(activeCartPaymentId)
  // useEffect(() => {
  // }, [activeCartPaymentId])
  useEffect(() => {
    if (mpID && activeCartPaymentId) {
      dispatch(asyncGetMP(mpID,activeCartPaymentId)); ////MIRAR
      // console.log("se hace algo después del asyncGetMP?")
      // console.log('en success con mpID'+ mpID)
      // setOrder1(order);
    }
    //  else {
    //   history.push("/");
    // }
    // return () => {
      // dispatch(clearPayment());  // este parece ser el problema
      // setOrder1({
      //   ID: "",
      //   items: [],
      //   status: "",
      //   status_detail: "",
      //   total: 0,
      // });
      // setChange(false);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mpID, activeCartPaymentId]);
  const [loading, setLoading] = useState(false);
  //  const loading = false;
  useEffect(() => {
    // console.log("estoy en el useEffect de la creación de datos en DB")
    // if (!front.ID) {
    //   setOrder1({ ...order });
    // }
    console.log("la condición para crear paymentOrder es: ", order.items.length > 0 && uid)
   if (order.items.length > 0 && uid) { // antes también se evaluaba el estado 'change'
      console.log("render")
      // setChange(false);
      // dispatch( // está dando problemas // porque limpia el estado de order
      //   asyncConfirmPayment({ ...obj, userID: uid })//mirar si esta OK ?????
      // )
      // .then((res) => {
        // if (res) {
         // dispatch(getCartDB(uid)).then((res2) => {/// esta parte  hay que traer CARTS!!! se traen del estado !!! 
          //  if ( activeCart) {
              // setLoading(false);
          
        //  }
         //);
        // }
      // });
      // axios.post(`/paymentsOrder/create`, { ...order, userID: uid })
      axios.post(`/mercadopago/create`, { ...order, userID: uid })
      .then( r => console.log("se guardó en DB", r))
      .catch( e => console.log("no se guardó en DB", e))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  //}
  }, [order, uid]); // front.ID

  function goBack(e) {
    e.preventDefault();
    history.push("/home");
    // }
  }
  return (
    <div className={s.container}>
      {loading && <Loading />}
      <div className={s.cont}>
        <div className={s.contGreen}>
          <h1 className={s.titulo}>PAGO EXITOSO</h1>
          <div className={s.transaccion}>
            Numero transacción: <span className={s.pID}>{order.transactionId}</span>
          </div>
          <div className={s.transaccion}>
            Estado: <span className={s.pID}>{order.status}</span>
          </div>

          <span className={s.itemsTotales}>Total items: {order.items.length}</span> {/* y si tengo más de 1 mismo item ? */}

          <TableContainer className={s.tabla}>
            <Table key={Math.random()} variant='striped' colorScheme='green'>
              <Thead>
                <Tr>
                  <Th className={s.tituloTabla}>Libro</Th>
                  <Th isNumeric className={s.tituloTabla}>Cantidad</Th>
                  <Th isNumeric className={s.tituloTabla}>Precio</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  order.items.map(i => {
                    return (
                      <Tr>
                        <Td>{i.title}</Td>
                        <Td>{i.quantity}</Td>
                        <Td isNumeric>{i.price}</Td>
                      </Tr>
                    )
                  })
                }
              </Tbody>
            </Table>
          </TableContainer>

          <span className={s.total}>
            Total: <span className={s.price}> ${order.total}</span>
          </span>

          <Button className={s.boton} onClick={goBack}>Seguir Comprando</Button>

        </div>
        <div className={s.successCheckmark}>
          <div className={s.checkIcon}>
            <span className={`${s.iconLine} ${s.lineTip}`}></span>
            <span className={`${s.iconLine} ${s.lineLong}`}></span>
            <div className={s.iconCircle}></div>
            <div className={s.iconFix}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
