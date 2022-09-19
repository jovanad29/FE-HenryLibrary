import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncGetMP } from "../../actions/checkoutActions.js";
import axios from "axios";
import Loading from "../Loading/Loading";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import s from "./SuccessMP.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { getCartDB } from "../../actions/index.js";

export default function SuccessMP() {
  const dispatch = useDispatch();
  const {
    mpID,
    order,
    activeCartPaymentId,
    uid,
    activeCartQuantity,
    activeCartAmount,
  } = useSelector((state) => state);

  const history = useHistory();

  useEffect(() => {
    if (mpID && activeCartPaymentId) {
      dispatch(asyncGetMP(mpID, activeCartPaymentId));
    }
  }, [mpID, activeCartPaymentId, dispatch]);

  useEffect(() => {
    if (order.items.length && uid) {
      axios
        .post(`/mercadopago/create`, { ...order, userID: uid })
        .then((r) => {
          console.log("se guardó en DB", r);
        })
        .catch((e) => console.log("no se guardó en DB", e));
    }
  }, [order, uid]); // front.ID

  function goBack(e) {
    e.preventDefault();
    dispatch(getCartDB(uid));
    history.push("/home");
    // }
  }
  return (
    <>
      {order.items.length > 0 ? (
        <div className={s.container}>
          {/* {loading && <Loading />} */}
          <div className={s.cont}>
            <div className={s.contGreen}>
              <div className={s.check}>
                <BsCheckCircle fontSize="6rem" />
              </div>
              <h1 className={s.titulo}>PAGO EXITOSO</h1>
              <div className={s.transaccion}>
                Numero transacción:{" "}
                <span className={s.pID}>{order.transactionId}</span>
              </div>
              <div className={s.transaccion}>
                Estado: <span className={s.pID}>{order.status}</span>
              </div>
              <span className={s.itemsTotales}>
                Total items: {activeCartQuantity}
              </span>{" "}
              {/* y si tengo más de 1 mismo item ? */}
              <TableContainer className={s.tabla}>
                <Table
                  key={Math.random()}
                  variant="striped"
                  colorScheme="green"
                >
                  <Thead>
                    <Tr>
                      <Th className={s.tituloTabla}>Libro</Th>
                      <Th isNumeric className={s.tituloTabla}>
                        Cantidad
                      </Th>
                      <Th isNumeric className={s.tituloTabla}>
                        Precio
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {order.items.map((i) => {
                      return (
                        <Tr>
                          <Td>{i.title}</Td>
                          <Td isNumeric>
                            {i.bookId !== 0 && i.title !== "Retira en Sucursal"
                              ? i.quantity
                              : " "}
                          </Td>
                          <Td isNumeric>
                            {i.bookId !== 0 && i.title !== "Retira en Sucursal"
                              ? i.price
                              : " "}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <span className={s.totalLibros}>
                Total Libros:{" "}
                <span className={s.price}> ${activeCartAmount}</span>
              </span>
              {/* <span>
              Gastos de envio: <span className={s.price}> ${1000}</span>
            </span> */}
              <span>
                Total:{" "}
                <span className={s.price}>
                  {" "}
                  ${parseFloat(order.total).toFixed(2)}
                </span>
              </span>
              <Button className={s.boton} onClick={goBack}>
                Seguir Comprando
              </Button>
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
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
