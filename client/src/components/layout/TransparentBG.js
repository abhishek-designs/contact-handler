import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const TransparentBG = () => {
  const { closeModal } = useContext(ContactContext);

  const closeTheModal = () => {
    closeModal();
  };

  return (
    <div
      className="transparent-bg"
      style={{
        position: "fixed",
        zIndex: 4,
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
      onClick={closeTheModal}
    ></div>
  );
};

export default TransparentBG;
