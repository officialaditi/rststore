import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  allProductReducer,
  singleProductReducer,
} from "./redux/reducers/productReducer";
import { cartReducer } from "./redux/reducers/cartReducer";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./redux/reducers/userReducer";

const reducers = combineReducers({
  allProductList: allProductReducer,
  singleProductDetail: singleProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
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
