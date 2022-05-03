import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";

type Props = {};

const TabComponent = (props: Props) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList>
        <Tab>Search with Bounding Box</Tab>
        <Tab>Search with Longitude & Latitude</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabComponent;
