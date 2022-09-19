import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Input, Stack, List, ListItem } from "@chakra-ui/react";
import {
    getBooksByAuthor,
    getAuthorByName,
    // getAllBooks,
    emptyAuthors,
    setPage,
    getAllAuthors,
    setSection,
} from "../../actions";

export default function AuthorFilter({ authorsFilter, category }) {
    const dispatch = useDispatch(),
        authors = useSelector((state) => state.authors),
        copyAllBooks = useSelector((state) => state.copyAllBooks),
        [author] = useState([]),
        [input, setInput] = useState(""),
        [tempAuthors, setTempAuthors] = useState([authors]);

    useEffect(() => {
        dispatch(emptyAuthors());
        author.name && dispatch(getAuthorByName(author.name));
        return () => {
            dispatch(emptyAuthors());
        };
    }, [dispatch, author.name]);

    useEffect(() => {
        dispatch(getAllAuthors());
    }, [dispatch]);

    const handleChange = (event) => {
        // setAuthor({ ...author, name: event.target.value });
        // // !event.target.value.length && dispatch(getAllBooks());
        const text = event.target.value;
        setInput(text);
        if (text) {
            const result = authors.filter((a) =>
                a.name.toLowerCase().includes(text.toLowerCase())
            );
            setTempAuthors(result);
        } else {
            setTempAuthors([]);
        }
    };

    const handledClick = (event) => {
        // setAuthor({
        //   id: Number(event.target.id),
        //   //   name: event.target.textContent,
        //   name: event.target.innerText,
        // });
        authorsFilter({
            id: Number(event.target.id),
            name: event.target.innerText,
        });
        setTempAuthors([]);
        setInput("");
        dispatch(setSection("filtros"));
        dispatch(setPage(0));
        dispatch(getBooksByAuthor(Number(event.target.id)));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setPage(0));
        dispatch(setSection("filtros"));
        dispatch(getBooksByAuthor(author.id));
    };

    useEffect(() => {
        if (category.length) {
            const filterAuthors = copyAllBooks.filter((book) => {
                if (book.categories.length) {
                    return book.categories.filter(
                        (a) => a.id === Number(category[0].id)
                    ).length;
                }
                return false;
            });

            const resultAuthors = [];
            filterAuthors.forEach((book) => {
                for (let index = 0; index < book.authors.length; index++) {
                    resultAuthors.push(book.authors[index]);
                }
            });

            let obj = resultAuthors.filter(
                (value, index, self) =>
                    index ===
                    self.findIndex(
                        (t) => t.id === value.id && t.name === value.name
                    )
            );
            console.log(obj);
            setTempAuthors(obj);
        }
        // } else {
        //   setTempAuthors(authors);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <>
            <Stack pt="10%" spacing={3}>
                <Heading
                    textAlign="center"
                    fontSize={20}
                    fontFamily="Quicksand"
                    textColor="#01A86C"
                >
                    Autor
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Nombre del Autor"
                        focusBorderColor="#01A86C"
                        //   color="#01A86C"
                        background="fff"
                        fontFamily="Quicksand"
                        _placeholder={{
                            color: "#a3a1a1",
                            fontFamily: "Quicksand",
                        }}
                        onChange={handleChange}
                        value={input}
                    />

                    <List spacing={1} backgroundColor="white" >
                        {tempAuthors.map((author) => (
                            <ListItem
                                key={author.id}
                                id={author.id}
                                value={author.name}
                                onClick={handledClick}
                                _hover={{ cursor: "pointer" }}
                                fontFamily="Quicksand"
                            >
                                {author.name}
                            </ListItem>
                        ))}
                    </List>
                </form>
            </Stack>
        </>
    );
}
