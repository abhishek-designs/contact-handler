import { useReducer } from "react";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import axios from "axios";
import {
  GET_CONTACT,
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  SHOW_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  OPEN_CONTACT_MODAL,
  CLOSE_CONTACT_MODAL,
  SEARCH_CONTACT,
  REMOVE_SEARCHED_CONTACTS,
  CONTACT_FAILED,
  REMOVE_CONTACT_ALERTS,
  SET_LOADING,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    searchedContacts: null,
    currentContact: null,
    showModal: false,
    contactError: null,
    contactLoading: false,
    message: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Functions to manipulate the state

  // Function to fetch the contact of the user when page loads
  const getContact = async () => {
    // Set the loading initially till the contacts get fetched
    dispatch({ type: SET_LOADING });

    // Now get the contacts async from the server api we made
    try {
      const res = await axios.get("/api/contact");

      // Dispatch the contact to the reducer
      dispatch({
        type: GET_CONTACT,
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
      dispatch({
        type: CONTACT_FAILED,
        payload: serverErr,
      });
    }
  };

  // Functions to add a contact
  const addContact = async (contact) => {
    // Add a unique id for the contact
    try {
      const res = await axios.post("/api/contact", contact, {
        header: {
          "content-type": "application/json",
        },
      });

      console.log(res.data.newContact);
      // Dispatch the added contact to the reducer
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });

      dispatch({ type: CLOSE_CONTACT_MODAL });
      // Call the getContact() function to get the contacts after successful addition
      // getContact();
    } catch (err) {
      console.error(err.response.data);
      let serverErr;
      if (err.response.data.msg) {
        serverErr = err.response.data.msg;
      } else if (err.response.data.errors) {
        serverErr = err.response.data.errors[0].msg;
      } else {
        serverErr = err.response.data;
      }
      // Dispatch the error to the reducer
      dispatch({
        type: CONTACT_FAILED,
        payload: serverErr,
      });
    }
  };

  // Function to show the current contact in the form on edit
  const setCurrentContact = (contact) => {
    dispatch({ type: OPEN_CONTACT_MODAL });
    dispatch({
      type: SHOW_CURRENT_CONTACT,
      payload: contact,
    });
  };

  // Function to remove the current edit contact state
  const removeCurrentContact = () => dispatch({ type: CLEAR_CURRENT_CONTACT });

  // Function to edit a contact
  const editContact = async (contactId, contact) => {
    try {
      const res = await axios.put(`/api/contact/${contactId}`, contact, {
        headers: {
          "content-type": "application/json",
        },
      });

      // Dispatch the response to the reducer
      dispatch({
        type: EDIT_CONTACT,
        payload: res.data.msg,
      });

      // Close the modal
      dispatch({ type: CLOSE_CONTACT_MODAL });
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

      // Dispatch the error response to the reducer
      dispatch({
        type: CONTACT_FAILED,
        payload: serverErr,
      });
    }

    // Again call the getContact() function after successful updation
    getContact();

    // setTimeout(() => dispatch({ type: REMOVE_ALERT }), 1600);
  };

  // Function to delete a contact
  const deleteContact = async (contactId) => {
    // Delete the contact from the database through http request to the server
    try {
      const res = await axios.delete(`/api/contact/${contactId}`);

      // Dispatch the server response to the reducer
      dispatch({
        type: DELETE_CONTACT,
        payload: res.data.msg,
      });

      // Refresh the contacts again by calling getContact()
      getContact();
    } catch (err) {
      let serverErr;
      if (err.response.data.msg) {
        serverErr = err.response.data.msg;
      } else {
        serverErr = err.response.data;
      }

      // Dispatch the error from the server to the reducer
      dispatch({
        type: CONTACT_FAILED,
        payload: serverErr,
      });
    }
    // dispatch({
    //   type: DELETE_CONTACT,
    //   payload: contactId,
    // });

    // setTimeout(() => dispatch({ type: REMOVE_ALERT }), 1600);
  };

  // Function to search contacts
  const searchContact = (searchValue) => {
    dispatch({
      type: SEARCH_CONTACT,
      payload: searchValue,
    });
  };

  // Function to remove the previous contact error
  const vanishContactAlerts = () => dispatch({ type: REMOVE_CONTACT_ALERTS });

  // To remove all the searched contacts
  const removeSearch = () => dispatch({ type: REMOVE_SEARCHED_CONTACTS });

  // Functions to open and close the contact modal
  const openModal = () => dispatch({ type: OPEN_CONTACT_MODAL });
  const closeModal = () => dispatch({ type: CLOSE_CONTACT_MODAL });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        showModal: state.showModal,
        searchedContacts: state.searchedContacts,
        contactLoading: state.contactLoading,
        contactError: state.contactError,
        message: state.message,
        getContact,
        addContact,
        setCurrentContact,
        removeCurrentContact,
        editContact,
        deleteContact,
        searchContact,
        vanishContactAlerts,
        removeSearch,
        openModal,
        closeModal,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
