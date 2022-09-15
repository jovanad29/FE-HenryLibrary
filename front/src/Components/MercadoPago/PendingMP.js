import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearPayment,
  asyncGetMP,
} from "../../actions/checkoutActions";

import Loading from "../Loading/Loading";
import s from "./MercadoPago.module.sass";

function PendingMP() {
  const dispatch = useDispatch();
  //const { userProfile } = useSelector((state) => state.profile);
  const { mpID, order, uid } = useSelector((state) => state);
  
  const history = useHistory();
  const [front, setOrder] = useState({
    ID: order.order,
    items: order.items,
    status: order.status,
    status_detail: order.status_detail,
    total: order.total,
  });
  useEffect(() => {
    if (mpID) {
      dispatch(asyncGetMP(mpID));
      setOrder({ ...order });
    } else {
      history.push("/");
    }
    return () => {
      dispatch(clearPayment());
    };
  
  }, [mpID]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!front.ID) {
      setOrder({ ...order });
    }
    if (order.items.length > 0 && uid) {
      setLoading(false);
    
      dispatch(clearPayment());
    }
   
  }, [order, uid]);
  useEffect(() => {}, [front]);
  function goBack(e) {
    e.preventDefault();
    history.push("/home");
    
  }
  return (
    <div className={s.container}>
      {loading ? <Loading /> : null}
      <div className={s.cont}>
        <div className={s.contYellow}>
          <h1>Payment {front.status}</h1>
          <span className={s.pIDP}>
            Payment ID: <span>{front.ID}</span>
          </span>
          <span>Total items: {front.items.length}</span>
          <span>
            Necesita completar el pago para recibir su Orden de Compra.
          </span>
          <div className={s.keep} onClick={goBack}>
            Seguir comprando 
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMP;
