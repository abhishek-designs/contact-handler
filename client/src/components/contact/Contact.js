import React, { useContext } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import NoContactAlert from "../alerts/NoContactAlert";

const Contact = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, searchedContacts } = contactContext;

  if (!contacts) {
    // If there are some contacts stored
    return <NoContactAlert />;
  } else {
    // Show the contacts
    return (
      <section id="contact-pane" className="py-2">
        <h2 className="head-1 primary pb-2 contact-head">
          {searchedContacts
            ? `${searchedContacts.length} Contact(s) Found`
            : `${contacts.length} Saved Contacts`}{" "}
          <i className="fa fa-chevron-down" />
        </h2>

        <div className="contact-items">
          {searchedContacts
            ? searchedContacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </div>
      </section>
    );
  }
};

export default Contact;
