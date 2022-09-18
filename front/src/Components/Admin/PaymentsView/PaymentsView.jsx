import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import style from "./PaymentsView.module.css";
import RowTable from "./RowTable/RowTable";

import Menu from "../Components/Menu";
import Title from "../Components/Title";
import NavBar from "../Components/NavBar";

const obj = `[{
    "id": 1,
    "transactionId": "1308347227",
    "paymentType": "account_money",
    "total": 328,
    "statusDetail": "accredited",
    "deliveryAddress": "dirección de envío",
    "createdAt": "2022-09-17T02:06:07.407Z",
    "updatedAt": "2022-09-17T02:06:07.474Z",
    "userId": "yJcjUSQTnzdUzkMBK1DeKXYsaVw1",
    "paymentMethodId": 2,
    "statusId": 4,
    "books": [
        {
            "id": 61,
            "title": "America's Great Comic-strip Artists",
            "description": "A treasury of outstanding graphics and rare and beautiful comic art, this book is also a history of the art form itself, as seen through the work of 16 of the finest cartoonists of the last century, including Al Capp, Charles M. Schulz, Walt Kelly and Chester Gould. Marschall's fascinating text portrays the life and times of these artists, demonstrating their influence on American art and society. 250 illustrations, many in full-color.",
            "price": 116.6,
            "image": "https://images-na.ssl-images-amazon.com/images/P/1556706464.01._PE99_SCLZZZZZZZ_.jpg",
            "publisherId": 36,
            "publishedDate": "1997",
            "pageCount": 295,
            "language": "en",
            "industryIdentifiers": null,
            "rating": 3.76,
            "soldCopies": 36,
            "currentStock": 31,
            "isActive": true,
            "createdAt": "2022-09-17T01:40:36.650Z",
            "updatedAt": "2022-09-17T02:06:07.796Z",
            "bookId": 36,
            "payment_mp_book": {
                "quantity": 1,
                "price": 116.6,
                "createdAt": "2022-09-17T02:06:07.445Z",
                "updatedAt": "2022-09-17T02:06:07.466Z",
                "paymentMpId": 1,
                "bookId": 61
            }
        },
        {
            "id": 60,
            "title": "Animales Fantásticos Y Dónde Encontrarlos / Fantastic Beasts and Where to Find Them",
            "description": "Explora las maraviillas del mundo maagico con este suntuoso compendio de animales fantaasticos, una obra del caelebre magizoaologo Newt Scamander.",
            "price": 211.4,
            "image": "https://images-na.ssl-images-amazon.com/images/P/8498388236.01._PE99_SCLZZZZZZZ_.jpg",
            "publisherId": 1,
            "publishedDate": "2017-11-07",
            "pageCount": 133,
            "language": "es",
            "industryIdentifiers": null,
            "rating": 0,
            "soldCopies": 64,
            "currentStock": 85,
            "isActive": true,
            "createdAt": "2022-09-17T01:40:36.638Z",
            "updatedAt": "2022-09-17T02:06:07.798Z",
            "bookId": 1,
            "payment_mp_book": {
                "quantity": 1,
                "price": 211.4,
                "createdAt": "2022-09-17T02:06:07.455Z",
                "updatedAt": "2022-09-17T02:06:07.472Z",
                "paymentMpId": 1,
                "bookId": 60
            }
        }
    ],
    "user": {
        "uid": "yJcjUSQTnzdUzkMBK1DeKXYsaVw1",
        "nameUser": "TESTQJD3DXYO",
        "email": "test_user_15178702@testuser.com",
        "isActive": true,
        "profilePic": null,
        "isAdmin": false,
        "address": null,
        "isBanned": false,
        "createdAt": "2022-09-17T01:57:43.047Z",
        "updatedAt": "2022-09-17T01:57:43.047Z"
    },
    "payment_status": {
        "id": 4,
        "description": "APROBADO"
    },
    "payment_method": {
        "id": 2,
        "descrption": "ACCOUNT_MONEY",
        "createdAt": "2022-09-17T01:40:37.074Z",
        "updatedAt": "2022-09-17T01:40:37.074Z"
    }
}, 
{
    "id": 1,
    "transactionId": "1308347227",
    "paymentType": "account_money",
    "total": 328,
    "statusDetail": "accredited",
    "deliveryAddress": "dirección de envío",
    "createdAt": "2022-09-17T02:06:07.407Z",
    "updatedAt": "2022-09-17T02:06:07.474Z",
    "userId": "yJcjUSQTnzdUzkMBK1DeKXYsaVw1",
    "paymentMethodId": 2,
    "statusId": 4,
    "books": [
        {
            "id": 61,
            "title": "America's Great Comic-strip Artists",
            "description": "A treasury of outstanding graphics and rare and beautiful comic art, this book is also a history of the art form itself, as seen through the work of 16 of the finest cartoonists of the last century, including Al Capp, Charles M. Schulz, Walt Kelly and Chester Gould. Marschall's fascinating text portrays the life and times of these artists, demonstrating their influence on American art and society. 250 illustrations, many in full-color.",
            "price": 116.6,
            "image": "https://images-na.ssl-images-amazon.com/images/P/1556706464.01._PE99_SCLZZZZZZZ_.jpg",
            "publisherId": 36,
            "publishedDate": "1997",
            "pageCount": 295,
            "language": "en",
            "industryIdentifiers": null,
            "rating": 3.76,
            "soldCopies": 36,
            "currentStock": 31,
            "isActive": true,
            "createdAt": "2022-09-17T01:40:36.650Z",
            "updatedAt": "2022-09-17T02:06:07.796Z",
            "bookId": 36,
            "payment_mp_book": {
                "quantity": 1,
                "price": 116.6,
                "createdAt": "2022-09-17T02:06:07.445Z",
                "updatedAt": "2022-09-17T02:06:07.466Z",
                "paymentMpId": 1,
                "bookId": 61
            }
        },
        {
            "id": 60,
            "title": "Animales Fantásticos Y Dónde Encontrarlos / Fantastic Beasts and Where to Find Them",
            "description": "Explora las maraviillas del mundo maagico con este suntuoso compendio de animales fantaasticos, una obra del caelebre magizoaologo Newt Scamander.",
            "price": 211.4,
            "image": "https://images-na.ssl-images-amazon.com/images/P/8498388236.01._PE99_SCLZZZZZZZ_.jpg",
            "publisherId": 1,
            "publishedDate": "2017-11-07",
            "pageCount": 133,
            "language": "es",
            "industryIdentifiers": null,
            "rating": 0,
            "soldCopies": 64,
            "currentStock": 85,
            "isActive": true,
            "createdAt": "2022-09-17T01:40:36.638Z",
            "updatedAt": "2022-09-17T02:06:07.798Z",
            "bookId": 1,
            "payment_mp_book": {
                "quantity": 1,
                "price": 211.4,
                "createdAt": "2022-09-17T02:06:07.455Z",
                "updatedAt": "2022-09-17T02:06:07.472Z",
                "paymentMpId": 1,
                "bookId": 60
            }
        }
    ],
    "user": {
        "uid": "yJcjUSQTnzdUzkMBK1DeKXYsaVw1",
        "nameUser": "TESTQJD3DXYO",
        "email": "test_user_15178702@testuser.com",
        "isActive": true,
        "profilePic": null,
        "isAdmin": false,
        "address": null,
        "isBanned": false,
        "createdAt": "2022-09-17T01:57:43.047Z",
        "updatedAt": "2022-09-17T01:57:43.047Z"
    },
    "payment_status": {
        "id": 4,
        "description": "APROBADO"
    },
    "payment_method": {
        "id": 2,
        "descrption": "ACCOUNT_MONEY",
        "createdAt": "2022-09-17T01:40:37.074Z",
        "updatedAt": "2022-09-17T01:40:37.074Z"
    }
}]`;

const allPayments = JSON.parse(obj);

function PaymentsView() {
  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />

      <Box className={style.content}>
        {/* CABECERA */}
        <Flex className={style.table}>
          <Box className={style.numOrder}>Numero de Orden</Box>
          <Box className={style.items}>Items</Box>
          <Box className={style.amount}>Importe/s</Box>
          <Box className={style.status}>Estado</Box>
          <Box className={style.paymentMethod}>Metodo de Pago</Box>
          <Box className={style.date}>Fecha</Box>
        </Flex>

        {/* INFORMACION */}
        {allPayments.map((payment) => (
          <RowTable key={payment.id} allPayments={payment} />
        ))}
      </Box>
    </Box>
  );
}

export default PaymentsView;
