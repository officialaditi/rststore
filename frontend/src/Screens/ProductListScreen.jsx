import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  allProducts,
  deleteProduct,
  createProduct,
} from "../redux/actions/productAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { PRODUCT_CREATE_RESET } from "../redux/contants/productContants";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProductList = useSelector((state) => state.allProductList);
  const { loading, error, products } = allProductList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: SuccessDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: CreatedProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${CreatedProduct._id}/edit`);
    } else {
      dispatch(allProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    SuccessDelete,
    successCreate,
    CreatedProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure??")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Heading textAlign="center">All products List</Heading>
      <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Button onClick={createProductHandler} colorScheme="teal">
          <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" />
          Create Product
        </Button>
      </Flex>
      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Brand</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Th>{product._id}</Th>
                  <Th>{product.name}</Th>
                  <Th>{product.price}</Th>
                  <Th>{product.category}</Th>
                  <Th>{product.brand}</Th>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/product/${product._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                      >
                        <IoTrashBinSharp color="white" />
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
export default ProductListScreen;
