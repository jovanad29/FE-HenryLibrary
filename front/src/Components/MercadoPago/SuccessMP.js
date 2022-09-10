import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  asyncConfirmPayment,
  asyncGetMP,
  clearPayment
} from "../../actions/checkoutActions.js";
//import { clearPayment } from "../../reducer/checkoutSlice";
import s from "./MercadoPago.module.sass";
import Loading from "../Loading/Loading";
import { getCartDB } from "../../actions/index";//  Traer los items de carrito

export default function SuccessMP() {
  const dispatch = useDispatch();
 // const {  cart } = useSelector((state) => state.profile);
  const { mpID, order , isBanned, uid} = useSelector((state) => state);
  console.log(mpID, order)
 // const { stack } = useSelector((state) => state.stack);
  const history = useHistory();
  const [change, setChange] = useState(true);
  const [front, setOrder1] = useState({
    ID: mpID,
    items: order.items,
    status: order.status,
    status_detail: order.status_detail,
    total: order.total,
  });
  useEffect(() => {
    if (mpID) {
      dispatch(asyncGetMP(mpID)); ////MIRAR
alert ('en succes xon mpID'+ mpID)

      setOrder1(order);
    }
    //  else {
    //   history.push("/");
    // }
    return () => {
      dispatch(clearPayment());
      setOrder1({
        ID: "",
        items: [],
        status: "",
        status_detail: "",
        total: 0,
      });
      setChange(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mpID]);
   const [loading, setLoading] = useState(false);
//  const loading = false;
  useEffect(() => {
    if (!front.ID) {
      setOrder1({ ...order });
    }

   if (change && order.items.length > 0 && uid) {
      let obj = { ...order };

      console.log('esto tiene obj:', obj)
      setChange(false);
      dispatch(
        asyncConfirmPayment({ ...obj, userID: uid })//mirar si esta OK ?????
      )
      .then((res) => {
        if (res) {
         // dispatch(getCartDB(uid)).then((res2) => {/// esta parte  hay que traer CARTS!!!
          //  if (res2) {
              setLoading(false);
          //  }
        //  });
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  //}
     }, [order,uid, change, front.ID]);
  // useEffect(() => {}, [front, cart]);
  function goBack(e) {
  
    //var lastPath = [];
    // for (let i = 1; i < stack.length; i++) {
    //   if (
    //     stack[i] !== "/register" &&
    //     stack[i] !== "/login" &&
    //     stack[i] !== "/profile" &&
    //     stack[i] !== "/favourites" &&
    //     !stack[i].includes("checkout")
    //   ) {
    //     lastPath.push(stack[i]);
    //   }
    // }
    // if (lastPath.length > 0) {
    //   history.push(lastPath[0]);
    // } else {
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
            Payment ID: <span>{front.ID}</span>
          </span>
          <span className={s.pID}>{front.status_detail}</span>
          <span>Total items: {front.items.length}</span>
          <span>
            Total: <span className={s.price}> ${front.total}</span>
          </span>
          <div className={s.keep} onClick={goBack}>
            Keep buying
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


