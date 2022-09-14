import React, { useState, useEffect,  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCartDB} from "../../actions/index.js";

//CSS
import styles from "../ShoppingBook/ShoppingBook.module.css";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'

export default function PurchaseOrders() {
    const history = useHistory();
    const dispatch = useDispatch();  
    //definir un estados local para guardar todas las ordenes de un cliente
    const [orders, setOrders] = useState([]);
    // //definir un estado local para guardar la cantidad de ordens de un cliente
    // const [totalOrders, setTotalOrders] = useState(0);

    const { 
        status, 
        uid,
        allCartByUser,

    } = useSelector((state) => state);
    //traer del estado allCartByUser


    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    //llamar a la action getAllCartDB con el uid del usuario logueado
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllCartDB(uid));
            // setOrders(allCartByUser);
            
        }
    }, [isAuthenticated, dispatch, uid]);

    useEffect(() => {
        
            setOrders(allCartByUser);
            // dispatch(getCantItemsByCart(uid))        
  }, [allCartByUser, dispatch]);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         let totalItems = orders.length;
    //         setTotalOrders(totalItems);
    //         setTotalItemsByUser(cantItemsByCart)
    //     }
    // }, [cantItemsByCart]);

   const itemToPrint = orders?.map((b) => {
    let id, items, totalAmount, state, purchaseMetod, date;
    id = b.id;
    //sumar la cantidad total que hay en todas las propiedades quantity de payment_book
    items = 0
    for (let i = 0; i <b.books.length; i++) {    
            items = items + b.books[i].payment_book.quantity; 
    }
    
    // convertir totalAmount a formato internacional de moneda
    
    totalAmount = (b.totalAmount);
    state = (b.payment_status.description);
    purchaseMetod = (!b.paymentMethodId?.length) ? "-" : b.paymentMethodId;
    date = b.books[0].payment_book.createdAt.slice(0,10);
    return (
        <div key={id}> 
            <TableContainer maxWidth='100%'>
                <Table variant='simple'>  
                    <Tbody>
                        <Tr>
                            <Td>{id}</Td>
                            <Td isNumeric>{items}</Td>
                            
                            <Td isNumeric>{parseFloat(totalAmount).toFixed(2)}</Td>
                            <Td>{state}</Td>
                            <Td>{purchaseMetod}</Td>
                            <Td>{date}</Td>
                            <Td>
                                {(b.statusId === 1) ?  
                                <button className={styles.comprar} onClick={() => handleDetailView(b.id,b.statusId)}>Comprar</button> :
                                <button className={styles.textoContinuarComprando} onClick={() => history.push(`/purchaseOrder/${id}`)}>Detalle</button>}
                                
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        
        </div>
    );
});
let totalOrders =0
let totalItemsByUser = 0
    if(orders){
        totalOrders = orders.length;
        // sumar la cantidad total que hay en todas las propiedades quantity de payment_book
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].books.length; j++) {
                totalItemsByUser = totalItemsByUser + orders[i].books[j].payment_book.quantity;
            }
        }   
    }


    function handleDetailView(id, statusId) {
     
        if(statusId === 1){
            history.push(`/carrito`);
        }else{
            history.push(`/purchaseOrdersDetail/${id}`);
        } 
        // 
        
    }
    
    return (
        <div >            
        <div className={styles.container}>
            <div className={styles.container1}>
                <div>
                    <TableContainer maxWidth='90%'>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Id</Th>
                                    <Th>Items</Th>
                                    <Th isNumeric >Importe/s</Th>
                                    <Th>Estado</Th>
                                    <Th>Metodo de pago</Th>
                                    <Th>Fecha</Th>
                                    <Th>Ir a</Th>
                                </Tr>
                            </Thead>
                        </Table>
                    </TableContainer>
        {itemToPrint}
                     
                </div>
            </div>
        
        </div>

        <div>
            <h2>Total de ordenes</h2>
            {/* <h3>{totalOrders}</h3> */}
        </div>
        <div>
            <h2>Total de Items</h2>
            <h3>{totalItemsByUser}</h3>
        </div>
                
    
  
  </div>
    );
}
