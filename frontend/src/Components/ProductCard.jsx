import { Box, Heading, Image, Link, Text, Flex } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box borderRadius="lg" bgColor="white" _hover={{ shadow: "md" }}>
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="430px"
          objectFit="cover"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
        />
        <Flex py="5" px="5" direction="column" justifyContent="space-between">
          <Heading as="h2" fontSize="lg" mb="3">
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating color="yellow.500" value={product.rating} />
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              ${product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};
export default ProductCard;
