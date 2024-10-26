import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/actions/cartAction";
import CheckoutSteps from "../Components/CheckoutSteps";
import FormContainer from "../Components/FormContainer";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || "paypal"
  );

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate("/placeorder");
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <CheckoutSteps setp1 step2 step3 />
        <Heading as="h2" fontSize="3xl">
          Payment Method
        </Heading>
        <form onSubmit={submitHandler}>
          <FormControl id="fieldset">
            <FormLabel htmlFor="legend">Select Method</FormLabel>
            <RadioGroup
              value={paymentMethodRadio}
              onChange={setPaymentMethodRadio}
            >
              <HStack space="24px">
                <Radio value="paypal">PayPal or Credit/Debit Card</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Spacer h='3'/>
          <Button type='sumbit' colorScheme="teal" mt='4'>Continue</Button>
        </form>
      </FormContainer>
    </Flex>
  );
};
export default PaymentScreen;
