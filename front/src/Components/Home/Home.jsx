import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBooks,
  getAllFavorites,
  setPage,
  getCategories,
  getBooksByCategory,
  getBooksByAuthor,
  getBooksByCategoryAuthor,
  setSection,
} from "../../actions/index.js";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";
import Book from "../Book/Book.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import Order from "../Sort/Order.jsx";
import Filters from "../Filters/Filters";

//CSS
import styles from "./Home.module.css";
import banner from "./banner.jpg";
import Loading from "../Loading/Loading.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { actualPage, allBooks, section, favorites } = useSelector(
    (state) => state
  );

  const itemsPorPagina = 12;
  const offset = actualPage * itemsPorPagina;
  const limit = offset + itemsPorPagina;

  useEffect(() => {
    if (category.id && author.id) {
      dispatch(getBooksByCategoryAuthor(category.id, author.id));
    } else if (category.id) {
      dispatch(getBooksByCategory(category.id));
    } else if (author.id) {
      dispatch(getBooksByAuthor(author.id));
    } else if (section === "filtros") {
      dispatch(setSection("home"));
    }
    // else {
    //   dispatch(getAllBooks());
    // }
  }, [dispatch, category, author]);

  useEffect(() => {
    if (section === "home") {
      dispatch(setPage(0));
      dispatch(getAllBooks());
    } else if (section === "favoritos") {
      dispatch(setPage(0));
      dispatch(getAllFavorites());
    } else if (section === "search") {

    }
  }, [dispatch, section, favorites]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const currentBooks = allBooks.length > 0 && allBooks.slice(offset, limit);

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
    setClearSort({ clearKeySort: clearKeySort + 1 });
    setClearCategories({ clearKeyCategories: clearKeyCategories + 1 });
    dispatch(setSection("home"));
  };

  const handleClickAuthor = (event) => {
    event.preventDefault();
    // const id = Number(event.target.id);
    // setAuthors(authors.filter((author) => author.id !== id));
    setAuthor({});
  };

  const handleClickCategory = (event) => {
    event.preventDefault();
    // const id = Number(event.target.id);
    // setAuthors(authors.filter((author) => author.id !== id));
    setCategory({});
  };

  const handleOpenFilters = () => {
    dispatch(setSection("Filtros"));
    onOpen();
  }

  return (
    <div className={styles.home}>
      <NavBar />
      <NavBar2 />

      {currentBooks.length > 0 ? (
        <>
          <div className={styles.banner}>
            <img src={banner} alt="banner" />
          </div>

          {/*Filtros - Paginado - Ordenamientos */}
          <div className={styles.paginado}>
            <>
              <Button
                leftIcon={<FaFilter />}
                ref={btnRef}
                bgColor={"#01A86C"}
                onClick={handleOpenFilters}
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
                      _focus={{
                        border: "2px solid #01A86C",
                      }}
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
                      <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        width={"100%"}
                      >
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
            <Filters />
            <Paginated
              totalItems={allBooks.length}
              itemsPorPagina={itemsPorPagina}
            />
            <Order />
          </div>

          <div className={styles.cuerpo}>
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
