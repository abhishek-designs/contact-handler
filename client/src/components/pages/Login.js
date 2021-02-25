import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CircularGrid from "../layout/CircularGrid";
import HeaderDesign from "../../assets/img/header-design.png";
import Alert from "../alerts/Alert";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  // Carry out some global states
  const alertContext = useContext(AlertContext);
  const { showAlert, setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { loginUser, error, userAuthenticated, vanishErrors } = authContext;

  // For user details
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // For toggling hide/show password
  const [showPwd, setPwd] = useState(false);

  // Show the alerts from the server when our component gets mounted
  useEffect(() => {
    // Redirect the user to the dashboard if they get successfully logged in
    if (userAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error, "danger", "user-times");
      vanishErrors(); // Vanish the previous server errors
    }
  }, [userAuthenticated, error]);

  // Function to input the details of user credentials in the state
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Function to toggle hide/show password
  const revealPwd = (e) => {
    e.preventDefault();
    setPwd((showPwd) => !showPwd);
  };

  // Function to submit the user to the server
  const submitUser = (e) => {
    e.preventDefault();
    // Performing some validations first
    if (user.email === "" || user.password === "") {
      setAlert("Please fill all the fields", "danger", "user-times");
    } else {
      // Let the user login
      loginUser(user);
    }
  };

  return (
    <div id="login" className="bg-light">
      {showAlert && <Alert />}
      <div className="container container-med">
        {/* Main logo header */}
        <header className="logo-header py-1">
          <div className="logo primary">
            <span className="light">Contact</span>Handler
          </div>
        </header>
        {/* Aside content */}
        <aside className="login-content">
          <h1 className="head-4 light">Welcome Back</h1>
          <div className="sub-content">
            <h2 className="head-3 pb-1">
              Sign in to account <i className="fa fa-chevron-right" />
            </h2>
            <p className="lead-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis iusto iste fuga?
            </p>
          </div>
        </aside>
        {/* Register form */}
        <form className="login-form bg-light">
          {/* Email */}
          <div className="form-grp">
            <input
              type="text"
              name="email"
              className="email"
              autoComplete="off"
              required
              onChange={onChange}
              value={user.email}
            />
            <div className="label-contain">
              <span className="label-name">Email</span>
            </div>
          </div>
          {/* Password */}
          <div className="form-grp">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              className="password"
              autoComplete="off"
              required
              onChange={onChange}
              value={user.password}
            />
            <div className="label-contain">
              <span className="label-name">Password</span>
            </div>
            {/* Show pwd btn */}
            <button className="show-pwd-btn" onClick={revealPwd}>
              {showPwd ? (
                <i className="fa fa-eye-slash" />
              ) : (
                <i className="fa fa-eye" />
              )}
            </button>
          </div>
          {/* Submit btn */}
          <button
            type="submit"
            className="btn btn-primary submit-btn mt-2"
            onClick={submitUser}
          >
            <i className="fa fa-sign-in light pr-0" /> Sign in
          </button>
          <p className="lead-1 pt-0">
            Don't have an account ?{" "}
            <Link to="/register" className="primary">
              Sign up
            </Link>
          </p>
        </form>
        <CircularGrid circle="circle" />
      </div>
      {/* Header design */}
      <div className="header-design">
        <img src={HeaderDesign} alt="register form contact handler" />
      </div>
      {/* Circular grid designs */}
      <CircularGrid circle="circle" />
    </div>
  );
};

export default Login;
