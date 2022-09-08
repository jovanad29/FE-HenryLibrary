import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  // asyncConfirmPayment,
  asyncGetMP,
} from "../../actions/checkoutActions";
import { clearPayment } from "../../reducer/checkoutSlice";
import s from "./MercadoPago.module.sass";
//import Loading from "../Loading/Loading";
//import { asyncGetItemsCart } from "../../redux/actions/usersActions";

export default function SuccessMP() {
  const dispatch = useDispatch();
 // const { userProfile, cart } = useSelector((state) => state.profile);
  const { mpID, order } = useSelector((state) => state.checkout);
  const { stack } = useSelector((state) => state.history);
  const history = useHistory();
  const [change, setChange] = useState(true);
  const [front, setOrder] = useState({
    ID: mpID,
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
      setOrder({
        ID: "",
        items: [],
        status: "",
        status_detail: "",
        total: 0,
      });
      setChange(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [loading, setLoading] = useState(false);
//  const loading = false;
  useEffect(() => {
    if (!front.ID) {
      setOrder({ ...order });
    }

  //  // if (change && order.items.length > 0 && userProfile.ID) {
  //     let obj = { ...order };
  //     setChange(false);
  //     dispatch(
  //       asyncConfirmPayment({ ...obj, userID: parseInt(userProfile.ID) })
  //     )
  //     //.then((res) => {
  //     //   if (res) { consolog
  //     //     dispatch(asyncGetItemsCart(userProfile.ID)).then((res2) => {
  //     //       if (res2) {
  //     //         setLoading(false);
  //     //       }
  //     //     });
  //     //   }
  //     // });
  //   //}

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // //}
     }, [order,/* userProfile,*/ change, front.ID]);
  // useEffect(() => {}, [front, cart]);
  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
        !stack[i].includes("checkout")
      ) {
        lastPath.push(stack[i]);
      }
    }
    if (lastPath.length > 0) {
      history.push(lastPath[0]);
    } else {
      history.push("/");
    }
  }
  return (
    <div className={s.container}>
      {/* {loading ? <Loading /> : null} */}
      <div className={s.cont}>
        <div className={s.contGreen}>
          <h1>Payment successfully</h1>
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


