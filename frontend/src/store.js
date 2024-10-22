import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { allProductReducer, singleProductReducer } from "./redux/reducers/productReducer";

const reducers = combineReducers({
  allProductList: allProductReducer,
  singleProductDetail: singleProductReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
