import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Flex } from "@chakra-ui/react";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
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
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen/>} />
            <Route path='/shipping' element={<ShippingScreen/>} />
          </Routes>
        </Flex>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
