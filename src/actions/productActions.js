import axios from "axios";
import { BACKEND_URL } from "../constants/backendUrl";
import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST_FAIL,
  DELETE_PRODUCT_REQUEST_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_ADMIN_PRODUCTS,
  GET_ADMIN_PRODUCTS_FAIL,
  GET_ADMIN_PRODUCTS_SUCCESS,
  GET_All_PRODUCTS,
  GET_All_PRODUCTS_FAIL,
  GET_All_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_REQUEST_FAIL,
  NEW_PRODUCT_REQUEST_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_REQUEST_FAIL,
  NEW_REVIEW_REQUEST_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
} from "../constants/productConstants";

export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_All_PRODUCTS,
      });

      let link = `${BACKEND_URL}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `${BACKEND_URL}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: GET_All_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_All_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get all products for admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADMIN_PRODUCTS,
    });

    const { data } = await axios.get(`${BACKEND_URL}/admin/products`);

    dispatch({
      type: GET_ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_PRODUCTS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_DETAILS,
    });

    const { data } = await axios.get(`${BACKEND_URL}/product/${id}`);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// create new Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${BACKEND_URL}/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all reviews of a product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEW_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_URL}/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
// delete reviews of a product
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });

    const { data } = await axios.delete(
      `${BACKEND_URL}/reviews?id=${id}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
// create new product
export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${BACKEND_URL}/admin/product/new`, productData);

    dispatch({
      type: NEW_PRODUCT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
// update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
// delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`${BACKEND_URL}/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
