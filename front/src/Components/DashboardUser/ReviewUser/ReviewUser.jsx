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






function ReviewUser() {
  const dispatch = useDispatch();
  const { uid, reviewsUser, displayName } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllReviewByUser(uid));
  }, [dispatch, uid]);




  
  return (
    <TableContainer>
        <Table variant="simple">
          <TableCaption>Tabla de comentarios de {displayName}</TableCaption>
          <Thead>
            <Tr>
              <Th>Titulo del libro</Th>
              <Th>Descripcion</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              reviewsUser?.map((r) => {
                return (
                  <Tr key={r.id}>
                    <Td>{r.books?.map((b) => b.title)}</Td>
                    <Td>{r.descrption}</Td>
                    <Td>{r.rating}</Td>
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
