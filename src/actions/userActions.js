import axios from "axios";
import { BACKEND_URL } from "../constants/backendUrl";
import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_FAIL,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_REQUEST_FAIL,
  LOAD_USER_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_USER_REQUEST_FAIL,
  LOGOUT_USER_REQUEST_SUCCESS,
  REGISTRATION_REQUEST,
  REGISTRATION_REQUEST_FAIL,
  REGISTRATION_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_FAIL,
  RESET_PASSWORD_REQUEST_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
} from "../constants/userConstants";

// loading the user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/me`);

    dispatch({ type: LOAD_USER_REQUEST_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
// get All user
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/admin/users`);

    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  user Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/admin/user/${id}`);

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    axios.get(`${BACKEND_URL}/logOut`);
    dispatch({ type: LOGOUT_USER_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logging in the user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// reset user password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${BACKEND_URL}/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// forgot user password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/password/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// register the user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTRATION_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/register`,
      userData,
      config
    );

    dispatch({ type: REGISTRATION_REQUEST_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTRATION_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update user profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${BACKEND_URL}/me/update`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update user profile
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${BACKEND_URL}/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update user
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${BACKEND_URL}/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`${BACKEND_URL}/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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
