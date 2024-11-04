import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/actions/cartAction";
import FormContainer from "../Components/FormContainer";
import countries from "../data/countries";
import CheckoutSteps from "../Components/CheckoutSteps";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h2" mb="8" fontSize="2xl">
          Shipping
        </Heading>
        <CheckoutSteps step1 step2  />
        <form onSubmit={submitHandler}>
          {/* Address */}
          <FormControl id="address">
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              id="address"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* city */}
          <FormControl id="city">
            <FormLabel htmlFor="city">Enter City</FormLabel>
            <Input
              id="city"
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />

          {/* postal code */}
          <FormControl id="country">
            <FormLabel html="postal code">Postal Code</FormLabel>
            <Input
              id="postalCode"
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          {/* country */}
          <FormControl id="country">
            <FormLabel htmlFor="country">Select Country</FormLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Select option"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </FormControl>
          <Spacer h="3" />
          <Button type="submit" colorScheme="teal" mt="4">
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};
export default ShippingScreen;
