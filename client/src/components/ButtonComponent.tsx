import React from "react";

import { Button, Stack } from "@chakra-ui/react";
import { useGeoModeFromCtx } from "../context-api/GeoSelectCtx";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  submit?: () => void;
};

const ButtonComponent = ({ submit }: Props) => {
  const {
    featureStore: data,
    loadingStatus,
    featuresDataError: error,
  } = useSelector((state: RootState) => state.allFeatures);

  const geoMode = useGeoModeFromCtx();

  return (
    <Stack direction="row" spacing={4} align="center">
      <Button
        isLoading={loadingStatus === "loading"}
        loadingText="Loading"
        colorScheme="purple"
        variant="outline"
        spinnerPlacement="end"
        onClick={() => {
          console.log(geoMode);
          submit?.();
        }}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ButtonComponent;
