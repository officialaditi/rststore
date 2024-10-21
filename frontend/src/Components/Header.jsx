import { useState } from "react";
import { Flex, Box, Heading, Icon, Link } from "@chakra-ui/react";
import HeaderMenu from "./HeaderMenu";
import { HiOutlineMenuAlt3, HiShoppingBag, HiUser } from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="gray.800"
      w="100%"
      pos="fixed"
      top="0"
      left="0"
      zIndex='9999'
    >
      <Link as={RouterLink} to="/">
        <Heading
          as="h1"
          color="whiteAlpha.800"
          fontWeight="bold"
          size="md"
          letterSpacing=" wide"
        >
          Rst-Store
        </Heading>
      </Link>
      <Box
        display={{ md: "none", base: "block" }}
        onClick={() => setShow(!show)}
      >
        <Icon as={HiOutlineMenuAlt3} mr="1" w="6" h="6" color="white" />
      </Box>
      <Box
        display={{ md: "flex", base: show ? "block" : "none" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: "3", md: "0" }}
      >
        <HeaderMenu
          url="/cart"
          label="Cart"
          icon={<Icon as={HiShoppingBag} mr="1" w="6" h="6" />}
        />
        <HeaderMenu
          url="/login"
          label="Login"
          icon={<Icon as={HiUser} mr="1" w="6" h="6" />}
        />
      </Box>
    </Flex>
  );
};
export default Header;
