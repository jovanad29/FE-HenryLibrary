import React, { useState, useEffect,  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCartDB} from "../../actions/index.js";

import NavBar from "../NavBar/NavBar.jsx";


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
            
        }
    }, [isAuthenticated, dispatch, uid]);

    useEffect(() => {
        if (isAuthenticated) {
            setOrders(allCartByUser);
            // dispatch(getCantItemsByCart(uid))        
  }}, [allCartByUser]);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         let totalItems = orders.length;
    //         setTotalOrders(totalItems);
    //         setTotalItemsByUser(cantItemsByCart)
    //     }
    // }, [cantItemsByCart]);

   const itemToPrint = orders?.map((b) => {
    let id, items, mont, state, purchaseMetod, date;
    id = b.id;
    //sumar la cantidad total que hay en todas las propiedades quantity de payment_book
    items = 0
    for (let i = 0; i <b.books.length; i++) {    
            items = items + b.books[i].payment_book.quantity; 
    }
    
    
    mont = parseFloat(b.totalAmount).toFixed(2);
    state = (b.statusId === 1) ? "Pendiente" : "Completado";
    purchaseMetod = (!b.paymentMethodId?.length) ? "-" : b.paymentMethodId;
    date = b.books[0].payment_book.createdAt.slice(0,10);
    return (
        <div key={id}> 
                   Id  {id}
                   Items {items}
                   Importe/s {mont}
                   Estado {state}
                   Método de Pago {purchaseMetod}
                   Fecha {date}
                   <button onClick={() => handleDetailView(b.id,b.statusId)}>
                        Ver Detalle
                    </button>
                </div>
    );
});
    let totalOrders = orders.length;
    let totalItemsByUser = 0;
    // sumar la cantidad total que hay en todas las propiedades quantity de payment_book
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].books.length; j++) {
            totalItemsByUser = totalItemsByUser + orders[i].books[j].payment_book.quantity;
        }
    }   

    // let item = [];
    // let cantItems = allCartByUser.length;
    function handleDetailView(id, statusId) {
        if(statusId === 1){
            history.push(`/carrito`);
        }else{} 
        // 

    }

  return (
    <div>PurchaseOrders
        <NavBar />
            <h2> Estado </h2>
        <div>

       
                 {itemToPrint}
                
        
        </div>

        <div>
            <h2>Total de ordenes</h2>
            <h3>{totalOrders}</h3>
        </div>
        <div>
            <h2>Total de Items</h2>
            <h3>{totalItemsByUser}</h3>
        </div>
                
    
  
  </div>
    );
}
