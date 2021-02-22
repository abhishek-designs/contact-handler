import axios from "axios";

const validateToken = (token) => {
  // Check wether there is a token or not
  if (token) {
    // Token is present,make a default header variable for our request
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Token is not there,delete the default header variable
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default validateToken;
