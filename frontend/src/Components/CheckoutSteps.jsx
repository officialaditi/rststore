import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Flex,
} from "@chakra-ui/react";
import { IoCaretForwardSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent="center" mb="8">
      <Breadcrumb separator={<IoCaretForwardSharp color="gray.500" />}>
        {/* Step 1 */}
        <BreadcrumbItem>
          {step1 ? (
            <BreadcrumbLink to="/login?redirect=/shipping" as={RouterLink}>
              Login
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.500">
              Login
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {/* Step 2 */}
        <BreadcrumbItem>
          {step2 ? (
            <BreadcrumbLink to="/shipping" as={RouterLink}>
              Shipping
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.500">
              Shipping
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {/* step 3 */}
        <BreadcrumbItem>
          {step3 ? (
            <BreadcrumbLink to="/placeorder" as={RouterLink}>
              Place Order
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Place Order
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};
export default CheckoutSteps;
