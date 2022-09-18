import React from "react";
import { Box, Image, Grid, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import styles from "./SearchBar.module.css";

const SearchResults = ({ searchResults, clearTitle }) => {
  const handleClick = (e) => clearTitle();
  return (
    <Grid gridRowGap="1rem" onClick={handleClick}>
      {searchResults.map(({ title, description, image, id }) => (
        <NavLink to={`/catalog/detail/${Number(id)}`}>
          <Box
            key={id}
            _hover={{
              background: "#01A86C",
              color: "white",
              cursor: "pointer",
            }}
            p=".5rem 1rem"
          >
            <Grid
              sx={{
                gridTemplateColumns: "50px 1fr",
                gridColumnGap: "1rem",
                height: "70px",
                overflow: "hidden",
              }}
            >
              <Box>
                <Image
                  src={image}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <VStack align="start" height="70%">
                <Text noOfLines={1} height="70%" fontWeight="bold">
                  {title}
                </Text>
                <Text noOfLines={1}>{description}</Text>
              </VStack>
            </Grid>
          </Box>
        </NavLink>
      ))}
    </Grid>
  );
};

export default SearchResults;
