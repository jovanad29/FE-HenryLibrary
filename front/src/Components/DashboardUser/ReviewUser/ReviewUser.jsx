import React, { useEffect } from "react";
import { getAllReviewByUser } from "../../../actions/dashboardActions.js";
import { useSelector, useDispatch } from "react-redux";
import RatingNoEditable from '../../Reviews/Rating/RatingNoEditable.jsx';

//CSS
import {
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styles from "./ReviewUser.module.css"
import { t } from "i18next";





function ReviewUser() {
  const dispatch = useDispatch();
  const { uid, reviewsUser, displayName } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllReviewByUser(uid));
  }, [dispatch, uid]);

 
  return (
    <div className={styles.TableContainer}>
    <TableContainer>
        <Table variant="simple" >
          <TableCaption className={styles.comentarios}>{t("tablaComentarios")}</TableCaption>
          <Thead>
            <Tr>
              <Th className={styles.titulo}>{t("titulo")}</Th>
              <Th className={styles.titulo}>{t("descripcion")}</Th>
              <Th className={styles.titulo}>{t("calificacion")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              reviewsUser?.map((r) => {
                return (
                  <Tr key={r.id} className={styles.item}>
                    <Td>{r.books?.map((b) => b.title)}</Td>
                    <Td>{r.descrption}</Td>
                    {/* <Td>{r.rating}</Td> */}
                    <Td>{<RatingNoEditable value={r.rating}/>}</Td>
                  </Tr>
                )
              })
              }
            
        
          </Tbody>
        </Table>
    </TableContainer>
    </div>
  );
}

export default ReviewUser;
