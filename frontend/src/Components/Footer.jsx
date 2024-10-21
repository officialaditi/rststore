import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" justifyContent="center" py="5">
      <Text>
        CopyRight {new Date().getFullYear()}. RST Store. All Right Reserved.
      </Text>
    </Flex>
  );
};
export default Footer;
