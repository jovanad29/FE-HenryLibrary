import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllFavorites, setPage } from "../../actions/index.js";

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
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  HStack,
  Tag,
  TagLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { FaFilter } from "react-icons/fa";

export default function Home() {
  const dispatch = useDispatch();
  const { actualPage, allBooks, section, favorites } = useSelector(
    (state) => state
  );

  const location = useLocation();
  const search = location.state ? location.state.search : null;
  const itemsPorPagina = 12;
  const offset = actualPage * itemsPorPagina;
  const limit = offset + itemsPorPagina;
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    if (section === "home") {
      dispatch(getAllBooks());
      dispatch(setPage(0));
    } else if (section === "favoritos") {
      dispatch(getAllFavorites());
      // dispatch(setPage(0));
    }
  }, [dispatch, section, favorites]);

  // useEffect(() => {

  // }, [actualPage])

  // console.log(allBooks, actualPage);

  const currentBooks = allBooks.length > 0 && allBooks.slice(offset, limit);

  const authorsFilter = (value) => {
    setAuthors([...authors, value]);
  };
  const categoriesFilter = (value) => {
    setCategories([...categories, value]);
  };

  const handleClick = (event) => {
    const id = Number(event.target.id);
    setAuthors(authors.filter((author) => author.id !== id));
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
                  <DrawerCloseButton
                    bgColor={"#01A86C"}
                    _focus={{ border: "2px solid #01A86C" }}
                    _hover={{
                      color: "#01A86C",
                      background: "transparent",
                      border: "2px solid #01A86C",
                    }}
                  />
                  <DrawerHeader
                    fontFamily="Quicksand"
                    textAlign={"center"}
                    color={"#01A86C"}
                  >
                    Filtros
                  </DrawerHeader>

                  <DrawerBody pt={"30%"}>
                    <HStack fontFamily="Quicksand" spacing={4}>
                      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                        {authors.map((author) => (
                          <Tag
                            size={"sm"}
                            key={author.id}
                            borderRadius="full"
                            variant="solid"
                            bgColor="#01A86C"
                            cursor={"pointer"}
                          >
                            <TagLabel
                              textAlign={"center"}
                              id={author.id}
                              onClick={handleClick}
                            >
                              {author.name}
                            </TagLabel>
                          </Tag>
                        ))}
                      </Grid>
                    </HStack>
                    <CategoryFilter categoriesFilter={categoriesFilter} />
                    <AuthorFilter authorsFilter={authorsFilter} />
                  </DrawerBody>

                  {/* <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="blue">Save</Button>
                  </DrawerFooter> */}
                </DrawerContent>
              </Drawer>
            </>
            <Paginated
              totalItems={allBooks.length}
              itemsPorPagina={itemsPorPagina}
            />

            <Order />
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
