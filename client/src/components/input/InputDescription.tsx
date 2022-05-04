import { Stack, Badge, Center } from '@chakra-ui/react';

type Prop = {
    text: string;
};
function InputDescription({ text }: Prop) {
    return (
        <Center color="white">
            <Stack direction="row" margin={0.5}>
                <Badge>{text}</Badge>
            </Stack>
        </Center>
    );
}

export default InputDescription;
