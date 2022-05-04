import { Box, Heading, LinkOverlay, Text } from "@chakra-ui/react";
import React from "react";

import { useSelector } from "react-redux";
import { RootState, useTypedDispatch } from "../../redux/store";
import SkeletonComponent from "../Skeleton";
import { setOneFeatureToStore } from "../../redux/oneFeatureSlice";
import { customErr, StyledListItem } from "./listUtils";

type Prop = {};
const ListItemComponent = ({}: Prop) => {
  const {
    featureStore: data,
    loadingStatus,
    featuresDataError: error,
  } = useSelector((state: RootState) => state.allFeatures);

  const {
    oneFeature,
    oneFeatureDataError,
    loadingStatus: oneFeatureLoadingStatus,
  } = useSelector((state: RootState) => state.oneFeature);

  const dispatch = useTypedDispatch();

  if (loadingStatus === "loading") return <SkeletonComponent />;

  if (error) return <p>"An error has occurred. {customErr}"</p>;

  if (data.respData.features.length === 0 && data.respData.type)
    return <p>"No data found for this input! Try again with a different input"</p>;

  return (
    <>
      {!!data.respData.features.length
        ? data.respData.features.map((f) => {
            return [f.properties].map((oneProperty) => (
              <StyledListItem key={oneProperty.id}>
                <Box as="time" dateTime={oneProperty.timestamp}>
                  {oneProperty.timestamp}
                </Box>
                <Heading size="md" my="2">
                  User: {oneProperty.user}
                </Heading>
                <Text mb="3">{oneProperty.uid}</Text>

                <Box
                  as="a"
                  color="teal.400"
                  href="#"
                  fontWeight="bold"
                  onClick={() => dispatch(setOneFeatureToStore(oneProperty.id))}
                >
                  View more ...
                </Box>
              </StyledListItem>
            ));
          })
        : null}
    </>
  );
};

export default ListItemComponent;
