import { NumberInput, NumberInputField } from '@chakra-ui/react';

type Props = {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    name: string;
};
function NumberInputComponent({ value, onChange, name }: Props) {
    return (
        <NumberInput size="sm" color={'black'} bg="purple.100" isRequired={true} value={value}>
            <NumberInputField onChange={(e) => onChange(e, name)} />
        </NumberInput>
    );
}

export default NumberInputComponent;
