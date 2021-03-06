import React, { useState, useEffect, useContext, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";
import AlertContext from "../../context/alert/alertContext";

const ContactModal = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const {
    addContact,
    showModal,
    closeModal,
    editContact,
    currentContact,
    removeCurrentContact,
    contactError,
    vanishContactAlerts,
  } = contactContext;

  const { setAlert } = alertContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const contactModal = useRef();

  const onClick = () => {
    contactModal.current.classList.toggle("fixed-pos");
    closeModal();
  };

  const onChange = (e) => {
    setContact({
      ...contact, // State is immutable we have to update the state not to overwrite it
      [e.target.name]: e.target.value,
    });
  };

  // Changing the position of the contact modal to absolute when focused on the input field
  const onFocused = (e) => {
    contactModal.current.classList.toggle("sticky-pos");
  };

  const addTheContact = (e) => {
    e.preventDefault();
    // Firstly validating the input fields
    const { name, email, phone } = contact;
    if (name === "" || email === "" || phone === "") {
      // Fields are empty, show an alert
      setAlert("Please fill out the fields", "danger");
    } else {
      // The inputs are valid give the contact details to the server
      addContact(contact);
      // Clear the fields after successful addition
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  };

  const editTheContact = (e) => {
    e.preventDefault();
    editContact(currentContact._id, contact);
  };

  const cancelEditState = (e) => {
    e.preventDefault();
    removeCurrentContact();
  };

  // Render the editable state once
  useEffect(() => {
    // Setting up the error alerts
    if (contactError) {
      setAlert(contactError, "danger");
      vanishContactAlerts();
    }

    // Setting the current contact to the form if it is there
    if (currentContact) {
      const { name, email, phone, type } = currentContact;
      setContact({
        name,
        email,
        phone,
        type,
      });
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [currentContact, contactError]);

  return (
    <>
      <section
        ref={contactModal}
        className={`contact-form-modal fixed-pos ${
          showModal ? "open-state" : "close-state"
        } bg-light py-2`}
      >
        <div className="container container-med">
          <h2 className="head-2 primary pb-5">
            {currentContact !== null ? "Edit Contact" : "Add Contact"}
          </h2>
          <form className="form-contain" onSubmit={addTheContact}>
            <div className="form-fields">
              {/* Name */}
              <div className="form-grp">
                <input
                  type="text"
                  name="name"
                  className="field name-field"
                  onChange={onChange}
                  onFocus={onFocused}
                  value={contact.name}
                  required
                  autoComplete="off"
                />
                <label className="label-contain">
                  <span className="label-name">Name</span>
                </label>
              </div>
              {/* Email */}
              <div className="form-grp">
                <input
                  type="text"
                  className="field email-field"
                  name="email"
                  onChange={onChange}
                  onFocus={onFocused}
                  value={contact.email}
                  required
                  autoComplete="off"
                />
                <label className="label-contain">
                  <span className="label-name">Email</span>
                </label>
              </div>
              {/* Phone no. */}
              <div className="form-grp">
                <input
                  type="number"
                  className="field phone-field"
                  name="phone"
                  onChange={onChange}
                  onFocus={onFocused}
                  value={contact.phone}
                  required
                  autoComplete="off"
                />
                <label className="label-contain">
                  <span className="label-name">Phone</span>
                </label>
              </div>
              {/* Type Radio btns */}
              <div className="form-grp">
                <label htmlFor="type" className="primary">
                  Contact Type
                </label>
                <div className="type-options">
                  <div className="personal-tab light-dark">
                    <input
                      type="radio"
                      name="type"
                      value="personal"
                      className="mr-0"
                      onChange={onChange}
                      checked={contact.type === "personal"}
                    />
                    Personal
                  </div>
                  <div className="professional-tab ml-2 light-dark">
                    <input
                      type="radio"
                      name="type"
                      onChange={onChange}
                      checked={contact.type === "professional"}
                      value="professional"
                      className="mr-0"
                    />
                    Professional
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-tab mt-1">
              {currentContact !== null ? (
                <>
                  <button
                    className="btn btn-primary edit-btn"
                    onClick={editTheContact}
                  >
                    <i className="fa fa-pen pr-0" />
                    Edit Contact
                  </button>
                  <button
                    className="btn btn-danger cancel-btn ml-1"
                    onClick={cancelEditState}
                  >
                    <i className="fa fa-times pr-0" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary add-btn"
                  onClick={addTheContact}
                >
                  <i className="fa fa-plus-square pr-0" />
                  Add Contact
                </button>
              )}
            </div>
          </form>
          {/* Close btn */}
          <button className="close-btn" onClick={onClick}>
            <i className="fa fa-times fa-2x" />
          </button>
        </div>
      </section>
    </>
  );
};

export default ContactModal;
