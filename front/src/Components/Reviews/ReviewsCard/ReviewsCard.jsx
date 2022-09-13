import React from "react";
import RatingNoEditable from "../RatingNoEditable.jsx";
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


function ReviewsCard({ reviews }) {
  return (
    <div>
      {reviews.length > 0 ? 
    <Flex flexWrap='wrap' w='100%' height='auto'>
      {reviews?.map((r) => {
        
        return (
          <Accordion p="0.5rem" allowMultiple >
            <AccordionItem >
              <div key={r.id}>
                <h2>
                  <AccordionButton _focus={{ outlineColor: '#01A86C' }}>
                    <Flex textAlign="left" w="8rem" >
                      {r.users &&
                        r.users.map((u) => {
                          return (
                            <div key={u.uid}>
                              <h3 className={styles.nombre}>{u.nameUser}</h3>
                            </div>
                          );
                        })}
                     </Flex> 

                     <Flex m="0.2rem"><h2>{<RatingNoEditable value={r.rating}/>} </h2>
                    </Flex>
                    <AccordionIcon color="#01A86C"/>
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4} fontFamily= "Quicksand">
                  <p className={styles.descrption}>{r.descrption}</p>
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>

        );
      })}
    </Flex> : <h2 className={styles.mensajeVacio}>Todavia no hay ningun comentario. ¡Cuentános tu experiencia! </h2> }  
      
    </div>
  );
}

export default ReviewsCard;
