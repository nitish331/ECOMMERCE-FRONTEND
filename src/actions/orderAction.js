import axios from "axios";
import { BACKEND_URL } from "../constants/backendUrl";
import {
  ALL_ORDER_REQUEST,
  ALL_ORDER_REQUEST_FAIL,
  ALL_ORDER_REQUEST_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAIL,
  CREATE_ORDER_REQUEST_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_REQUEST_FAIL,
  DELETE_ORDER_REQUEST_SUCCESS,
  MY_ORDER_REQUEST,
  MY_ORDER_REQUEST_FAIL,
  MY_ORDER_REQUEST_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_REQUEST_FAIL,
  ORDER_DETAIL_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_FAIL,
  UPDATE_ORDER_REQUEST_SUCCESS,
} from "../constants/orderConstants";

// create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BACKEND_URL}/order/create`,
      order,
      config
    );

    dispatch({
      type: CREATE_ORDER_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update order
export const updateOrder = (id, order) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/admin/order/${id}`,
      order,
      config
    );

    dispatch({
      type: UPDATE_ORDER_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete order
export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`${BACKEND_URL}/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/myorders`);

    dispatch({
      type: MY_ORDER_REQUEST_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
// get all Orders --Admin
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });

    const { data } = await axios.get("/admin/orders");

    dispatch({
      type: ALL_ORDER_REQUEST_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get order details
export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/order/${id}`);

    dispatch({
      type: ORDER_DETAIL_REQUEST_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
