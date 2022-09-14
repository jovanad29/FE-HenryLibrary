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
import s from "./MercadoPago.module.sass";
import Loading from "../Loading/Loading";

export default function SuccessMP() {
  const dispatch = useDispatch();

  const { mpID, order, activeCartPaymentId, uid } = useSelector(
    (state) => state
  );

  const history = useHistory();
  const [change, setChange] = useState(true);
  const [front, setOrder1] = useState({
    // hace falta de verdad? No sería mejor usar order del store directamente?
    ID: mpID,
    items: order.items,
    status: order.status,
    status_detail: order.status_detail,
    total: order.total,
  });

  useEffect(() => {
    if (mpID && activeCartPaymentId) {
      dispatch(asyncGetMP(mpID, activeCartPaymentId)); ////MIRAR
    
      // console.log('en success con mpID'+ mpID)
      setOrder1(order);
    }
    //  else {
    //   history.push("/");
    // }
    return () => {
      dispatch(getCartDB(uid))
      // dispatch(clearPayment());  // este parece ser el problema
      // setOrder1({
      //   ID: "",
      //   items: [],
      //   status: "",
      //   status_detail: "",
      //   total: 0,
      // });
      setChange(false);
    };
   
  }, [mpID, activeCartPaymentId]);
  const [loading, setLoading] = useState(false);
  //  const loading = false;
  useEffect(() => {
    if (!front.ID) {
      setOrder1({ ...order });
    }

    if (change && order.items.length > 0 && uid) {
      let obj = { ...order };
      console.log("esto tiene obj:", obj);
      setChange(false);

      axios
        .post(`/paymentsOrder/create`, { ...obj, userID: uid })
        .then((r) => console.log("se guardó en DB"))
        .catch((e) => console.loe("no se guardó en DB", e));

        
      
        

    }
  }, [order, uid, change, front.ID]);

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
            Numero transacción: <span>{front.ID}</span>
          </span>
          <span className={s.pID}>{front.status}</span>
          <span>Total items: {front.items.length}</span>
          <ul>
            {front.items.map((i) => {
              return <li>{i.title}</li>;
            })}
          </ul>
          <span>
            Total: <span className={s.price}> ${front.total}</span>
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
