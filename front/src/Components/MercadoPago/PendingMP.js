import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  // asyncConfirmPayment,
  asyncGetMP,
} from "../../actions/checkoutActions";
import { clearPayment } from '../../reducer/checkoutSlice';
import Loading from "../Loading/Loading";
import s from "./MercadoPago.module.sass";

function PendingMP() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);
  const { mpID, order } = useSelector((state) => state.checkout);
  const { stack } = useSelector((state) => state.history);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!front.ID) {
      setOrder({ ...order });
    }
    if (order.items.length > 0 && userProfile.ID) {
      setLoading(false);
      // dispatch(
      //   asyncConfirmPayment({ ...order, userID: parseInt(userProfile.ID) })
      // );
      dispatch(clearPayment());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, userProfile]);
  useEffect(() => {}, [front]);
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
      {loading ? <Loading /> : null}
      <div className={s.cont}>
        <div className={s.contYellow}>
          <h1>Payment {front.status}</h1>
          <span className={s.pIDP}>
            Payment ID: <span>{front.ID}</span>
          </span>
          <span>Total items: {front.items.length}</span>
          <span>
            You need to complete the payment to receive your purchase.
          </span>
          <div className={s.keep} onClick={goBack}>
            Keep buying
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMP;
