import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
} from "../contants/productContants";

export const allProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case ALL_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload };
    case ALL_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
