import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";





function ReviewsCard({ reviews }) {
  return (
    <div>

      {reviews?.map((r) => {
        return (
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <div key={r.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {r.users &&
                        r.users.map((u) => {
                          return (
                            <div key={u.uid}>
                              <h3>{u.nameUser}</h3>
                            </div>
                          );
                        })}
                      <h2>{r.rating}</h2>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  <p>{r.descrption}</p>
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>
        );
      })}
      
    </div>
  );
}

export default ReviewsCard;
