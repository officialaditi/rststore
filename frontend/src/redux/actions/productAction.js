import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
} from "../contants/productContants";

export const allProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products`);
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    //
  } catch (err) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const singleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
    //
  } catch (err) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
