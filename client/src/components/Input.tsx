import { Container, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import InputDescription from "./InputDescription";
import NumberInputComponent from "./NumberInput";

type Props = {};

const Input = (props: Props) => {
  return (
    <>
      <Container
        maxW="md"
        bg="purple.400"
        color="white"
        borderRadius={10}
        border={"3px solid var(--main-color)"}
      >
        <Grid gap={5} padding={3}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} className="input__grid__top">
            <GridItem colStart={2} colSpan={1} colEnd={3} h="10">
              <NumberInputComponent />
              <InputDescription text="Max Latitude" />
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem colStart={1} colEnd={2} h="10" className="input__grid__left">
              <NumberInputComponent />
              <InputDescription text="Min Longitude" />
            </GridItem>
            <GridItem colStart={3} colEnd={4} className="input__grid__right">
              <NumberInputComponent />
              <InputDescription text="Max Longitude" />
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem colStart={2} colSpan={1} colEnd={3} h="10" className="input__grid__bottom">
              <NumberInputComponent />
              <InputDescription text="Min Latitude" />
            </GridItem>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Input;
