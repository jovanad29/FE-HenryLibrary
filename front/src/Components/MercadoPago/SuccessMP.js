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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation()
  useEffect(() => {
    if (mpID && activeCartPaymentId) {
      dispatch(asyncGetMP(mpID, activeCartPaymentId));
    }
  //eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [mpID, activeCartPaymentId]);

  useEffect(() => {
    if (order.items.length && uid) {
      axios
        .post(`/mercadopago/create`, { ...order, userID: uid })
        .then((r) => console.log("se guardó en DB", r.json()))
        .catch((e) => console.log("no se guardó en DB", e));
    }
  }, [order, uid]); 

  function goBack(e) {
    e.preventDefault();
    dispatch(getCartDB(uid));
    history.push("/home");
  }
	return (
		<>
			{order.items.length > 0 ? (
			<div className={s.container}>				
				<div className={s.cont}>
					<div className={s.contGreen}>
						<div className={s.check}>
							<BsCheckCircle fontSize="6rem" />
						</div>
						<h1 className={s.titulo}>{t("exito")}</h1>
						<div className={s.transaccion}>
							{t("transaccion")}:{" "}
							<span className={s.pID}>{order.transactionId}</span>
						</div>
						<div className={s.transaccion}>
							{t("status")}: <span className={s.pID}>{order.status}</span>
						</div>
						<span className={s.itemsTotales}>
							Total items: {activeCartQuantity}
						</span>{" "}
						<TableContainer className={s.tabla}>
						<Table
							key={Math.random()}
							variant="striped"
							colorScheme="green"
						>
							<Thead>
								<Tr>
									<Th className={s.tituloTabla}>{t("libro")}</Th>
									<Th isNumeric className={s.tituloTabla}>
										{t("qty")}
									</Th>
									<Th isNumeric className={s.tituloTabla}>
										{t("precio")}
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{order.withDelivery.map((i) => {
									return (
									<Tr>
										<Td>{i.title}</Td>
										<Td isNumeric>
											{i.bookId !== 0 && i.description !== "Retira en Sucursal"
												? i.quantity
												: " "}
										</Td>
										<Td isNumeric>
											{i.bookId !== 0 && i.description !== "Retira en Sucursal"
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
							Total {t("libros")}:{" "}
							<span className={s.price}> ${activeCartAmount}</span>
						</span>
						<span className={s.total}>
							Total:{" "}
							<span className={s.price}>
								{" "}
								${parseFloat(order.total).toFixed(2)}
							</span>
						</span>
						<Button className={s.boton} onClick={goBack}>
							{t("continuarComprando")}
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
