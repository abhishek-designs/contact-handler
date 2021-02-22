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

const AlertReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("auth-token", action.payload);
      localStorage.setItem("authenticated", "true");
      return {
        ...state,
        token: action.payload,
        loading: false,
        userAuthenticated: true,
        error: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_FAILED:
    case LOGOUT:
      localStorage.removeItem("auth-token");
      localStorage.removeItem("authenticated");
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        userAuthenticated: false,
        error: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        userAuthenticated: true,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default AlertReducer;
