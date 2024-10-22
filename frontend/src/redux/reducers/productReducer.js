import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
} from "../contants/productContants";

/* ALL PRODUCT REDUCER */

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

/* SINGLE PRODUCT REDUCERS */

export const singleProductReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
