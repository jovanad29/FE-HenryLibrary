import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

//COMPONENTES
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";

//ACCIONES
import {
  getAllBooks,
  getBooksByAuthor,
  getBooksByCategory,
  getBooksByCategoryAuthor,
} from "../../actions";

//REACT ICONS
import { FaFilter } from "react-icons/fa";

//COMPONENTES CHAKRA
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  HStack,
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
// import styles from "./Filters.module.css"

export default function Book() {
  const dispatch = useDispatch();

  //ELEMENTOS PARA ABRIR Y CERRAR LA VENTANA DE LOS FILTROS
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});

  //=================================================
  //Limpiar componentes hijos

  const [clearAuthors, setClearAuthors] = useState({
    clearKeyAuthors: 0,
  });
  const { clearKeyAuthors } = clearAuthors;

  const [clearCategories, setClearCategories] = useState({
    clearKeyCategories: 0,
  });
  const { clearKeyCategories } = clearCategories;

  //=================================================

  const authorsFilter = (value) => {
    setAuthor(value);
  };

  const categoriesFilter = (value) => {
    setCategory(value);
  };

  const handleClearFilter = (event) => {
    event.preventDefault();
    setAuthor({});
    setCategory({});
    setClearAuthors({ clearKeyAuthors: clearKeyAuthors + 1 });
    setClearCategories({ clearKeyCategories: clearKeyCategories + 1 });
    dispatch(getAllBooks());
  };

  const handleClickCategory = (event) => {
    event.preventDefault();
    setCategory({});
  };

  const handleClickAuthor = (event) => {
    event.preventDefault();
    setAuthor({});
  };

  useEffect(() => {
    if (category.id && author.id) {
      dispatch(getBooksByCategoryAuthor(category.id, author.id));
    } else if (category.id) {
      dispatch(getBooksByCategory(category.id));
    } else if (author.id) {
      dispatch(getBooksByAuthor(author.id));
    } else {
      dispatch(getAllBooks());
    }
  }, [dispatch, category, author]);

  return (
    <>
      {/* BONTON FILTROS */}
      <Button
        leftIcon={<FaFilter />}
        ref={btnRef}
        bgColor={"#01A86C"}
        onClick={onOpen}
        _focus={{ border: "2px solid #01A86C" }}
        _hover={{
          color: "#01A86C",
          background: "transparent",
          border: "2px solid #01A86C",
        }}
        fontFamily='Segoe UI'
      >
        Filtros
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* BOTON LIMPIEA FILTROS */}
          <Flex pt={"10%"} justifyContent={"center"}>
            <Button
              ref={btnRef}
              bgColor={"#01A86C"}
              onClick={handleClearFilter}
              _focus={{
                border: "2px solid #01A86C",
              }}
              _hover={{
                color: "#01A86C",
                background: "transparent",
                border: "2px solid #01A86C",
              }}
              fontFamily= 'Segoe UI'
            >
              Limpiar Filtros
            </Button>
          </Flex>

          <DrawerBody pt={"10%"}>
            <HStack
              fontFamily='Segoe UI'
              spacing={4}
              display={"flex"}
              flexDir={"column"}
            >
              {/* Labels por categoria */}
              <Flex flexDir={"column"} justifyContent={"center"} width={"100%"}>
                {category.id && (
                  <>
                    <TagLabel
                      textAlign={"center"}
                      onClick={handleClickCategory}
                      mb={"5%"}
                    >
                      Generos
                    </TagLabel>

                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                      <Tag
                        size={"sm"}
                        key={category.id}
                        borderRadius="full"
                        variant="solid"
                        bgColor="#01A86C"
                        cursor={"pointer"}
                        onClick={handleClickCategory}
                      >
                        <TagLabel
                          textAlign={"center"}
                          id={category.id}
                          onClick={handleClickCategory}
                        >
                          {category.name}
                        </TagLabel>
                      </Tag>
                    </Grid>
                  </>
                )}
              </Flex>

              {/* Labels por autor */}
              <Flex flexDir={"column"} justifyContent={"center"} width={"100%"}>
                {author.id && (
                  <>
                    <Divider
                      colorScheme={"green"}
                      variant={"solid"}
                      pt={"5%"}
                    />
                    <TagLabel textAlign={"center"} mb={"5%"}>
                      Autores
                    </TagLabel>

                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                      <Tag
                        size={"sm"}
                        key={author.id}
                        borderRadius="full"
                        variant="solid"
                        bgColor="#01A86C"
                        cursor={"pointer"}
                        onClick={handleClickAuthor}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <TagLabel
                          textAlign={"center"}
                          id={author.id}
                          onClick={handleClickAuthor}
                        >
                          {author.name}
                        </TagLabel>
                      </Tag>
                    </Grid>
                  </>
                )}
              </Flex>
            </HStack>
            <CategoryFilter
              categoriesFilter={categoriesFilter}
              author={author}
            />
            <AuthorFilter
              key={clearKeyAuthors}
              authorsFilter={authorsFilter}
              category={category}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
