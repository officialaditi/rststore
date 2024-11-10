import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { getUserIdDetails, updateUser } from "../redux/actions/userAction";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { USER_UPDATE_RESET } from "../redux/contants/userContants";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: userId } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate(`/admin/userlist`);
    } else {
      if (!user || user._id !== userId) {
        // Fetch user details if user data is missing or doesn't match the userId
        dispatch(getUserIdDetails(userId));
      } else {
        console.log("Fetched user:", user);
        setUsername(user.username || "");
        setEmail(user.email || "");
        setIsAdmin(user.isAdmin || false);
      }
    }
  }, [userId, user, successUpdate, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, username, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" as={RouterLink}>
        <Button colorScheme="teal">Go Back</Button>
      </Link>
      <Flex w="full" align="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            Edit User
          </Heading>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              <FormControl id="isAdmin">
                <FormLabel>Is Admin ??</FormLabel>
                <Checkbox
                  size="md"
                  type="checkbox"
                  isChecked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                >
                  Is Admin??
                </Checkbox>
              </FormControl>
              <Spacer h="3" />
              <Button type="submit" isLoading={loadingUpdate} colorScheme="teal">
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default UserEditScreen;


