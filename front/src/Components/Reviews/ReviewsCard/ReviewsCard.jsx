import React from "react";
import RatingNoEditable from "../Rating/RatingNoEditable.jsx";

//CSS
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from "@chakra-ui/react";

import styles from "./ReviewsCard.module.css"
import { useTranslation } from "react-i18next";


function ReviewsCard({ reviews }) {
  const { t } = useTranslation()
  return (
    <div>
      {reviews.length > 0 ? 
    <Flex flexWrap='wrap' w='100%' height='auto'>
      {reviews?.map((r) => {
        
        return (
          <Accordion p="0.5rem" allowMultiple key={r.id}>
            <AccordionItem className={styles.contenedor} >
              <div>
                <h2>
                  <AccordionButton _focus={{ outlineColor: '#01A86C' }}>
                    <Flex textAlign="left" w="8rem" fontFamily='Segoe UI'>
                      {r.users &&
                        r.users.map((u) => {
                          return (
                            <div key={u.uid}>
                              <h3 className={styles.nombre}>{u.nameUser}</h3>
                            </div>
                          );
                        })}
                     </Flex> 


                    <AccordionIcon color="#01A86C"/>
                  </AccordionButton>
                  <Flex m="0.2rem"><h2>{<RatingNoEditable value={r.rating}/>} </h2>
                    </Flex>
                </h2>

                <AccordionPanel pb={4} fontFamily='Segoe UI'>
                  <p className={styles.descrption}>{r.descrption}</p>
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>

        );
      })}
    </Flex> : <h2 className={styles.mensajeVacio}>{t("sinReviews")}</h2> }  
      
    </div>
  );
}

export default ReviewsCard;
