import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  uploadBook,
  getAllAuthors,
  getCategories,
  getAllPublishers,
} from "../../actions";
import validate from "./validate.js";

//Componentes Chakra
import {
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Stack,
  Flex,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
} from "@chakra-ui/react";

//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

export default function NewBookChakra() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allAuthors = useSelector((state) => state.authors);
  const allCategories = useSelector((state) => state.categories);
  const allPublishers = useSelector((state) => state.publishers);

  //ESTADO DEL FORMULARIO
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    publisherId: null,
    publishedDate: "",
    pageCount: 0,
    languages: "",
    currentStock: 0,
    categories: [],
    authors: [],
  });

  const [error, setError] = useState({}),
    languages = [
      { id: 1, name: "Español" },
      { id: 2, name: "Ingles" },
      { id: 3, name: "Portugues" },
    ];

  function handleInputsChange(event) {
    if (event.target.name === "authors") {
      if (!book.authors.includes(event.target.value)) {
        setBook({
          ...book,
          authors: [...book.authors, event.target.value],
        });
      }
    } else if (event.target.name === "categories") {
      if (!book.categories.includes(event.target.value)) {
        setBook({
          ...book,
          categories: [...book.categories, event.target.value],
        });
      }
    } else {
      setBook({
        ...book,
        [event.target.name]: event.target.value,
      });

      setError(
        validate({
          ...book,
          [event.target.name]: event.target.value,
        })
      );
    }
  }

  const handleChangePrice = (value) => {
    setBook({
      ...book,
      price: value,
    });

    setError(
      validate({
        ...book,
        price: value,
      })
    );
  };

  const handleChangePage = (value) => {
    setBook({
      ...book,
      pageCount: value,
    });

    setError(
      validate({
        ...book,
        pageCount: value,
      })
    );
  };

  const handleChangeStock = (value) => {
    setBook({
      ...book,
      currentStock: value,
    });

    setError(
      validate({
        ...book,
        currentStock: value,
      })
    );
  };

  const filterOptions = (event) => {
    event.target.title === "category" &&
      setBook({
        ...book,
        categories: book.categories.filter(
          (category) => category !== event.target.id
        ),
      });

    event.target.title === "author" &&
      setBook({
        ...book,
        authors: book.authors.filter((author) => author !== event.target.id),
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(uploadBook(book));

    setBook({
      title: "",
      description: "",
      price: 0,
      image: "",
      publisherId: null,
      publishedDate: "",
      pageCount: 0,
      languages: "",
      currentStock: 0,
      categories: [],
      authors: [],
    });

    alert("Libro creado Exitosamente!");
  };

  const handleBackSubmit = (e) => {
    e.preventDefault();
    history.push("/"); // ---> esta ruta debe volver al catalogo
  };

  function CompExample() {
    const { isOpen: isVisible, onClose } = useDisclosure({
      defaultIsOpen: true,
    });
    return (
      isVisible && (
        <Alert
          justifyContent="center"
          status="success"
          variant="subtle"
          onClick={onClose}
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Application submitted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thanks for submitting your application. Our team will get back to
              you soon.
            </AlertDescription>
          </Flex>
        </Alert>
      )
    );
  }

  const example = (event) => {
    event.preventDefault();
    console.log(event);
  };

  useEffect(() => {
    dispatch(getAllAuthors());
    dispatch(getCategories());
    dispatch(getAllPublishers());
  }, [dispatch]);

  return (
    <>
      <NavBar />

      <NavBar2 />

      {CompExample()}
      <Flex fontFamily="Quicksand" justify="center">
        <Stack spacing={4} w="30%">
          <FormControl isInvalid={error.title}>
            <FormLabel>Nombre del Libro</FormLabel>
            <Input
              value={book.title}
              name="title"
              onChange={handleInputsChange}
            />
            {error.title && <FormErrorMessage>{error.title}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={error.description}>
            <FormLabel>Descripcion</FormLabel>
            <Textarea
              value={book.description}
              name="description"
              onChange={handleInputsChange}
            />
            {error.description && (
              <FormErrorMessage>{error.description}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={error.price}>
            <FormLabel>Precio</FormLabel>
            <NumberInput
              min={1}
              max={20000}
              value={book.price}
              name="price"
              onChange={handleChangePrice}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {error.price && <FormErrorMessage>{error.price}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={error.image}>
            <FormLabel>Imagen</FormLabel>
            <Input
              value={book.image}
              name="image"
              placeholder="https://..."
              onChange={handleInputsChange}
            />
            {error.image && <FormErrorMessage>{error.image}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={error.publisherId}>
            <FormLabel>Editorial</FormLabel>
            <Select
              placeholder="Selecione una opcion"
              value={book.publisherId}
              name="publisherId"
              onChange={handleInputsChange}
            >
              {allPublishers.map((published) => {
                return (
                  <option key={published.id} value={published.id}>
                    {published.name}
                  </option>
                );
              })}
            </Select>
            {error.publisherId && (
              <FormErrorMessage>{error.publisherId}</FormErrorMessage>
            )}
          </FormControl>

          <FormLabel>Fecha de Publicacion</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={book.publishedDate}
            name="publishedDate"
            onChange={handleInputsChange}
          />

          <FormControl isInvalid={error.pageCount}>
            <FormLabel>Numero de Paginas</FormLabel>
            <NumberInput
              min={1}
              max={20000}
              value={book.pageCount}
              name="pageCount"
              onChange={handleChangePage}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {error.pageCount && (
              <FormErrorMessage>{error.pageCount}</FormErrorMessage>
            )}
          </FormControl>

          <FormLabel>Idioma</FormLabel>
          <Select
            value={book.languages}
            name="languages"
            placeholder="Seleccione una opcion"
            onChange={handleInputsChange}
          >
            {languages.map((language) => (
              <option key={language.id} value={language.name}>
                {language.name}
              </option>
            ))}
          </Select>

          <FormLabel>Stock</FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            max={20000}
            value={book.currentStock}
            // name="currentStock"
            onChange={handleChangeStock}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <FormLabel>Categoria</FormLabel>
          <Select
            value={book.categories}
            name="categories"
            onChange={handleInputsChange}
            placeholder="Selecione una opcion"
          >
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {book.categories.map((category) => (
            <FormLabel
              key={category}
              id={category}
              title="category"
              onClick={filterOptions}
              cursor="pointer"
            >
              {allCategories.filter((c) => c.id === Number(category))[0].name}
            </FormLabel>
          ))}

          <FormLabel>Autor</FormLabel>
          <Select
            value={book.authors}
            name="authors"
            onChange={handleInputsChange}
            placeholder="Selecione una opcion"
          >
            {allAuthors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
          {book.authors.map((author) => (
            <FormLabel
              key={author}
              id={author}
              title="author"
              onClick={filterOptions}
              cursor="pointer"
            >
              {allAuthors.filter((a) => a.id === Number(author))[0].name}
            </FormLabel>
          ))}

          <Flex justifyContent="space-around">
            <Button
              w="30%"
              backgroundColor="#01A86C"
              variant="solid"
              onClick={handleOnSubmit}
              disabled={
                JSON.stringify(error) === "{}" && book.title !== ""
                  ? false
                  : true
              }
            >
              Guardar
            </Button>

            <Button
              w="30%"
              backgroundColor="#01A86C"
              variant="solid"
              onClick={handleBackSubmit}
            >
              Cancelar
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
