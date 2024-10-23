import { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import HeaderMenu from "./HeaderMenu";
import { HiOutlineMenuAlt3, HiShoppingBag, HiUser } from "react-icons/hi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/userAction";

const Header = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
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
      zIndex="9999"
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
        {userInfo ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
              _hover={{ textDecor: "none", opacity: "0.7" }}
            >
              {userInfo.username}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to='/profile'>Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HeaderMenu
            url="/login"
            label="Login"
            icon={<Icon as={HiUser} mr="1" w="6" h="6" />}
          />
        )}
      </Box>
    </Flex>
  );
};
export default Header;
