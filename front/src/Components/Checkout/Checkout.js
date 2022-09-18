import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import MercadoPago from "../MercadoPago/MercadoPago";
// import s from "./Checkout.module.sass";
import s from "./Checkout.module.css"

function Checkout() {
  const [loading, setLoading] = useState(true);

  const { uid, items } = useSelector(state=> state)
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!items.length) {
      history.push("/carrito");
    }
    setLoading(false)    
  }, []);

  function goBack() {
      history.push("/carrito");
    }
  
  return (
    <div className={s.container}>
    {
      loading ? <Loading /> : 
      <div className={s.ticket}>
        <div className={s.contTicket}>
          <div className={s.backButton}>
            <button className={s.buttonBack} onClick={goBack}>
              Volver
            </button>
          </div>
          <h1 className={s.ordenDeCompra}>Orden de Compra</h1>
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
