import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';

type Props = {
    submit?: () => void;
};

const ButtonComponent = ({ submit }: Props) => {
    const { loadingStatus } = useSelector((state: RootState) => state.allFeatures);

    return (
        <Stack direction="row" spacing={4} align="center">
            <Button
                isLoading={loadingStatus === 'loading'}
                loadingText="Loading"
                colorScheme="purple"
                variant="outline"
                spinnerPlacement="end"
                onClick={() => {
                    submit?.();
                }}
            >
                Submit
            </Button>
        </Stack>
    );
};

export default ButtonComponent;
