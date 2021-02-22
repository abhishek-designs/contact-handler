import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading } = useContext(AuthContext);
  const authenticated = localStorage.getItem("authenticated");
  return (
    // Checking the user's authentication state stored in the ls to prevent the state to be vanished as we refresh the page
    <Route
      {...rest}
      render={(props) =>
        authenticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
