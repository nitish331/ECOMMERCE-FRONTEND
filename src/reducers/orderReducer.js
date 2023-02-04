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
  DELETE_ORDER_REQUEST_RESET,
  DELETE_ORDER_REQUEST_SUCCESS,
  MY_ORDER_REQUEST,
  MY_ORDER_REQUEST_FAIL,
  MY_ORDER_REQUEST_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_REQUEST_FAIL,
  ORDER_DETAIL_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_FAIL,
  UPDATE_ORDER_REQUEST_RESET,
  UPDATE_ORDER_REQUEST_SUCCESS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_REQUEST_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loading: true,
      };
    case ALL_ORDER_REQUEST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ALL_ORDER_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ORDER_REQUEST_FAIL:
    case DELETE_ORDER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDER_REQUEST_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_ORDER_REQUEST_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDER_REQUEST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDER_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const orderDetailReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAIL_REQUEST_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAIL_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
