import { Box, Button, Flex, Heading, Icon, Table, Td, Th, Thead, Tr, Tbody } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoCheckmarkCircleSharp, IoCloseCircleSharp, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../redux/actions/userAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error: listError, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: deleteError, success } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch, success, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Heading as="h1" fontSize="3xl" m="5" textAlign="center">
        All User List
      </Heading>
      {loading ? (
        <Loader />
      ) : listError ? (
        <Message type="error">{listError}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
          {deleteError && <Message type="error">{deleteError}</Message>}
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Admin</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.username}</Td>
                  <Td>
                    <a href={`mailto: ${user.email}`}>{user.email}</a>
                  </Td>
                  <Td>
                    {user.isAdmin ? (
                      <Icon as={IoCheckmarkCircleSharp} color="green.600" w="8" h="8" />
                    ) : (
                      <Icon as={IoCloseCircleSharp} color="red.600" w="8" h="8" />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/user/${user._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="lg" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};
export default UserListScreen;
