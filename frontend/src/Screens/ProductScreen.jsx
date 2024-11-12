import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  FormControl,
  FormLabel,
  Box,
  Textarea,
  Select,
} from "@chakra-ui/react";
import {
  Route,
  Link as RouterLink,
  useParams,
  useNavigate,
} from "react-router-dom";
import Rating from "../Components/Rating";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  singleProduct,
  createProductReview,
} from "../redux/actions/productAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { PRODUCT_REVIEW_CREATE_RESET } from "../redux/contants/productContants";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const singleProductDetails = useSelector(
    (state) => state.singleProductDetails
  );
  const { loading, product, error } = singleProductDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(singleProduct(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };
  return (
    <>
      <Flex mb="5 ">
        <Button as={RouterLink} to="/" colorScheme="green">
          Go Back
        </Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
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
              {product.countInStock > 0 && (
                <Flex justifyContent="space-between" py="2">
                  <Text>Qty: </Text>
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    width="30%"
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Select>
                </Flex>
              )}
              <Button
                bg="gray.800"
                colorScheme="teal"
                my="2"
                textTransform="lowercase"
                letterSpacing="wide"
                isDisabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Flex>
            {/* Review  */}
            <Box
              p="10"
              bgColor="white"
              rounded="md"
              mt="10"
              borderColor="gray.300"
            >
              <Heading as="h2" size="lg" mb="6">
                Write a review
              </Heading>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              {product.reviews.length !== 0 && (
                <Box p="4" bgColor="white" rounded="md" mb="1" mt="5">
                  {product.reviews.map((review) => (
                    <Flex direction="column" key={review._id}>
                      <Flex justifyContent="space-between">
                        <Text fontSize="lg">
                          <strong>{review.username}</strong>
                        </Text>
                        <Rating value={review.rating} />
                      </Flex>
                      <Text mt="2">{review.comment}</Text>
                    </Flex>
                  ))}
                </Box>
              )}
              {errorProductReview && (
                <Message type="error">{errorProductReview}</Message>
              )}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <FormControl id="rating" mb="3">
                    <FormLabel>Rating</FormLabel>
                    <Select
                      placeholder="Select Option"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option>Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Okay</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Select>
                  </FormControl>

                  <FormControl id="comment" mb="3">
                    <FormLabel>Comment</FormLabel>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Textarea>
                  </FormControl>

                  <Button colorScheme="teal" type="submit">
                    Post Review
                  </Button>
                </form>
              ) : (
                <Message>Please login to write a review</Message>
              )}
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};
export default ProductScreen;
