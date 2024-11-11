import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  allProductReducer,
  productDeleteReducer,
  singleProductDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./redux/reducers/productReducer";
import { cartReducer } from "./redux/reducers/cartReducer";
import {
  userDeleteReducer,
  userDetailReducer,
  userIdDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducers,
  orderMyListReducer,
  orderPayReducer,
} from "./redux/reducers/orderReducer";

const reducers = combineReducers({
  allProductList: allProductReducer,
  singleProductDetails: singleProductDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userIdDetails: userIdDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const updatedUserFromStorage = localStorage.getItem("updatedUser")
  ? JSON.parse(localStorage.getItem("updatedUser"))
  : JSON.parse(localStorage.getItem("userInfo"));

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "paypal";

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  userUpdateProfile: { user: updatedUserFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
