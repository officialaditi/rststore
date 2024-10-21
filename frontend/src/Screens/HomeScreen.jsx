import { Heading, Grid } from "@chakra-ui/react";
import products from "../products";
import ProductCard from "../Components/ProductCard";

const HomeScreen = () => {
  return (
    <>
      <Heading as="h2" mb="6" fontSize="2xl">
        Latest Product
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr " }}
        gap="8"
      >
        {products.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </Grid>
    </>
  );
};
export default HomeScreen;
