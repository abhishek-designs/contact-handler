import React, { useReducer } from "react";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  LOAD_USER_FAILED,
  LOGOUT,
  SET_LOADING,
  REMOVE_ERROR,
} from "../types";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import validateToken from "../../utils/validateToken";

const AuthState = (props) => {
  const initialState = {
    userAuthenticated: null,
    user: null,
    error: null,
    token: localStorage.getItem("auth-token"),
    loading: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Function to load the user who gets registered to the app
  const loadUser = async () => {
    // Set the auth-token to the global header so tha we can get rid of puttin auth-token in every req headers
    // Through our validateToken() util function
    validateToken(localStorage.getItem("auth-token"));

    try {
      const res = await axios.get("/api/auth");

      // Dispatch the data with type LOAD_USER
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (err) {
      console.error(err.response);
      let serverErr;
      if (err.response.data.msg) {
        serverErr = err.response.data.msg;
      } else if (err.response.data.errors) {
        serverErr = err.response.data.errors[0].msg;
      } else {
        serverErr = err.response.data;
      }
      // Dispatch the data with type LOAD_USER_FAILED
      dispatch({
        type: LOAD_USER_FAILED,
        payload: serverErr,
      });
    }
  };

  // Function to register a user
  const registerUser = async ({ name, email, password }) => {
    // Show the loading at first
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.post("/api/user", {
        name,
        email,
        password,
      });

      // Dispatch the data with the type REGISTER_SUCCESS
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });

      // Now load the user also after successful registration
      loadUser();
    } catch (err) {
      let serverErr;

      if (err.response.data.msg) {
        serverErr = err.response.data.msg;
      } else if (err.response.data.errors) {
        serverErr = err.response.data.errors[0].msg;
      } else {
        serverErr = err.response.data;
      }

      // Dispatch the data with the type REGISTER_FAIL
      dispatch({
        type: REGISTER_FAIL,
        payload: serverErr,
      });
    }
  };

  // Function to login a user
  const loginUser = async (user) => {
    // Show the loading at first
    dispatch({ type: SET_LOADING });
    // Sending user credentials to the server through axios
    try {
      const res = await axios.post("/api/auth", user, {
        headers: {
          "content-type": "application/json",
        },
      });

      // Dispatch the fetched user's token with the type LOGIN_SUCCESS
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });

      // Load the user's details if the user get successfully logged in
      loadUser();
    } catch (err) {
      let serverErr;
      if (err.response.data.msg) {
        serverErr = err.response.data.msg;
      } else if (err.response.data.errors) {
        serverErr = err.response.data.errors[0].msg;
      } else {
        serverErr = err.response.data;
      }

      // Dispatch the error data with the type LOGIN_FAIL
      dispatch({
        type: LOGIN_FAIL,
        payload: serverErr,
      });
    }
  };

  // Function to make the user logout from the app
  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  // Function to remove server errors
  const vanishErrors = () => {
    dispatch({ type: REMOVE_ERROR });
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated: state.userAuthenticated,
        user: state.user,
        error: state.error,
        loading: state.loading,
        registerUser,
        loginUser,
        logoutUser,
        loadUser,
        vanishErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
