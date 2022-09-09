import React from "react";

//CSS
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from "@chakra-ui/react";




function ReviewsCard({ reviews }) {
  return (
    <div>
        
    <Flex flexWrap='wrap' w='100%' height='auto'>
      {reviews?.map((r) => {
        return (
          <Accordion p="0.5rem" defaultIndex={[0]} allowMultiple>
            <AccordionItem >
              <div key={r.id}>
                <h2>
                  <AccordionButton _focus={{ outlineColor: '#01A86C' }}>
                    <Flex textAlign="left" w="8rem" fontWeight="bolder" font-family= "Quicksand" >
                      {r.users &&
                        r.users.map((u) => {
                          return (
                            <div key={u.uid}>
                              <h3>{u.nameUser}</h3>
                            </div>
                          );
                        })}
                     </Flex> 

                      <Flex m="0.2rem"> <h2>{r.rating} aca van estrellitas</h2>
                    </Flex>
                    <AccordionIcon color="#01A86C"/>
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4} font-family= "Quicksand">
                  <p>{r.descrption}</p>
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>

        );
      })}
    </Flex>
      
    </div>
  );
}

export default ReviewsCard;
