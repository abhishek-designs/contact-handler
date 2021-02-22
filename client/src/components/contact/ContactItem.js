import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import AlertContext from "../../context/alert/alertContext";

const ContactItem = ({ contact }) => {
  const { setCurrentContact, deleteContact } = useContext(ContactContext);
  const { setAlert } = useContext(AlertContext);

  const { _id, name, email, phone, type } = contact;
  // Function to show confirmation dialog before deleting contact
  const deleteTheContact = (e) => {
    deleteContact(_id);

    setAlert("Contact Deleted", "success", "check-circle");
  };

  // Function to edit a contact
  const setEditState = (e) => {
    setCurrentContact(contact);
  };

  return (
    <div className="contact-item bg-light">
      <div className="user-profile-pic mb-3">
        <i className="fa fa-user-circle fa-4x primary profile-pic" />
        <button className="edit-btn-contain" title="Edit Contact">
          <div className="edit-btn bg-yellow" onClick={setEditState}>
            <i className="fa fa-pen light" />
          </div>
        </button>
        <button
          className="delete-btn-contain"
          title="Delete Contact"
          onClick={deleteTheContact}
        >
          <div className="delete-btn bg-red">
            <i className="fa fa-trash light" />
          </div>
        </button>
      </div>

      <div className="contact-content">
        <div className="upper-content mb-1">
          <h3 className="head-1 light-dark username">{name}</h3>
          <span
            className={
              type === "personal" ? "green contact-type" : "yellow contact-type"
            }
            data-color="$green-color"
          >
            {type.split("")[0].toUpperCase() + type.slice(1)}
          </span>
        </div>
        <div className="bottom-content">
          <div className="email light-dark pb-0">
            <i className="fa fa-envelope primary pr-1" />
            {email}
          </div>
          <div className="phone light-dark">
            <i className="fa fa-phone primary pr-1" />
            {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
