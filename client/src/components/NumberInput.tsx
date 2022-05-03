import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

function NumberInputComponent() {
  return (
    <NumberInput
      size="sm"
      defaultValue={0}
      color={"black"}
      bg="purple.100"
      //   precision={5}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

export default NumberInputComponent;
