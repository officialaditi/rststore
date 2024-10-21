import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Flex } from "@chakra-ui/react";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Flex
          as="main"
          mt="72px"
          direction="column"
          py="6"
          px="6"
          bgColor="gray.200"
        >
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Flex>
      </BrowserRouter>
      <Footer />
    </>
  );
};
export default App;
