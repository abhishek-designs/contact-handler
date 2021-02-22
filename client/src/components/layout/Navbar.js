import React, { useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { user, userAuthenticated, logoutUser } = authContext;

  // Function to logout the user when its get clicked
  const onLogout = (e) => {
    logoutUser();
  };

  useEffect(() => {
    if (!userAuthenticated) {
      props.history && props.history.push("/login");
    }
  }, [userAuthenticated]);

  // Links to be shown when there is an authorized user
  const userLinks = (
    <>
      <li>
        <Link to="/" className="light">
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className="light pl-2">
          About
        </Link>
      </li>
    </>
  );

  // Links to be shown when there is an unauthorized user
  const guestLinks = (
    <>
      <li>
        <Link to="/login" className="light">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="light pl-2">
          Register
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-primary">
      <div className="container container-med">
        <div className="logo">
          <Link
            to="/"
            className="light"
            style={{ fontFamily: "Sen,sans-serif", fontSize: "1.5rem" }}
          >
            Contact<span style={{ color: "#A1DDFF" }}>Handler</span>
          </Link>
        </div>
        <ul className="links">{userAuthenticated ? userLinks : guestLinks}</ul>
        {userAuthenticated && (
          <div className="profile-contain">
            <div className="user-profile">
              <p className="lead-1 light username pr-1">
                {user && user.name} <i className="fa fa-chevron-down pl-0" />
              </p>
              <div className="profile-pic">
                <i className="fa fa-user-circle fa-3x light" />
              </div>
            </div>
            {/* Checkbox btn to toggle the user menu */}
            <input type="checkbox" className="toggle-btn" />
            {/* User menu modal */}
            <div className="user-account-menu bg-light">
              <h3 className="head-2 py-3">
                Hello, {user && user.name.split(" ")[0].slice(0)}
              </h3>
              <div className="menu-links-contain">
                <ul className="menu-links">
                  <li className="menu-link">
                    <a href="#!">
                      <i className="fa fa-user-cog" />
                      Account
                    </a>
                  </li>
                  <li className="menu-link">
                    <a href="#!">
                      <i className="fas fa-life-ring" />
                      Help
                    </a>
                  </li>
                  <li className="menu-link" onClick={onLogout}>
                    <a className="red">
                      <i className="fa fa-sign-out" />
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
