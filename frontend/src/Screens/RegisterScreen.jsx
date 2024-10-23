import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useNavigate,
  Link as RouterLink,
  useSearchParams,
} from "react-router-dom";
import { register } from "../redux/actions/userAction";
import FormContainer from "../Components/FormContainer";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Opps!! password do not match");
    } else {
      dispatch(register(username, email, password));
    }
  };
  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl" textAlign="center">
          Register
        </Heading>
        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}
        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Enter Username</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          <FormControl id="email">
            <FormLabel htmlFor="email">Enter Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Spacer h="4" />
          <FormControl id="password">
            <FormLabel htmlFor="password">Enter Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Spacer h="4" />
          <FormControl id="confirmPassword">
            <FormLabel htmlFor="confirmPassword">
              Enter Confirm Password
            </FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="**********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Spacer h="4" />
          <Button type="submit" colorScheme="teal" mt="2" isLoading={loading}>
            Register
          </Button>
          <Flex pt="10">
            <Text fontWeight="semibold">Already a Customer? </Text>
            <Link as={RouterLink} to="/login">
              Click hear to Login
            </Link>
          </Flex>
        </form>
      </FormContainer>
    </Flex>
  );
};
export default RegisterScreen;
