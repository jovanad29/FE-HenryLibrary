import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  asyncGetMP,} from "../../actions/checkoutActions.js";
import axios from "axios";
import s from "./MercadoPago.module.sass";
import Loading from "../Loading/Loading";

export default function SuccessMP() {
  const dispatch = useDispatch();

  const { mpID, 
      order,
     activeCartPaymentId,
     uid, activeCartQuantity,
     activeCartAmount,} = useSelector((state) => state);
  // console.log("Estoy recuperando el store en SuccessMP", mpID, order, activeCartPaymentId)
 
  const history = useHistory();
  
  useEffect(() => {
    if (mpID && activeCartPaymentId) {
      dispatch(asyncGetMP(mpID,activeCartPaymentId)); ////MIRAR
      
    }
    //  else {
    //   history.push("/home");
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
  
  }, [mpID, activeCartPaymentId]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
  
   if (order.items.length > 0 && uid) { // antes también se evaluaba el estado 'change'
     // console.log("render")
      
      axios.post(`/mercadopago/create`, { ...order, userID: uid })
      .then( r => console.log("se guardó en DB", r))
      .catch( e => console.log("no se guardó en DB", e))
    }

   
  }, [order, uid]); // front.ID

  function goBack(e) {
    e.preventDefault();
    history.push("/home");
    // }
  }
  return (
    <div className={s.container}>
      {loading ? <Loading /> : null}
      <div className={s.cont}>
        <div className={s.contGreen}>
          <h1>Pago exitoso</h1>
          <span className={s.pID}>
            Numero transacción: <span>{order.transactionId}</span>
          </span>
          <span className={s.pID}>{order.status}</span>
          <span>Total items: {activeCartQuantity}</span> {/* y si tengo más de 1 mismo item ? */}
          <ul>
            {
              order.items.map(i => {
                return <li key={Math.random()}>{i.title} Cantidad: {i.quantity} </li>
              })
            }
          </ul>
          <span>
            Total Libros: <span className={s.price}> ${activeCartAmount}</span>
          </span>
          <span>
            Gastos de envio: <span className={s.price}> ${1500}</span>
          </span>
          <span>
            Total: <span className={s.price}> ${order.total + 1500 }</span>
          </span>
          <div className={s.keep} onClick={goBack}>
            Seguir Comprando
          </div>
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
