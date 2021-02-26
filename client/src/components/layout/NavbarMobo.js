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

  // Function to close the nav when user clicks outside
  const closeNav = (e) => {
    document.querySelector(".toggler").checked = false;
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
          <div className="menu-backdrop" onClick={closeNav}></div>
          <div className="menu-options">
            <div className="menu-options-contain">
              <div className="greeting bg-light">
                <h3 className="head-3">
                  Hello, {user && user.name.split(" ")[0].slice(0)}
                </h3>
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
                  <a className="red">
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
