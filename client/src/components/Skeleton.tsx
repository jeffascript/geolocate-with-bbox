import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const SkeletonComponent = (props: Props) => {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default SkeletonComponent;
