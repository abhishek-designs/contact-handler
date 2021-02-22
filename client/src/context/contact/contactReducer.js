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

const ContactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        contactLoading: false,
        message: null,
      };
    case ADD_CONTACT:
      return {
        ...state,
        message: action.payload,
        contactAdded: true,
        // showAlert: true,
        // alertMsg: {
        //   msg: "Contact Added",
        //   msgClass: "success",
        //   icon: "check-circle",
        // },
      };
    // case REMOVE_ALERT:
    //   return {
    //     ...state,
    //     showAlert: false,
    //   };
    case SHOW_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: action.payload,
      };
    case CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: null,
      };
    case EDIT_CONTACT:
      return {
        ...state,
        message: action.payload,
        currentContact: null,
        // showAlert: true,
        // alertMsg: {
        //   msg: "Contact Edited",
        //   msgClass: "success",
        //   icon: "check-circle",
        // },
      };
    case DELETE_CONTACT:
      return {
        ...state,
        message: action.payload,
        // showAlert: true,
        // alertMsg: {
        //   msg: "Contact Deleted",
        //   msgClass: "success",
        //   icon: "check-circle",
        // },
      };
    case CONTACT_FAILED:
      return {
        ...state,
        contactError: action.payload,
        // showModal: true,
      };
    case REMOVE_CONTACT_ALERTS:
      return {
        ...state,
        contactError: null,
        message: null,
      };
    case OPEN_CONTACT_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case CLOSE_CONTACT_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case SEARCH_CONTACT:
      return {
        ...state,
        searchedContacts: state.contacts.filter((contact) =>
          contact.name.toLowerCase().includes(action.payload)
        ),
      };
    case REMOVE_SEARCHED_CONTACTS:
      return {
        ...state,
        searchedContacts: null,
      };
    case SET_LOADING:
      return {
        ...state,
        contactLoading: true,
      };
    default:
      return state;
  }
};

export default ContactReducer;
