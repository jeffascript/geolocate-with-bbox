import { Stack, Badge } from "@chakra-ui/react";

type Prop = {
  text: string;
};
function InputDescription({ text }: Prop) {
  return (
    <Stack direction="row" margin={0.5}>
      <Badge>{text}</Badge>
    </Stack>
  );
}

export default InputDescription;
