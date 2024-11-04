import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import { getUserDetail, updateUserProfile } from "../redux/actions/userAction";
import { listMyOrders } from "../redux/actions/orderAction";
import FormContainer from "../Components/FormContainer";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { USER_DETAIL_RESET } from "../redux/contants/userContants";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, user: updatedUser } = userUpdateProfile;
  debugger;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!user || !user.username) {
      dispatch(getUserDetail());
      dispatch(listMyOrders());
    } else {
      setUsername(updatedUser.username || user.username);
      setEmail(updatedUser.email || user.email);
    }
  }, [userInfo, user, dispatch, navigate, success, updatedUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // dispatch update function
      dispatch(updateUserProfile({ id: user._id, username, email, password }));

      dispatch({ type: USER_DETAIL_RESET });
    }
  };

  return (
    <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} py="5" gap="10">
      {/* column 1 */}
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}
          <form onSubmit={submitHandler}>
            <FormControl id="username">
              <FormLabel htmlFor="username">Enter Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter You Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="username@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="confirmPassword">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
              Update
            </Button>
          </form>
        </FormContainer>
      </Flex>
      {/** column 2 */}
      <Flex direction="column">
        <Heading as="h2" mb="4">
          My Orders
        </Heading>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error">{errorOrders}</Message>
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Date</Th>
                <Th>Total</Th>
                <Th>Paid</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{new Date(order.createdAt).toDateString()}</Td>
                  <Td>₹{order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      new Date(order.paidAt).toDateString()
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}{" "}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toDateString()
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}{" "}
                  </Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/order/${order._id}`}
                      colorScheme="teal"
                      size="sm"
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Grid>
  );
};
export default ProfileScreen;
