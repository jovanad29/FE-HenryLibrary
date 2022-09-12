import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameBooks, setPage, setSection } from "../../actions";
import { useHistory } from "react-router-dom";

//REACT ICONS
// import { RiSearch2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

//CSS
// import styles from "./SearchBar.module.css";

//Componentes Chakra
import {
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  chakra,
  Center,
} from "@chakra-ui/react";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const copyAllBooks = useSelector((state) => state.copyAllBooks);
  const [title, setTitle] = useState("");
  const [hidden, setHidden] = useState(false);
  const [result, setResult] = useState([]);

  const clearTitle = () => setTitle("");

  const handleChange = (event) => {
    const query = event.target.value;
    setTitle(query);
    setResult(
      copyAllBooks.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    );
    setHidden(false);
  };

  const handledSubmit = (event) => {
    event.preventDefault();
    dispatch(setSection("search"));
    dispatch(setPage(0));
    dispatch(getNameBooks(title));
    setTitle("");
    setHidden(true);
    history.push("/home");
  };

  return (
    <>
      <form onSubmit={handledSubmit}>
        {/* <Box fontFamily="Quicksand" position="relative">
                    <Box display="flex">
                        <Input
                            value={title}
                            onChange={handleChange}
                            width="90%"
                            focusBorderColor="#01A86C"
                            placeholder="Busca un Libro..."
                        />
                        <Box
                            zIndex={50}
                            borderRadius={5}
                            border="3px #F1F1F1"
                            bgColor="#F1F1F1"
                            width="34%"
                            pos="absolute"
                            top={10}
                        >
                            {!title || hidden
                                ? null
                                : copyAllBooks
                                      .filter((book) =>
                                          book.title
                                              .toLowerCase()
                                              .includes(title.toLowerCase())
                                      )
                                      .slice(0, 5)
                                      .map((book) => (
                                          <FormLabel
                                              key={book.id}
                                              onClick={handledSubmit}
                                              value={book.title}
                                              cursor="pointer"
                                              _hover={{
                                                  fontWeight: "semibold",
                                                  backgroundColor: "#01A86C",
                                              }}
                                              textAlign="center"
                                              width={"100%"}
                                          >
                                              {book.title}
                                          </FormLabel>
                                      ))}
                        </Box>
                        <Button title="Search" type="submit" bgColor="#01A86C">
                            <FiSearch size="2rem" />
                        </Button>
                    </Box>
                </Box> */}

        <Box
          fontFamily="Quicksand"
          position="absolute"
          zIndex={50}
          bottom={-6}
          top={-10}
          width="100%"
        >
          <Box
            sx={{
              rounded: "lg",
              overflow: "hidden",
              bg: "transparent",
              shadow: "lg",
              maxW: "600px",
              width: "100%",
              mt: "1rem",
              mx: "auto",
            }}
          >
            <Flex pos="relative" align="strech">
              <chakra.input
                type=""
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                maxLength={64}
                sx={{
                  w: "100%",
                  h: "48px",
                  pl: "68px",
                  fontWeight: "medium",
                  outline: 0,
                }}
                placeholder="Buscar Libro"
                value={title}
                onChange={handleChange}
              />

              <Center pos="absolute" left={7} bottom={-2} h="68px">
                <FiSearch color="teal.500" boxSize="20px" />
              </Center>
            </Flex>

            {title && (
              <Box maxH="70vh" p="0" overflowY="auto" bgColor="white">
                <Box px={4}>
                  <Box borderTopWidth="1px" pt={2} pb={4}>
                    <SearchResults
                      searchResults={result}
                      clearTitle={clearTitle}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </form>

      <Box pos={"absolute"} right={-14} top={-10}>
        <Button
          title="Search"
          onClick={handledSubmit}
          bgColor="#01A86C"
          pos="relative"
          bottom={-5}
          right={-2}
        >
          <FiSearch size="2rem" />
        </Button>
      </Box>
    </>
  );
}
