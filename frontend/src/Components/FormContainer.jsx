import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "xl" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="2xl"
      rounded="lg"
      bgColor="whiteAlpha.900"
      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};
export default FormContainer;
