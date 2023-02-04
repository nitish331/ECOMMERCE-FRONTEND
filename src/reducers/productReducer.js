import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST_FAIL,
  DELETE_PRODUCT_REQUEST_RESET,
  DELETE_PRODUCT_REQUEST_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
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
  NEW_PRODUCT_REQUEST_RESET,
  NEW_PRODUCT_REQUEST_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_REQUEST_FAIL,
  NEW_REVIEW_REQUEST_RESET,
  NEW_REVIEW_REQUEST_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST_RESET,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_All_PRODUCTS:
    case GET_ADMIN_PRODUCTS:
      return {
        loading: true,
        products: [],
      };
    case GET_All_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        productsCount: action.payload.productCount,
        resultPerPage: action.payload.perPageResult,
        filteredProductCount: action.payload.filteredProductCount,
      };
    case GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_All_PRODUCTS_FAIL:
    case GET_ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS:
      return {
        loading: true,
        ...state,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// add review to a product
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_REQUEST_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_REQUEST_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
// delete any  product
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_REQUEST_FAIL:
    case UPDATE_PRODUCT_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_REQUEST_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_REQUEST_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// create new Porducts
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_REQUEST_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_REQUEST_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
