import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import style from "./RowTable.module.css";

function RowTable({ book }) {
  const { id, image, title, description, authors, categories } = book;

  return (
    <Box className={style.content}>
      <Flex className={style.table}>
        <Box className={style.bookRow}>
          <Flex>
            <Image
              className={style.image}
              src={image}
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
                {title}
              </Text>
              <Text
                noOfLines={1}
                height="30%"
                paddingLeft="5%"
                paddingRight="8%"
              >
                {description}
              </Text>
            </VStack>
          </Flex>
        </Box>
        <Box className={style.author}>
          {authors.length > 0 && book.authors[0].name}
        </Box>
        <Box className={style.categories}>
          {categories.length > 0 && book.categories[0].name}
        </Box>
        <Box className={style.rating}>{book.rating}</Box>
        <Box className={style.price}>{book.price}</Box>
        <Box className={style.edit}>
          <NavLink
            to={{ pathname: `/user/admin/catalogue/${id}`, props: book }}
          >
            <Button colorScheme="green" size="xs">
              Editar
            </Button>
          </NavLink>
        </Box>
      </Flex>
    </Box>
  );
}
export default RowTable;
