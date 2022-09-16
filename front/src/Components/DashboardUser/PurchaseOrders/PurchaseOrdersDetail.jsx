import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//CSS 
import styles from "../../ShoppingBook/ShoppingBook.module.css";


export default function PurchaseOrdersDetail({id}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        allCartByUser,
    } = useSelector((state) => state);
    const [order, setOrder] = useState([]);

    useEffect(() => {
          let allOrders = allCartByUser;
          let orderId = allOrders.find((o) => o.id === id);
          setOrder(orderId);
    }, [allCartByUser,id,dispatch]);

    let totalAmount = parseFloat(order.totalAmount).toFixed(2);

    function handleBuyingBooks(id) {
        if (order.statusId === 1) {
            history.push("/carrito");
        } else { 
           

        // history.push("/shoppingcart");
       }
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
                    <Link to={`/catalog/detail/${id}`}>
                      <h3 className={styles.title}>{title}</h3></Link>
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
                <div className={styles.infoCompra}>
                    <div className={styles.total}>
                        <h3>
                            Total: ${totalAmount} 
                        </h3>
                    </div>
                    <div className={styles.button}>
                        {order.statusId === 1 ? 
                            (<button className={styles.comprar} onClick={(e) => handleBuyingBooks(id)}>Continuar Comprando</button>) :''}
                    </div>

                </div>
            </div>
      </div>

    
      
  )
}
