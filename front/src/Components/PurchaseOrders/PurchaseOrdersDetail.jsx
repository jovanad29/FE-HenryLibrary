import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import styles from "../ShoppingBook/ShoppingBook.module.css";

export default function PurchaseOrdersDetail({data}) {
    const dispatch = useDispatch();
    const {
        allCartByUser,
    } = useSelector((state) => state);
    const [order, setOrder] = useState([]);

    useEffect(() => {
          let allOrders = allCartByUser;
          let orderId = allOrders.find((o) => o.id === data);
          setOrder(orderId);
    }, [allCartByUser,data,dispatch]);

    let totalAmount = parseFloat(order.totalAmount).toFixed(2);

    function handleBuyingBooks(e) {
        e.preventDefault();
        // history.push("/shoppingcart");
    }
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
 
            <div className={styles.container}>
              <div className={styles.container1}>
                <div>
                  {books}
                </div>

              </div>
              <div className={styles.container2}>
                Total: ${totalAmount}
                <div className={styles.button}>
                    <button
                        className={styles.comprar}
                        onClick={(e) =>
                            handleBuyingBooks(e)
                        }
                    >
                        Falta Funcionalidad!
                    </button> 
                </div>
            </div>
      </div>

    
      
  )
}
