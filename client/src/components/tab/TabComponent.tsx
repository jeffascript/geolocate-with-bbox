import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Center } from "@chakra-ui/react";
import {
  useSetGeoModeInCtx,
  GeoDisplayMode,
  useGeoModeFromCtx,
} from "../../context-api/GeoSelectCtx";
import { RootState, useTypedDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { clearState } from "../../redux/featuresSlice";

type Props = {};

const TabComponent = (props: Props) => {
  const dispatch = useTypedDispatch();
  const switcher = useSetGeoModeInCtx();
  const geoMode = useGeoModeFromCtx();

  return (
    <Center h="10em" color="white">
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList>
          <Tab
            onClick={() => {
              switcher(GeoDisplayMode.Geobox);
              dispatch(clearState());
            }}
          >
            Search with Bounding Box
          </Tab>
          <Tab
            onClick={() => {
              switcher(GeoDisplayMode.LatLongBox);
              dispatch(clearState());
            }}
          >
            Search with only Longitude & Latitude
          </Tab>
        </TabList>
      </Tabs>
    </Center>
  );
};

export default TabComponent;
