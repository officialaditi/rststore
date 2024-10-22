import { Heading, Grid } from "@chakra-ui/react";
import ProductCard from "../Components/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../redux/actions/productAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const allProductList = useSelector((state) => state.allProductList);
  const { loading, products, error } = allProductList;

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);
  return (
    <>
      <Heading as="h2" mb="6" fontSize="2xl">
        Latest Product
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr " }}
          gap="8"
        >
          {products.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </Grid>
      )}
    </>
  );
};
export default HomeScreen;
