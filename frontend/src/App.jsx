import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Flex } from "@chakra-ui/react";
import HomeScreen from "./Screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgColor="gray.200"
      >
        <HomeScreen />
      </Flex>
      <Footer />
    </>
  );
};
export default App;
