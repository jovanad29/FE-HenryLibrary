import React, { useEffect, useState } from "react";

//CSS
import styles from "./ShoppingBook.module.css";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

export const ItemCart = (props) => {
  let {
    id,
    title,
    image,
    quantity,
    price,
    currentStock,
    handleOnDelete,
    handleChangeQuantity,
  } = props;

  const [value, setValue] = useState(quantity);

  useEffect(() => {
    setValue(quantity < currentStock ? quantity : currentStock);
    handleChangeQuantity(quantity < currentStock ? quantity : currentStock, id, price, currentStock)
    // quantity = quantity < currentStock ? quantity : currentStock;
  }, [quantity]);

  return (
    <div className={styles.item}>
      <img className={styles.img} src={image} alt="" width={10} heigh={10} />

      <div className={styles.info}>
        <div className={styles.infoItem1}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.infoItem2}>
          <h2 className={styles.precio}>
            Precio: $ {parseFloat(price).toFixed(2)}
          </h2>
          <div className={styles.cantidadContainer}>
            <label className={styles.cantidad}>Cantidad: </label>
            <button
              onClick={() =>
                handleChangeQuantity(value - 1, id, price, currentStock)
              }
            >
              <BiMinus color="#01A86C"/>
            </button>
            <input
              type="number"
              className={styles.cantidadInput}
              // defaultValue={quantity}
              value={value}
              // min={"1"}
              // max={"100"}
              // readOnly
              onChange={(e) =>
                handleChangeQuantity(
                  parseInt(e.target.value),
                  id,
                  price,
                  currentStock
                )
              }
            />
            <button
              onClick={() =>
                handleChangeQuantity(value + 1, id, price, currentStock)
              }
            >
              <BsPlus color="#01A86C"/>
            </button>
            <button
              className={styles.itemCancelarResponsive} onClick={() => handleOnDelete(id, 0, 0)}><FaTrashAlt color="#01A86C"/>
            </button>

            {/*quantity*/}
          </div>
          <h2 className={styles.precio}>
            Total: $ {parseFloat(price * quantity).toFixed(2)}
          </h2>
          <button
            className={styles.itemCancelar}
            onClick={() => handleOnDelete(id, 0, 0)}
          >
            <FaTrashAlt color="#01A86C" size="1rem" />
          </button>
        </div>
      </div>
    </div>
  );
};
