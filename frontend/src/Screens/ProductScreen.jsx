import { Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { Route, Link as RouterLink, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import { useEffect, useState } from "react";
import axios from 'axios'

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      console.log(data);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Flex mb="5 ">
        <Button as={RouterLink} to="/" colorScheme="green">
          Go Back
        </Button>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "5fr 4fr 3fr" }} gap="10">
        {/* image column 1 */}
        <Image
          src={product.image}
          alt={product.name}
          borderRadius="md"
          w="450px"
        />

        {/* product name, brand names, rating, description */}
        <Flex direction="column" gap="7">
          <Heading as="h5" fontSize="2xl" color="gray.500">
            {product.brand}
          </Heading>
          <Heading as="h3" fontSize="xl" my="3">
            {product.name}
          </Heading>
          <Rating
            value={product.rating}
            color="yellow.500"
            text={`${product.numReviews} reviews`}
          />
          <Heading>${product.price}</Heading>
          <Text>{product.description}</Text>
        </Flex>
        {/* column 3 = product details */}
        <Flex direction="column">
          <Flex justifyContent="space-between" py="2">
            <Text>Price:</Text>
            <Text>${product.price}</Text>
          </Flex>
          <Flex justifyContent="space-between" py="2" pb="10">
            <Text>Status:-</Text>
            <Text fontWeight="bold">
              {product.countInStock > 0 ? "In Stock" : "Not available"}
            </Text>
          </Flex>
          <Button
            bg="gray.800"
            colorScheme="teal"
            my="2"
            textTransform="lowercase"
            letterSpacing="wide"
            isDisabled={product.countInStock === 0}
          >
            Add to Cart
          </Button>
        </Flex>
      </Grid>
    </>
  );
};
export default ProductScreen;
