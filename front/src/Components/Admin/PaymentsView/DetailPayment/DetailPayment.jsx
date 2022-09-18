import React from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import style from "./DetailPayment.module.css";
import Menu from "../../Components/Menu";
import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";

const obj = `{
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
}`;

const detailPayment = JSON.parse(obj);

function DetailPayment() {
  // const detailPayment = useSelector((state) => state.detailPayment);
  const { id, books, total, statusId, paymentMethodId, createdAt } =
    detailPayment;
  return (
    <Box fontFamily="Quicksand">
      <Menu />
      <NavBar />
      <Title />

      {/* PAYMENTS DEATAIL */}
      <Box className={style.content}>
        {/* CABECERA */}
        <Box>
          <Flex className={style.table}>
            <Box className={style.numOrder}>Numero de Orden</Box>
            <Box className={style.amount}>Importe/s</Box>
            <Box className={style.status}>Estado</Box>
            <Box className={style.paymentMethod}>Metodo de Pago</Box>
            <Box className={style.date}>Fecha</Box>
            <Box className={style.edit}></Box>
          </Flex>
        </Box>

        {/* DETALLES */}
        <Box className={style.contentRow}>
          <Flex className={style.tableRow}>
            <Box className={style.numOrderRow}>{id}</Box>
            <Box className={style.amountRow}>{total}</Box>
            <Box className={style.statusRow}>
              <Select variant="flushed" width="70%" placeholder={statusId} />
            </Box>
            <Box className={style.paymentMethodRow}>{paymentMethodId}</Box>
            <Box className={style.dateRow}>{createdAt}</Box>
            <Box className={style.editRow}>
              <Button colorScheme="green" size="xs">
                Guardar
              </Button>
              <Button colorScheme="green" size="xs">
                Cancelar
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* LIBROS */}

      {/* TITULO */}
      <Box pl="10.8%" pt="5%" textAlign="center">
        <Heading
          fontFamily="Quicksand"
          as="h2"
          size="md"
          ml="8%"
          fontSize="3xl"
          color="#01A86C"
        >
          Detalles de la Orden
        </Heading>
      </Box>

      <Box className={style.content}>
        {/* CABECERA */}
        <Box>
          <Flex className={style.table}>
            <Box className={style.book}>Libro</Box>
            <Box className={style.price}>Precio</Box>
            <Box className={style.quantity}>Catidad</Box>
            <Box className={style.total}>Total</Box>
          </Flex>
        </Box>

        {/* CONTENIDO */}
        {books.map((book) => (
          <Box key={book.id} className={style.contentBook}>
            <Flex className={style.table}>
              <Box className={style.bookRow}>
                <Flex>
                  <Image
                    className={style.image}
                    src={book.image}
                    boxSize="90px"
                    flex={1}
                  />
                  <VStack flex={11} className={style.bookRow}>
                    <Text
                      noOfLines={1}
                      height="30%"
                      paddingLeft="5%"
                      paddingRight="8%"
                      fontWeight="bold"
                    >
                      {book.title}
                    </Text>
                    <Text
                      noOfLines={1}
                      height="30%"
                      paddingLeft="5%"
                      paddingRight="8%"
                    >
                      {book.description}
                    </Text>
                  </VStack>
                </Flex>
              </Box>
              <Box className={style.price}>{book.price}</Box>
              <Box className={style.price}>{book.payment_mp_book.quantity}</Box>
              <Box className={style.price}>{book.payment_mp_book.price}</Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
export default DetailPayment;
