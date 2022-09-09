//Componentes Chakra
import {
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  Stack,
  Flex,
  Select,
  Box,
} from "@chakra-ui/react";

import { CgCheck } from "react-icons/cg";

//=======================================================================================
//FUNCIONES PARA NO REPETIR CODIGO

//INPUTS SENCILLOS
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
      <FormLabel fontWeight="bold">{label}</FormLabel>
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
      <FormLabel fontWeight="bold">{label}</FormLabel>
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
      <FormLabel fontWeight="bold">{label}</FormLabel>
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
      <FormLabel fontWeight="bold">{label}</FormLabel>
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

export const elementInputDate = (type, label, value, name, handle) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
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
      <FormLabel fontWeight="bold">{label}</FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Select
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
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

export const elementNumber = (
  label,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
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

export const elementInput = (
  label,
  value,
  name,
  placeholder = null,
  handle
) => {
  return (
    <Box pl={"2%"}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
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
      <FormLabel fontWeight="bold">{label}</FormLabel>
      <Box display="flex" justifyContent="space-between" pr="2%">
        <Select
          value={value}
          name={name}
          onChange={handle}
          focusBorderColor="#01A86C"
          placeholder={placeholder}
          boxShadow="lg"
          rounded="lg"
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
            >
              {genero}
            </FormLabel>
          </Box>
        );
      })}
    </Box>
  );
};

export const elementButton = (
  handleOnSubmit,
  handleBackSubmit,
  error,
  book
) => {
  return (
    <Flex justifyContent="space-around">
      <Button
        w="30%"
        backgroundColor="#01A86C"
        variant="solid"
        onClick={handleOnSubmit}
        disabled={
          JSON.stringify(error) === "{}" && book.title !== "" ? false : true
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
