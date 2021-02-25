import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const NavbarMobo = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logoutUser, userAuthenticated } = authContext;

  const [showNav, setNav] = useState(false);

  // Function to toggle the mobo nav
  const toggleNav = (e) => {
    setNav((showNav) => !showNav);
  };

  useEffect(() => {
    if (!userAuthenticated) {
      props.history.push("/login");
    }
    // Disable scrolling when our nav gets extended
    if (showNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNav, props]);

  // Function to logout the user from the app
  const onLogout = (e) => {
    logoutUser();
  };

  return (
    <nav className="navbar-mobo bg-primary light">
      <div className="container container-med">
        <div className="menu">
          <input type="checkbox" className="toggler" onClick={toggleNav} />
          <div className="hamburger-menu">
            <div></div>
          </div>
          <div
            className={`menu-backdrop ${
              showNav ? "menu-backdrop-active" : "menu-backdrop-deactive"
            }`}
          ></div>
          <div className="menu-options">
            <div
              className={`menu-options-contain ${
                showNav
                  ? "menu-options-contain-active"
                  : "menu-options-contain-deactive"
              }`}
            >
              <div className="greeting bg-light">
                <h3 className="head-3">Hello, {user && user.name}</h3>
              </div>
              <ul className="options">
                <li className="option">
                  <a href="#!">
                    <i className="fa fa-user-cog" />
                    Account
                  </a>
                </li>
                <li className="option">
                  <a href="#!">
                    <i className="fas fa-life-ring" />
                    Help
                  </a>
                </li>
                <li className="option" onClick={onLogout}>
                  <a href="#!" className="red">
                    <i className="fa fa-sign-out" />
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="logo">
          <a
            href="#"
            className="light"
            style={{ fontFamily: "Sen,sans-serif" }}
          >
            Contact<span style={{ color: "#A1DDFF" }}>Handler</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobo;
