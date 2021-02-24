import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const { alertMsg, showAlert } = useContext(AlertContext);
  const { msg, msgClass, icon } = alertMsg;

  return (
    <div
      className={`alert alert-${msgClass} ${
        showAlert ? "alert-slide-in" : "alert-slide-out"
      }`}
    >
      <i className={`fa fa-${icon} fa-1x light`}></i>
      {msg}
    </div>
    // <div className={"alert alert-danger"}>
    //   <i className={"fa fa-times fa-1x light"}></i>
    //   Error Occured
    // </div>
  );
};

export default Alert;
