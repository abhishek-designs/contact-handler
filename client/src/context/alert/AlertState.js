import React, { useReducer } from "react";
import { SHOW_ALERT, REMOVE_ALERT } from "../types";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";

const AlertState = (props) => {
  const initialState = {
    showAlert: false,
    alertMsg: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Function to set alert which also removes alert automatically
  const setAlert = (msg, msgClass, icon = "times", timeout = 1600) => {
    const alert = { msg, msgClass, icon };
    dispatch({
      type: SHOW_ALERT,
      payload: alert,
    });

    // Remove the error after timout milli sec
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  };

  // Function to remove alert manually
  const removeAlert = () => dispatch({ type: REMOVE_ALERT });

  return (
    <AlertContext.Provider
      value={{
        showAlert: state.showAlert,
        alertMsg: state.alertMsg,
        setAlert,
        removeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
