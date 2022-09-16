import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncGetMP ,clearPayment} from "../../actions/checkoutActions";
import s from "./MercadoPago.module.sass";

function RejectedMP() {
  const dispatch = useDispatch();
  const { mpID, order } = useSelector((state) => state.checkout);
  const history = useHistory();
  useEffect(() => {
    if (mpID) {
      dispatch(asyncGetMP(mpID));
    } else {
      history.push("/");
    }
    return () => {
      dispatch(clearPayment());
    };
   
  }, []);
  function goBack(e) {
    e.preventDefault();
      history.push("/home");
    
  }
  return (
    <div className={s.container}>
      <div className={s.cont}>
        <div className={s.contRed}>
          <h1>Pago Rechazado </h1>
          <span className={s.pID}>
            Numero de transacción: <span>{order.ID}</span>
          </span>
          <span>
            {order.status}: {order.status_detail}
          </span>
          <div className={s.keep} onClick={goBack}>
            Seguir comprando
          </div>
        </div>
        <div className={s.failure}>
          <div className={s.circleborder}></div>
          <div className={s.circle}>
            <div className={s.error}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RejectedMP;
