import React, { useState, useEffect,  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCartDB } from "../../actions/index.js";

import NavBar from "../NavBar/NavBar.jsx";
//CSS
import styles from "../ShoppingBook/ShoppingBook.module.css";

export default function PurchaseOrdersDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        status,
        uid,
        allCartByUser,
    } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
      if (isAuthenticated) {
          dispatch(getAllCartDB(uid));
          
      }
  }, [isAuthenticated, dispatch, uid]);


    useEffect(() => {
        if (isAuthenticated) {
          let allOrders = allCartByUser;

          let orderId = allOrders.find((o) => o.id === parseInt(history.location.pathname.split("/")[2]));
          setOrder(orderId);
          console.log('orderid',orderId);
        }
    }, [allCartByUser]);

    //obtener los datos de la cabecera para imprimir
    let cab = order?.books?.map((b) => {
        let id, items, mont, state, purchaseMetod, date;
        id = order.id;
        //sumar la cantidad total que hay en todas las propiedades quantity de payment_book
        items = 0
        for (let i = 0; i <order.books.length; i++) {
                items = items + order.books[i].payment_book.quantity;
        }
        mont = parseFloat(order.totalAmount).toFixed(2);
        state = order.status;
        purchaseMetod = order.paymentMethod;
        date = order.createdAt;
        return(<div key={id}> 
        Id  {id}
        Items {items}
        Importe/s {mont}
        Estado {state}
        Método de Pago {purchaseMetod}
        Fecha {date}
  
     </div>);
    });

    //obtener los datos de los libros para imprimir
    let books = order?.books?.map((b) => {
      let id, title, image, quantity, price;
      id = b.id;
      title = b.title;
      image = b.image;

      quantity = b.payment_book.quantity;
      price = parseFloat(b.payment_book.price).toFixed(2);
   
      
      return (
          <div className={styles.item} key={id}>
              <img
                  className={styles.img}
                  src={image}
                  alt=""
                  width={10}
                  heigh={10}
              />

              <div className={styles.info}>
                  <div className={styles.infoItem1}>
                      <h3 className={styles.title}>{title}</h3>
                  </div>
                  <div className={styles.infoItem2}>
                      <h2 className={styles.precio}>Precio: $ {price}</h2>
                      <div className={styles.cantidadContainer}>
                          <label className={styles.cantidad}>
                              Cantidad:{" "}
                          </label>
                          
                          {quantity}
                      </div>
                      <h2 className={styles.precio}>
                          Total: $ {price * quantity}
                      </h2>
                      
                  </div>
              </div>
          </div>
      );
  });


  return (
    <div>PurchaseOrdersDetail
      <div>
        <NavBar />
  
        <div className={styles.carrito}>
          <div className={styles.containerGeneral}>
            <div className={styles.tituloPrincipal}>
              <h3>Detalle de Orden</h3>
              <h2>Orden N°: {order.id}</h2>
            </div>
              {cab}
            <div className={styles.container}>
              <div className={styles.container1}>
                <div>
                  {books}
                </div>

              </div>
              <div className={styles.container2}>
                            {order?.length > 0 && (
                                <div className={styles.infoCompra}>
                                    <div className={styles.total}>
                                        <h3>
                                            Total a pagar: $
                                            {/* {parseFloat(totalAmount).toFixed(2)} */}
                                        </h3>
                                    </div>
                                    <div className={styles.button}>
                                        {/* <button
                                            className={styles.comprar}
                                            onClick={(e) =>
                                                handleBuyingBooks(e)
                                            }
                                        >
                                            Comprar
                                        </button> */}
                                    </div>
                                </div>
                            )}
                        </div>
      </div>
          </div>
    </div>
    </div>
      </div>
  )
}
