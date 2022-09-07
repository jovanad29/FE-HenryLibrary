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
import { FormLabel, Input, Button, Box } from "@chakra-ui/react";

export default function SearchBar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const copyAllBooks = useSelector((state) => state.copyAllBooks);
    const [title, setTitle] = useState("");
    const [hidden, setHidden] = useState(false);

    const handleChange = (event) => {
        setTitle(event.target.value.trim());
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
                <Box fontFamily="Quicksand" position="relative">
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
                </Box>
            </form>
        </>
    );
}
