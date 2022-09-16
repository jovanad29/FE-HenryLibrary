import React, { useEffect } from "react";
import { getAllReviewByUser } from "../../../actions/dashboardActions.js";
import { useSelector, useDispatch } from "react-redux";

//CSS
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styles from "./ReviewUser.module.css"





function ReviewUser() {
  const dispatch = useDispatch();
  const { uid, reviewsUser, displayName } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllReviewByUser(uid));
  }, [dispatch, uid]);




  
  return (
    <TableContainer className={styles.TableContainer}>
        <Table variant="simple" >
          <TableCaption className={styles.comentarios}>Tabla de comentarios de {displayName}</TableCaption>
          <Thead>
            <Tr>
              <Th className={styles.titulo}>Titulo del libro</Th>
              <Th className={styles.titulo}>Descripcion</Th>
              <Th className={styles.titulo}>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              reviewsUser?.map((r) => {
                return (
                  <Tr key={r.id}>
                    <Td className={styles.info}>{r.books?.map((b) => b.title)}</Td>
                    <Td className={styles.info}>{r.descrption}</Td>
                    <Td className={styles.info}>{r.rating}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
    </TableContainer>
  );
}

export default ReviewUser;
