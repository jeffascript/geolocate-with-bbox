import React, { useCallback } from "react";
import { Center, Container, Grid, GridItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import InputDescription from "./InputDescription";
import NumberInputComponent from "./NumberInput";
import ButtonComponent from "../ButtonComponent";
import { GeoDisplayMode, useGeoModeFromCtx } from "../../context-api/GeoSelectCtx";

import { InputBoxTitle } from "./InputEnum";

import { BboxQuery, ConvertedGeoJson, LatLongQuery } from "@Jeff/shared";
import { RootState, useTypedDispatch } from "../../redux/store";
import { fetchFeatures } from "../../redux/featuresSlice";

type Props = {};

const initialBbox: BboxQuery = {
  lonMin: 0,
  latMin: 0,
  lonMax: 0,
  latMax: 0,
};

const initialLatLong: LatLongQuery = {
  lat: 0,
  long: 0,
};

const Input = (props: Props) => {
  const geoMode = useGeoModeFromCtx();

  const dispatch = useTypedDispatch();

  const [bbox, setBbox] = React.useState<BboxQuery>(initialBbox);

  const [latLong, setlatLong] = React.useState<LatLongQuery>(initialLatLong);

  const geoBoxUrl = `${process.env.REACT_APP_URL}/bbox?lonMin=${bbox.lonMin}&latMin=${bbox.latMin}&lonMax=${bbox.lonMax}&latMax=${bbox.latMax}`;
  const latLongUrl = `${process.env.REACT_APP_URL}/latlong?lat=${latLong.lat}&long=${latLong.long}`;

  const setBoxOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, text: string) => {
    setBbox((b) => ({ ...b, [text]: e.target.value }));
    console.log(e, text);
  }, []);

  const setLatLongOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, text: string) => {
    setlatLong((b) => ({ ...b, [text]: e.target.value }));
    console.log(e, text);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (geoMode === GeoDisplayMode.Geobox) {
      dispatch(fetchFeatures(geoBoxUrl));
      return setBbox(initialBbox);
    }
    dispatch(fetchFeatures(latLongUrl));
    return setlatLong(initialLatLong);
  }, [dispatch, geoBoxUrl, geoMode, latLongUrl]);

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
          {geoMode === GeoDisplayMode.Geobox && (
            <Grid templateColumns="repeat(3, 1fr)" gap={4} className="input__grid__top">
              <GridItem colStart={2} colSpan={1} colEnd={3} h="10">
                <NumberInputComponent
                  value={bbox.latMax}
                  onChange={setBoxOnChange}
                  name={"latMax"}
                />
                <InputDescription text={InputBoxTitle.MaxLatitude} />
              </GridItem>
            </Grid>
          )}
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem colStart={1} colEnd={2} h="10" className="input__grid__left">
              <NumberInputComponent
                value={geoMode === GeoDisplayMode.Geobox ? bbox.lonMin : latLong.lat}
                onChange={geoMode === GeoDisplayMode.Geobox ? setBoxOnChange : setLatLongOnChange}
                name={geoMode === GeoDisplayMode.Geobox ? "lonMin" : "lat"}
              />
              <InputDescription
                text={
                  geoMode === GeoDisplayMode.Geobox
                    ? InputBoxTitle.MinLongitude
                    : InputBoxTitle.Latitude
                }
              />
            </GridItem>
            <GridItem colStart={3} colEnd={4} className="input__grid__right">
              <NumberInputComponent
                name={geoMode === GeoDisplayMode.Geobox ? "lonMax" : "long"}
                value={geoMode === GeoDisplayMode.Geobox ? bbox.lonMax : latLong.long}
                onChange={geoMode === GeoDisplayMode.Geobox ? setBoxOnChange : setLatLongOnChange}
              />
              <InputDescription
                text={
                  geoMode === GeoDisplayMode.Geobox
                    ? InputBoxTitle.MaxLongitude
                    : InputBoxTitle.Longitude
                }
              />
            </GridItem>
          </Grid>
          {geoMode === GeoDisplayMode.Geobox && (
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem colStart={2} colSpan={1} colEnd={3} h="10" className="input__grid__bottom">
                <NumberInputComponent
                  value={bbox.latMin}
                  onChange={setBoxOnChange}
                  name={"latMin"}
                />
                <InputDescription text={InputBoxTitle.MinLatitude} />
              </GridItem>
            </Grid>
          )}
        </Grid>
      </Container>

      <Center h="5em" color="white">
        <ButtonComponent submit={handleSubmit} />
      </Center>
    </>
  );
};

export default Input;
