//Componentes Chakra
import {
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  Flex,
  Select,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { CgCheck } from "react-icons/cg";
import { TbBookUpload } from "react-icons/tb";
import styles from "./EditBook.module.css";

//=======================================================================================
//FUNCIONES PARA NO REPETIR CODIGO

//INPUT SENCILLO CONTROLADO
export const elementInputValidate = (
  label,
  validate,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <FormControl isRequired isInvalid={validate} pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Input
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        />
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === ""
            ? null
            : !validate && <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>
      {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
    </FormControl>
  );
};

//TEXT AREA CONTROLADO
export const elementTestArea = (
  label,
  validate,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <FormControl isRequired isInvalid={validate} pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Textarea
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        />
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === ""
            ? null
            : !validate && <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>
      {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
    </FormControl>
  );
};

// INPUT DE TIPO NUMERO VALIDADO
export const elementNumberValidate = (
  label,
  validate,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <FormControl isRequired isInvalid={validate} pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Input
          value={value}
          name={name}
          type="number"
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        />
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === ""
            ? null
            : !validate && <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>
      {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
    </FormControl>
  );
};

//SELECT VALIDADO
export const elementSelectValidate = (
  label,
  validate,
  value,
  name,
  placeholder = null,
  handle,
  arr
) => {
  return (
    <FormControl isRequired isInvalid={validate} pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Select
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        >
          {arr.map((elemen) => {
            return (
              <option key={elemen.id} value={elemen.id}>
                {elemen.name}
              </option>
            );
          })}
        </Select>
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === null || value === "" || validate ? null : (
            <CgCheck size="30px" color="#01A86C" />
          )}
        </Box>
      </Box>
      {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
    </FormControl>
  );
};

//INPUT DE TIPO FECHA
export const elementInputDate = (type, label, value, name, handle) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Input
          type={type}
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          boxShadow="lg"
          rounded="lg"
          color={"#01A86C"}
        />
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === "" ? null : <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>
    </Box>
  );
};

//SELECT
export const elementSelect = (
  label,
  value,
  name,
  placeholder = null,
  handle,
  arr
) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Select
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        >
          {arr.map((elemen) => {
            return (
              <option key={elemen.id} value={elemen.value}>
                {elemen.name}
              </option>
            );
          })}
        </Select>
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === null || value === "" ? null : (
            <CgCheck size="30px" color="#01A86C" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

// INPUT DE TIPO NUMERO
export const elementNumber = (
  label,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Input
          value={value}
          name={name}
          type="number"
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        />
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === "" ? null : <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>
    </Box>
  );
};

//INPUT SENCILLO
export const elementInput = (
  label,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Input
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        />
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value === "" ? null : <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>
    </Box>
  );
};

//SELECT PARA AUTORES Y CATEGORIAS
export const elementSelectOthers = (
  label,
  value,
  name,
  title,
  placeholder = null,
  handle,
  click,
  arr,
  arr2
) => {
  //   console.log(arr2);
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold" className={styles.label}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Select
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
          color="#01A86C"
        >
          {arr.map((elemen) => {
            return (
              <option key={elemen.id} value={elemen.id}>
                {elemen.name}
              </option>
            );
          })}
        </Select>
        <Box
          paddingLeft="3%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value.length === 0 ? null : <CgCheck size="30px" color="#01A86C" />}
        </Box>
      </Box>

      {arr2.map((categorias) => {
        let genero = arr?.map((c) => {
          return c.id === categorias && c.name;
        });

        return (
          <Box>
            <FormLabel
              key={categorias}
              id={categorias}
              value={categorias}
              title={title}
              onClick={click}
              cursor="pointer"
              boxShadow="lg"
              rounded="lg"
              textAlign="center"
              width="88%"
              ml={"2%"}
              mt={"2%"}
              color="#01A86C"
            >
              {genero}
            </FormLabel>
          </Box>
        );
      })}
    </Box>
  );
};

//BOTONES
export const elementButton = (
  handleOnSubmit,
  handleBackSubmit,
  error,
  book,
  copyInitialBook
) => {
  return (
    <Flex justifyContent="space-around">
      <Button
        w="30%"
        backgroundColor="#01A86C"
        variant="solid"
        onClick={handleOnSubmit}
        disabled={
          JSON.stringify(error) === "{}"
            ? false
            : JSON.stringify(book) !== copyInitialBook
            ? false
            : true
        }
      >
        Enviar
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
  );
};

//INPUT TIPO ARCHIVO CONTROLADO
export const elementInputImage = (
  label,
  validate,
  value,
  name,
  placeholder = null,
  handle,
  handleFile
) => {
  return (
    <Box pl={"2%"}>
      <FormControl isRequired isInvalid={validate}>
        <FormLabel fontWeight="bold" className={styles.label}>
          {label}
        </FormLabel>
        <Box display="flex" justifyContent="space-between" pr="2%">
          <InputGroup>
            <Input
              value={value}
              name={name}
              onChange={handle}
              focusBorderColor="#01A86C"
              placeholder={placeholder}
              boxShadow="lg"
              rounded="lg"
              color="#01A86C"
            />
            <InputRightElement>
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                cursor={"pointer"}
                onChange={handleFile}
              ></Input>
              <TbBookUpload size={"70%"} color="green" />
            </InputRightElement>
          </InputGroup>
          <Box
            paddingLeft="3%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {value === ""
              ? null
              : !validate && <CgCheck size="30px" color="#01A86C" />}
          </Box>
        </Box>
        {validate && <FormErrorMessage>{validate}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
