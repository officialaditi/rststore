import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
import Message from "../Components/Message";

const placeOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, currVal) => acc + currVal.price * +currVal.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice < 10000 ? 10000 : 0;
  cart.taxPrice = (28 * cart.itemsPrice) / 100;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
   alert('place order button clicked')
  };
  return (
    <Flex w="full" direction="column" py="5">
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid templateColumns={{ base: "1fr", md: "3fr 2fr" }}>
        {/* column1 */}
        <Flex direction="column">
          {/* shipping  */}
          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
              Shipping
            </Heading>
            <Text>
              <strong>Address: </strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode},{cart.shippingPrice.country}
            </Text>
          </Box>
          {/* payment Method */}
          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
              Payment Method
            </Heading>
            <Text>
              <strong>Payment Method: </strong>
              {cart.paymentMethod.toUpperCase()}
            </Text>
          </Box>
          {/* order items */}
          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
              Order Items
            </Heading>
            <Box>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is Empty</Message>
              ) : (
                <Box py="2">
                  {cart.cartItems.map((item, idx) => (
                    <Flex
                      key={idx}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex py="2" alignItems="center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="12"
                          h="12"
                          objectFit="cover"
                          mr="6"
                        />
                        <Link
                          fontWeight="bold"
                          fontSize="xl"
                          to={`/products/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Flex>
        <Flex
          direction="column"
          bgColor="white"
          justifyContent="space-between"
          py="8"
          px="8"
          shadow="md"
          textAlign="center"
          rounded="lg"
          borderColor="gray.300"
        >
          <Box>
            <Heading>Order Summary</Heading>
            {/* items price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Items</Text>
              <Text fontWeight="bold" fontSize="xl">
                ${cart.itemsPrice}
              </Text>
            </Flex>
            {/* shipping price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Shipping</Text>
              <Text fontWeight="bold" fontSize="xl">
                ${cart.shippingPrice}
              </Text>
            </Flex>
            {/* Tax Price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Tax</Text>
              <Text fontWeight="bold" fontSize="xl">
                ${cart.taxPrice}
              </Text>
            </Flex>
            {/* Total Price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Total</Text>
              <Text fontWeight="bold" fontSize="xl">
                ${cart.totalPrice}
              </Text>
            </Flex>
          </Box>
          <Button
            size="lg"
            textTransform="uppercase"
            colorScheme="yellow"
            type="button"
            w="full"
            onClick={placeOrderHandler}
            disabled={cart.cartItems === 0}
          >
            Place Order
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default placeOrderScreen;
