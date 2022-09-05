import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBooks,
  getAllFavorites,
  setPage,
  getCategories,
} from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";
import Book from "../Book/Book.jsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import Paginated from "../Paginated/Paginated.jsx";
import Order from "../Sort/Order.jsx";

//CSS
import styles from "./Home.module.css";
import banner from "./banner.jpg";
import Loading from "../Loading/Loading.jsx";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  HStack,
  Tag,
  TagLabel,
  Grid,
  Flex,
  Divider,
  TagCloseButton,
  Box,
  TagRightIcon,
} from "@chakra-ui/react";

import { FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function Home() {
  const dispatch = useDispatch();
  const { actualPage, allBooks, section, favorites } = useSelector(
    (state) => state
  );

  // const location = useLocation();
  // const search = location.state ? location.state.search : null;
  const itemsPorPagina = 12;
  const offset = actualPage * itemsPorPagina;
  const limit = offset + itemsPorPagina;

  //Labels con los filtros seleccionados
  const [author, setAuthor] = useState([]);
  const [category, setCategory] = useState([]);
  const [clear, setClear] = useState(false);

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

  const [clearSort, setClearSort] = useState({
    clearKeySort: 0,
  });

  const { clearKeySort } = clearSort;

  //=================================================

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    if (section === "home") {
      // dispatch(getAllBooks());
      dispatch(setPage(0));
    } else if (section === "favoritos") {
      dispatch(getAllFavorites());
      // dispatch(setPage(0));
    }
  }, [dispatch, section, favorites]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // useEffect(() => {

  // }, [actualPage])

  // console.log(allBooks, actualPage);

  const currentBooks = allBooks.length > 0 && allBooks.slice(offset, limit);

  const authorsFilter = (value) => {
    setAuthor([value]);
  };
  const categoriesFilter = (value) => {
    setCategory([value]);
  };

  const handleClearFilter = (event) => {
    event.preventDefault();
    setAuthor([]);
    setCategory([]);
    setClearAuthors({ clearKeyAuthors: clearKeyAuthors + 1 });
    setClearSort({ clearKeySort: clearKeySort + 1 });
    setClearCategories({ clearKeyCategories: clearKeyCategories + 1 });
    dispatch(getAllBooks());
  };

  const handleClickAuthor = (event) => {
    event.preventDefault();
    // const id = Number(event.target.id);
    // setAuthors(authors.filter((author) => author.id !== id));
    setAuthor([]);
  };

  const handleClickCategory = (event) => {
    event.preventDefault();
    // const id = Number(event.target.id);
    // setAuthors(authors.filter((author) => author.id !== id));
    setCategory([]);
  };

  return (
    <div className={styles.home}>
      <NavBar />
      <NavBar2 />

      {currentBooks.length > 0 ? (
        <>
          <div className={styles.banner}>
            <img src={banner} alt="banner" />
          </div>

          {/* ORDENAMIENTOS */}
          {/* <div>
            <Order />
          </div> */}

          <div className={styles.paginado}>
            <>
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
                fontFamily="Quicksand"
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
                  <Flex pt={"10%"} justifyContent={"center"}>
                    <Button
                      ref={btnRef}
                      bgColor={"#01A86C"}
                      onClick={handleClearFilter}
                      _focus={{ border: "2px solid #01A86C" }}
                      _hover={{
                        color: "#01A86C",
                        background: "transparent",
                        border: "2px solid #01A86C",
                      }}
                      fontFamily="Quicksand"
                    >
                      Limpiar Filtros
                    </Button>
                  </Flex>

                  <DrawerBody pt={"10%"}>
                    <HStack
                      fontFamily="Quicksand"
                      spacing={4}
                      display={"flex"}
                      flexDir={"column"}
                    >
                      {/* Labels por categoria */}
                      <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        width={"100%"}
                      >
                        {category.length !== 0 && (
                          <TagLabel
                            textAlign={"center"}
                            onClick={handleClickCategory}
                            mb={"5%"}
                          >
                            Generos
                          </TagLabel>
                        )}
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                          {category.map((category) => (
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
                          ))}
                        </Grid>
                      </Flex>

                      {/* Labels por autor */}
                      <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        width={"100%"}
                      >
                        {author.length !== 0 && (
                          <>
                            <Divider
                              colorScheme={"green"}
                              variant={"solid"}
                              pt={"5%"}
                            />
                            <TagLabel textAlign={"center"} mb={"5%"}>
                              Autores
                            </TagLabel>
                          </>
                        )}

                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                          {author.map((author) => (
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
                          ))}
                        </Grid>
                      </Flex>
                    </HStack>
                    <CategoryFilter
                      // key={clearKeyCategories}
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
            <Paginated
              totalItems={allBooks.length}
              itemsPorPagina={itemsPorPagina}
            />

            <Order key={clearKeySort} />
          </div>

          <div className={styles.cuerpo}>
            {/* <div className={styles.filtro}>
              <CategoryFilter />
              <AuthorFilter />
              
            </div> */}

            <div className={styles.cards}>
              {currentBooks &&
                currentBooks.map((b) => (
                  <Book
                    key={b.id}
                    id={b.id}
                    title={b.title}
                    authors={b.authors}
                    image={b.image}
                    price={b.price}
                    stock={b.currentStock}
                    allBooks={allBooks}
                  />
                ))}
            </div>
          </div>
        </>
      ) : allBooks.message ? (
        <div className={styles.ErrorSearch}>
          <h3 className={styles.errorH3}>{allBooks.message}</h3>
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </div>
  );
}
