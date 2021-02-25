import { SHOW_ALERT, REMOVE_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertMsg: action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        showAlert: false,
        alertMsg: {},
      };
    default:
      return state;
  }
};

export default AlertReducer;
