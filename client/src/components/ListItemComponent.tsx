import { Box, Heading, LinkOverlay, Text } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled";

const StyledListItem = styled.div`
  // fallback incase the main style wasnt included for this component
  --main-color: #9f7aea;
  --main-bg-color: #e9d8fd;
  padding: 1em;
  border: 3px solid var(--main-color);
  margin: 0.5em auto;
  max-width: 450px;
`;

type Prop = {};
const ListItemComponent = ({}: Prop) => {
  return (
    <>
      <StyledListItem>
        <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
          13 days ago
        </Box>
        <Heading size="md" my="2">
          New Year, New Beginnings: Smashing Workshops & Audits
          {/* <LinkOverlay href="#">New Year, New Beginnings: Smashing Workshops & Audits</LinkOverlay> */}
        </Heading>
        <Text mb="3">
          Catch up on what’s been cookin’ at Smashing and explore some of the most popular community
          resources.
        </Text>
        <Box as="a" color="teal.400" href="#" fontWeight="bold">
          Some inner link
        </Box>
      </StyledListItem>
    </>
  );
};

export default ListItemComponent;
