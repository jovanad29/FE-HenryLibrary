import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getBooksByCategory,
  setPage,
  setSection,
} from "../../actions";
import { List, ListItem, Heading, Link, Collapse } from "@chakra-ui/react";

export default function CategoryFilter({ categoriesFilter, author }) {
  const dispatch = useDispatch(),
    [show, setShow] = useState(false),
    allCategories = useSelector((state) => state.categories),
    copyAllBooks = useSelector((state) => state.copyAllBooks),
    [categories, setCategories] = useState([...allCategories]);

  const handleToggle = () => setShow(!show);

  const handledClick = (event) => {
    event.preventDefault();
    // category = [...allCategories];
    // console.log(category);
    categoriesFilter({
      id: Number(event.target.id),
      name: event.target.innerText,
    });

    dispatch(setPage(0));

    dispatch(setSection("filtros"));

    dispatch(getBooksByCategory(event.target.id));

    const filterCategories = copyAllBooks.filter((book) => {
      if (book.categories.length) {
        return book.categories.filter(
          (category) => category.id === Number(event.target.id)
        ).length;
      }
      return false;
    });

    if (author.length) {
      const resultCategoriesAuthor = filterCategories.filter((book) => {
        if (book.authors.length) {
          return book.authors.filter((a) => a.id === author.id).length;
        }
        return false;
      });

      const resultCategories = [];
      resultCategoriesAuthor.forEach((book) => {
        for (let index = 0; index < book.categories.length; index++) {
          resultCategories.push(book.categories[index]);
        }
      });

      let obj = resultCategories.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.id === value.id && t.name === value.name)
      );

      setCategories(obj);
    } else {
      setCategories(allCategories);
    }
  };

  useEffect(() => {
    //Obtener la informacion una vez cargue la pagina y traiaga la informacion necesaria.
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (author.length) {
      const filterCategories = copyAllBooks.filter((book) => {
        if (book.authors.length) {
          return book.authors.filter((a) => a.id === Number(author[0].id))
            .length;
        }
        return false;
      });

      const resultCategories = [];
      filterCategories.forEach((book) => {
        for (let index = 0; index < book.categories.length; index++) {
          resultCategories.push(book.categories[index]);
        }
      });

      let obj = resultCategories.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.id === value.id && t.name === value.name)
      );

      setCategories(obj);
    } else {
      setCategories(allCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

  return (
    <>
      <Heading
        textAlign="center"
        fontSize={20}
        fontFamily="Quicksand"
        pt="10px"
        textColor="#01A86C"
        onClick={handledClick}
      >
        Genero
      </Heading>

      <Collapse startingHeight={150} in={show}>
        <List spacing={-1} pt="10px" pl="10px">
          {categories.map((category) => (
            <ListItem key={category.id}>
              <Link
                style={{ textDecoration: "none" }}
                fontFamily="Quicksand"
                fontSize={12}
                textTransform="capitalize"
                onClick={handledClick}
                _hover={{ fontWeight: "semibold" }}
                id={category.id}
              >
                {category.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Link
        fontFamily="Quicksand"
        color="#01A86C"
        padding={2}
        onClick={handleToggle}
      >
        Ver {show ? "Menos" : "Mas.."}
      </Link>
    </>
  );
}
