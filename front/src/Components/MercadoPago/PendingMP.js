import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  asyncGetMP,
} from "../../actions/checkoutActions";


import s from "./PendingMP.module.css"
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button
} from '@chakra-ui/react'
import {BsExclamationCircle} from "react-icons/bs"
import { getCartDB } from "../../actions";
import { useTranslation } from "react-i18next";


function PendingMP() {
  	const { t } = useTranslation()
	const dispatch = useDispatch();
	//const { userProfile } = useSelector((state) => state.profile);
	const {
			mpID, 
			order,
			activeCartPaymentId,
			uid,
			activeCartQuantity,
			activeCartAmount,
			items
		} = useSelector((state) => state);
	const history = useHistory();
 
  useEffect(() => {
    if (mpID && activeCartPaymentId) {
      	dispatch(asyncGetMP(mpID,activeCartPaymentId));     
    }
	 //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mpID, activeCartPaymentId ]);

  useEffect(() => {	
    if (order.items.length && uid) {
       axios.post(`/mercadopago/create`, { ...order, userID: uid })
       .then( r => console.log("se guardó en DB", r))
       .catch( e => console.log("no se guardó en DB", e))
    }   
  }, [order, uid, items]);
  
  function goBack(e) {
    e.preventDefault();
    dispatch(getCartDB(uid));
    history.push("/home");    
  }
  return (
		<div className={s.container}>
			<div className={s.cont}>
				<div className={s.contGreen}>
					<div className={s.check}><BsExclamationCircle fontSize="6rem"/></div>
					<h1 className={s.titulo}>{t("pendiente")}</h1>
					<div className={s.transaccion}>
						{t("transaccion")}: <span className={s.pID}>{order.transactionId || "Pendiente"}</span>
					</div>
					<div className={s.transaccion}>
						{t("status")}: <span className={s.pID}>{order.status || "Pendiente"}</span>
					</div>
					<div className={s.transaccion}>
						{t("nota")}: <small>{t("descNota")}</small>
					</div>
					<span className={s.itemsTotales}>Total items: {activeCartQuantity}</span>
		
					<TableContainer className={s.tabla}>
						<Table key={Math.random()} variant='striped' colorScheme='green'>
							<Thead>
								<Tr>
								<Th className={s.tituloTabla}>{t("libro")}</Th>
								<Th isNumeric className={s.tituloTabla}>{t("qty")}</Th>
								<Th isNumeric className={s.tituloTabla}>{t("precio")}</Th>
								</Tr>
							</Thead>
							<Tbody>
							{order.withDelivery?.map((i) => {
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
					<span>
						Total {t("libros")}: <span className={s.price}> ${activeCartAmount}</span>
					</span>
					<span>
						Total: <span className={s.price}> ${parseFloat(order.total ).toFixed(2)}</span>
					</span>
					<Button className={s.boton} onClick={goBack}>{t("continuarComprando")}</Button>
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
    );
}

export default PendingMP;
