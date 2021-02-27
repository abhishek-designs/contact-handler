import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CircularGrid from "../layout/CircularGrid";
import HeaderDesign from "../../assets/img/header-design.png";
import Alert from "../alerts/Alert";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { registerUser, error, userAuthenticated, vanishErrors } = authContext;
  const { setAlert, showAlert } = alertContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    // Authenicate the user and redirect the user to the dashboard
    if (userAuthenticated) {
      props.history.push("/");
    }
    // Show the alert when our component gets fully mounted
    if (error) {
      setAlert(error, "danger", "user-times");
      vanishErrors(); // Vanish the previous server errors
    }
  }, [userAuthenticated, error]);

  const [showPwd, setPwd] = useState(false);
  const [showCpwd, setCpwd] = useState(false);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitUser = (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.cpassword === ""
    ) {
      // Values not given in the field
      setAlert("Please fill out the fields", "danger");
    } else if (user.password !== user.cpassword) {
      // Both are not same, show error
      setAlert("Password did not match", "danger");
    } else {
      // Password matched
      // Register user
      registerUser(user);
    }
  };

  // Toggle password
  const revealPwd = (e) => {
    e.preventDefault();
    setPwd((showPwd) => !showPwd); // Toggle between hide and show password
  };

  // Toggle confirm password
  const revealCpwd = (e) => {
    e.preventDefault();
    setCpwd((showCpwd) => !showCpwd); // Toggle between hide and show password
  };

  return (
    <div id="register" className="bg-light">
      {/* Show the alert */}
      <Alert />
      <div className="container container-med">
        {/* Main logo header */}
        <header className="logo-header py-1">
          <div className="logo primary">
            <span className="light">Contact</span>Handler
          </div>
        </header>
        {/* Aside content */}
        <aside className="register-content">
          <h1 className="head-4 light">Welcome Buddy</h1>
          <div className="sub-content">
            <h2 className="head-3 pb-1">
              Create an account <i className="fa fa-chevron-right" />
            </h2>
            <p className="lead-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis iusto iste fuga?
            </p>
          </div>
        </aside>
        {/* Register form */}
        <form className="register-form bg-light">
          {/* Name */}
          <div className="form-grp">
            <input
              type="text"
              name="name"
              className="name"
              autoComplete="off"
              required
              onChange={onChange}
              value={user.name}
            />
            <div className="label-contain">
              <span className="label-name">Name</span>
            </div>
          </div>
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
              <i className={`fa fa-${showPwd ? "eye-slash" : "eye"}`} />
            </button>
          </div>
          {/* Confirm password */}
          <div className="form-grp">
            <input
              type={showCpwd ? "text" : "password"}
              name="cpassword"
              className="cpassword"
              autoComplete="off"
              required
              onChange={onChange}
              value={user.cpassword}
            />
            <div className="label-contain">
              <span className="label-name">Confirm Password</span>
            </div>
            {/* Show pwd btn */}
            <button className="show-pwd-btn" onClick={revealCpwd}>
              <i className={`fa fa-${showCpwd ? "eye-slash" : "eye"}`} />
            </button>
          </div>
          {/* Submit btn */}
          <button
            type="submit"
            className="btn btn-primary submit-btn mt-2"
            onClick={submitUser}
          >
            <i className="fa fa-user-plus light pr-0" /> Create Account
          </button>
          <p className="lead-1 pt-0">
            Already have an account ?{" "}
            <Link to="/login" className="primary">
              Sign in
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

export default Register;
