import React from "react";
import alertImg from "../../assets/img/contact-alert.png";

const NoContactAlert = () => {
  return (
    <div className="no-contact-alert">
      <img src={alertImg} alt="no contact found" />
    </div>
  );
};

export default NoContactAlert;
