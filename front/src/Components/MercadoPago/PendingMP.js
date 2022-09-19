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


function PendingMP() {
  	
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
	console.log("La orden es esta: ", order)
	const history = useHistory();
 
  useEffect(() => {
	console.log("Entro en el useEffect que dispara la petición de la compra hecha")
    if (mpID && activeCartPaymentId) {
      	dispatch(asyncGetMP(mpID,activeCartPaymentId));     
    }
	return () => {
		dispatch(getCartDB(uid)) 
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
    history.push("/home");    
  }
  return (
		<div className={s.container}>
			<div className={s.cont}>
				<div className={s.contGreen}>
					<div className={s.check}><BsExclamationCircle fontSize="6rem"/></div>
					<h1 className={s.titulo}>PAGO PENDIENTE</h1>
					<div className={s.transaccion}>
						Numero transacción: <span className={s.pID}>{order.transactionId || "Pendiente"}</span>
					</div>
					<div className={s.transaccion}>
						Estado: <span className={s.pID}>{order.status || "Pendiente"}</span>
					</div>
					<div className={s.transaccion}>
						Nota: <span className={s.pID}>Esperando aprobación de mercado pago</span><br/>
						<small>En el momento de recibir la aprobación, recibirá una notificación.</small>
					</div>
					<span className={s.itemsTotales}>Total items: {activeCartQuantity}</span>
		
					<TableContainer className={s.tabla}>
						<Table key={Math.random()} variant='striped' colorScheme='green'>
							<Thead>
								<Tr>
								<Th className={s.tituloTabla}>Libro</Th>
								<Th isNumeric className={s.tituloTabla}>Cantidad</Th>
								<Th isNumeric className={s.tituloTabla}>Precio</Th>
								</Tr>
							</Thead>
							<Tbody>
								{
								order.items.map(i => {
									return (
									<Tr>
										<Td>{i.title}</Td>
										<Td>{i.quantity}</Td>
										<Td isNumeric>{i.price}</Td>
									</Tr>
									)
								})
								}
							</Tbody>
						</Table>
					</TableContainer>
					<span>
						Total Libros: <span className={s.price}> ${activeCartAmount}</span>
					</span>
					<span>
						Gastos de envio: <span className={s.price}> ${1500}</span>
					</span>
					<span>
						Total: <span className={s.price}> ${parseFloat(order.total + 1500).toFixed(2)}</span>
					</span>
					<Button className={s.boton} onClick={goBack}>Seguir Comprando</Button>
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
