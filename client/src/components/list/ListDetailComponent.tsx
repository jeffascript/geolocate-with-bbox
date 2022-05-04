import React from 'react';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Code,
    Accordion,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    IconButton,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { RootState, useTypedDispatch } from '../../redux/store';
import SkeletonComponent from '../Skeleton';
import MapComponent from '../map/MapComponent';

import { clearState } from '../../redux/oneFeatureSlice';
import { customErr } from './listUtils';

const ListDetailComponent = () => {
    const {
        oneFeature: data,
        loadingStatus,
        oneFeatureDataError: error,
    } = useSelector((state: RootState) => state.oneFeature);

    const dispatch = useTypedDispatch();

    if (loadingStatus === 'loading') return <SkeletonComponent />;

    if (error) return <p>"An error has occurred. {customErr}"</p>;

    if (data.length === 0 && data[0].type)
        return <p>"No data found for this input! Try again with a different input"</p>;

    return (
        <>
            <div className="container-fluid" style={{ marginTop: '100%' }}>
                <div style={{ textAlign: 'center', padding: '1em ' }}>
                    <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        fontSize="40px"
                        icon={<ArrowBackIcon />}
                        onClick={() => dispatch(clearState())}
                    />
                    &nbsp;Go Back
                </div>
                <TableContainer>
                    <Table variant="striped" colorScheme="teal">
                        <TableCaption>Details from {data[0].id}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Description</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.entries(data[0].properties).map(([key, value]) => (
                                <Tr key={key}>
                                    <Td>{key as string}</Td>
                                    <Td>{value as string}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

                <Accordion defaultIndex={[0]} allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="center">
                                    View in JSON FORMAT
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Code colorScheme="purple">{JSON.stringify(data, null, 2)}</Code>
                        </AccordionPanel>
                    </AccordionItem>

                    <MapComponent />
                </Accordion>
            </div>
        </>
    );
};

export default ListDetailComponent;
