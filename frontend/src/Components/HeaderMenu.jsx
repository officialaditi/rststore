import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HeaderMenu = ({ url, label, icon }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      fontSize="lg"
      letterSpacing="uppercase"
      mr="5"
      display="flex"
      alignItems="center"
      color="whiteAlpha.800"
      mb={{ base: "2", md: 0 }}
      _hover={{ textDecor: "none", color: "whiteAlpha.600" }}
    >
      {icon}
      {label}
    </Link>
  );
};
export default HeaderMenu;
