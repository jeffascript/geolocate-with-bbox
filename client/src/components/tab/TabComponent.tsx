import React from 'react';
import { Tabs, TabList, Tab, Center } from '@chakra-ui/react';
import { useSetGeoModeInCtx, GeoDisplayMode } from '../../context-api/GeoSelectCtx';
import { useTypedDispatch } from '../../redux/store';
import { clearState } from '../../redux/featuresSlice';

const TabComponent = () => {
    const dispatch = useTypedDispatch();
    const switcher = useSetGeoModeInCtx();

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
