import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import MercadoPago from "../MercadoPago/MercadoPago";
import s from "./Checkout.module.sass";

function Checkout() {
  const [loading, setLoading] = useState(true);
  // const items  = useSelector((state) => state.items);
 // alert('estoy en checout tengo estos items',items)
  //const { stack } = useSelector((state) => state.history);
 // const status  = useSelector((state) => state.status);
  const { uid, items } = useSelector(state=> state)
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!items.length) {
      history.push("/carrito");
    }
    setLoading(false)    
  }, []);
  // useEffect(() => {
   
  // }, [loading]);
  function goBack() {
    // var lastPath = [];
    // for (let i = 1; i < stack.length; i++) {
    //   if (
    //     stack[i] !== "/register" &&
    //     stack[i] !== "/login" &&
    //     stack[i] !== "/profile"
    //   ) {
    //     lastPath.push(stack[i]);
    //   }
    // }
    // if (lastPath.length > 0) {
    //   history.push(lastPath[0]);
    // } else {
      history.push("/home");
    }
  
  return (
    <div className={s.container}>
    {
      loading ? <Loading /> : 
      <div className={s.ticket}>
        <div className={s.contTicket}>
          <div className={s.backButton}>
            <button className={s.buttonBack} onClick={goBack}>
              Back
            </button>
          </div>
          <h1>Orden de Compra</h1>
          <div className={s.itemsCont}>
            {items?.map((i, key) => (
              <div key={key} className={s.item}>
                <div className={s.titleCont}>
                  <div className={s.imageCont}>
                    <img
                      className={s.image}
                      src={i.picture_url}
                      alt={i.title}
                      title={i.title}
                    />
                  </div>
                  <h4 className={s.title}>{i.title}</h4>
                </div>
                <span>${i.unit_price}</span>
              </div>
            ))}
          </div>
          <div className={s.total}>
            <h3>Total: </h3>
            <span>
              ARS $
              {items
                ?.map((item) => item.unit_price * item.quantity)
                .reduce((prev, curr) => prev + curr, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className={s.MPbutton}>
            {items?.length > 0 ? (
              <MercadoPago
                userID={uid}
                setLoading={setLoading}
                items={items}
              />
            ) : null}
          </div>
        </div>
      </div>
    }
    </div>
  );
}

export default Checkout;
