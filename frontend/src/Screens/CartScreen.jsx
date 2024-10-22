import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import {
  useParams,
  useSearchParams,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  let qty = searchParams.get("qty");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, +qty));
    }
  }, [id, dispatch, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <Grid>
      <Box>
        <Heading mb="8" textAlign="center">
          Shopping Cart
        </Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is Empty...{" "}
              <Link as={RouterLink} to="/" color="red.600" fontSize="xl">
                Shop Now
              </Link>
            </Message>
          ) : (
            <Grid
              templateColumns={{ base: "1fr", md: "2fr 1fr", lg: "4fr 2fr" }}
              gap="10"
              w="full"
            >
              <Flex direction="column">
                {cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    size="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px"
                    borderColor="gray.200"
                    py="4"
                    px="4"
                    rounded="lg"
                    _hover={{ bgColor: "gray.50" }}
                    templateColumns={{ base: "1fr", md: "1fr 4fr 2fr 2fr 2fr" }}
                  >
                    {/* product Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      borderRadius="lg"
                      height="14"
                      weight="14"
                      objectFit="cover"
                    />
                    {/* product name */}
                    <Text fontWeight="semibold" fontSize="lg">
                      <Link as={RouterLink} to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Text>
                    {/* product price */}
                    <Text fontWeight="bold" fontSize="lg">
                      ${item.price}
                    </Text>
                    {/* Quantity select box */}
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                      width="20"
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1}>{i + 1}</option>
                      ))}
                    </Select>
                    {/* Delete Button */}
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Icon as={IoTrashBinSharp} />
                    </Button>
                  </Grid>
                ))}
              </Flex>
              {/** Second column */}
              <Flex
                direction="column"
                bgColor="gray.200"
                rounded="md"
                padding="5"
                height="48"
                justifyContent="space-between"
              >
                <Flex direction="column">
                  <Heading as="h2" fontSize="2xl" mb="2">
                    Subtotal (
                    {cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)}{" "}
                    items )
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="blue.600"
                    mb="4"
                  >
                    $
                    {cartItems.reduce(
                      (acc, currVal) => acc + currVal.qty * currVal.price,
                      0
                    )}
                  </Text>
                  <Button
                    type="button"
                    disabled={cartItems.length === 0}
                    size="lg"
                    colorScheme="teal"
                    bgColor="gray.800"
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </Flex>
              </Flex>
            </Grid>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};
export default CartScreen;
