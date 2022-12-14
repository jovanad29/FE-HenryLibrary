import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartDB } from "../../../actions/index";
import PurchaseOrdersDetail from "./PurchaseOrdersDetail.jsx";

//CSS
import styles from "../../ShoppingBook/ShoppingBook.module.css";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
// import { getAllOrders } from "../../../actions/dashboardActions";

export default function PurchaseOrders() {
    const dispatch = useDispatch();
    //definir un estados local para guardar todas las ordenes de un cliente
    const [orders, setOrders] = useState([]);
    const { t } = useTranslation()

    const { status, uid, allCartByUser } = useSelector( // allOrders
        (state) => state
    );

    //traer del estado allCartByUser

    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    //llamar a la action getAllCartDB con el uid del usuario logueado
    useEffect(() => {
        if (isAuthenticated) {
           dispatch(getAllCartDB(uid));
            // setOrders(allCartByUser);
            // dispatch(getAllOrders())
            
        }
    }, [isAuthenticated, dispatch, uid]);

    useEffect(() => {  
        setOrders(allCartByUser);    
  }, [allCartByUser, dispatch]);

   const itemToPrint = orders?.map((b) => {
    let id, items, totalAmount, state, purchaseMetod, date;
    //la siguiente linea no funciona por eso la deshabilito, el que la arregle que la active
    // let transactionId, paymentType, statusDetal, deliveryAddress  //ESTO DEBERIA AGREGARSE AL DETALLE DEL PAGO 
    id = b.id;
    //sumar la cantidad total que hay en todas las propiedades quantity de payment_book
    items = 0
    for (let i = 0; i <b.books.length; i++) {    
        items = items + b.books[i].payment_book.quantity; 
    }    
    // convertir totalAmount a formato internacional de moneda
    totalAmount = (b.totalAmount);
    state = (b.payment_status.description);
    purchaseMetod = b.payment_method !== null ? b.payment_method.descrption : "-"
    date = b.books[0]?.payment_book.createdAt;

        //darle formato de fecha y hora a date
        date = new Date(date).toLocaleString("es-ES");

        return (
            <div key={id}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton className={styles.tableDetails} _focus={{ outlineColor: '#01A86C' }}>
                                <Box flex="1" textAlign="left">
                                    <TableContainer maxWidth="100%">
                                        <Table variant="simple">
                                            <Tbody>
                                                <Tr>
                                                    <Td
                                                        className={
                                                            styles.tableDetails
                                                        }
                                                    >
                                                        {id}
                                                    </Td>
                                                    <Td
                                                        className={
                                                            styles.tableDetails
                                                        }
                                                        isNumeric
                                                    >
                                                        {items}
                                                    </Td>
                                                    <Td
                                                        className={
                                                            styles.tableDetails
                                                        }
                                                        isNumeric
                                                    >
                                                        $
                                                        {parseFloat(
                                                            totalAmount
                                                        ).toFixed(2)}
                                                    </Td>
                                                    <Td
                                                        className={
                                                            styles.tableDetails
                                                        }
                                                    >
                                                        {state}
                                                    </Td>
                                                    <Td
                                                        className={
                                                            styles.tableDetails
                                                        }
                                                    >
                                                        {purchaseMetod}
                                                    </Td>
                                                    <Td
                                                        className={
                                                            styles.tableDetails
                                                        }
                                                    >
                                                        {date}
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <PurchaseOrdersDetail id={id} />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    });
    let totalOrders = 0;
    let totalItemsByUser = 0;
    if (orders) {
        totalOrders = orders.length;
        // sumar la cantidad total que hay en todas las propiedades quantity de payment_book
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].books.length; j++) {
                totalItemsByUser =
                    totalItemsByUser + orders[i].books[j].payment_book.quantity;
            }
        }
    }

    return (
        <div>
            <div className={styles.container3}>
                <div className={styles.container1}>
                    <div>
                        <TableContainer maxWidth="90%">
                            <Table variant="simple">
                                <Thead>
                                    <Tr className={styles.tableTittles}>
                                        <Th className={styles.tableTittles}>
                                            Id
                                        </Th>
                                        <Th className={styles.tableTittles}>
                                            Item
                                        </Th>
                                        <Th
                                            className={styles.tableTittles}
                                            isNumeric
                                        >
                                            {t("importe")}
                                        </Th>
                                        <Th className={styles.tableTittles}>
                                            {t("status")}
                                        </Th>
                                        <Th className={styles.tableTittles}>
                                            {t("metodoPago")}
                                        </Th>
                                        <Th className={styles.tableTittles}>
                                            {t("fecha")}
                                        </Th>
                                    </Tr>
                                </Thead>
                            </Table>
                        </TableContainer>
                        {itemToPrint}
                    </div>
                </div>
            </div>

            <div className={styles.container2}>
                <TableContainer maxWidth="100%">
                    <Table variant="striped" size="lg">
                        <Thead>
                            <Tr>
                                <Th>{t("nOrdenes")}: {totalOrders}</Th>
                                <Th isNumeric>
                                    {t("nItems")}: {totalItemsByUser}
                                </Th>
                            </Tr>
                        </Thead>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
