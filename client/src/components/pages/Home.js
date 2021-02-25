import React, { useContext, useEffect } from "react";
import Navbar from "../layout/Navbar";
import NavbarMobo from "../layout/NavbarMobo";
import SearchBar from "../contact/SearchBar";
import CircularGrid from "../layout/CircularGrid";
import Contact from "../contact/Contact";
import Spinner from "../layout/Spinner";
import ContactModal from "../contact/ContactModal";
import TransparentBG from "../layout/TransparentBG";
import AlertContext from "../../context/alert/alertContext";
import ContactContext from "../../context/contact/contactContext";
import AuthContext from "../../context/auth/authContext";
import Alert from "../alerts/Alert";
import NoContactAlert from "../alerts/NoContactAlert";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Transition, animated } from "react-spring/renderprops";

const Home = (props) => {
  const alertContext = useContext(AlertContext);
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);

  const { showAlert, setAlert } = alertContext;
  const { userAuthenticated, loadUser, loading } = authContext;
  const { contactLoading, contactError } = contactContext;

  const {
    showModal,
    contacts,
    currentContact,
    getContact,
    message,
    openModal,
  } = contactContext;

  const openTheModal = (e) => {
    openModal();
  };

  useEffect(() => {
    // Load the logged in user's data
    loadUser();

    // Also load the contacts of the user from the server
    getContact();

    if (message) {
      setAlert(message, "success", "check-circle");
    }
  }, [message]);

  if (loading) {
    // Load the spinner
    return <Spinner />;
  } else {
    // Load the dashboard
    return (
      <>
        <Alert />
        <Navbar history={props.history} />
        <NavbarMobo history={props.history} />
        {/* <Transition
          native
          items={showAlert}
          from={{ transform: "translateY(-100%)" }}
          enter={{ transform: "translateY(0)" }}
          leave={{ transform: "translateY(-100%)" }}
        >
          {(showAlert) =>
            showAlert &&
            ((props) => (
              <animated.div style={props}>
                <Alert />
              </animated.div>
            ))
          }
        </Transition> */}
        {contactLoading ? (
          <Spinner />
        ) : (
          <section id="home">
            <CircularGrid />
            <Alert />
            {userAuthenticated && <SearchBar />}
            <div className="container container-med">
              {userAuthenticated ? (
                contacts.length > 0 ? (
                  <Contact />
                ) : (
                  <NoContactAlert />
                )
              ) : (
                "First login to our app"
              )}
              {userAuthenticated && (
                <button
                  className="add-btn bg-primary light"
                  title={currentContact ? "Edit Contact" : "Add Contact"}
                  onClick={openTheModal}
                >
                  <i
                    className={`fa fa-${currentContact ? "pen" : "plus"} fa-2x`}
                  ></i>
                </button>
              )}
            </div>
          </section>
        )}
        {/* <section id="home">
          <CircularGrid />
          {showAlert && <Alert />}
          {contacts && userAuthenticated && <SearchBar />}
          <div className="container container-med">
            {userAuthenticated ? (
              contacts.length === 0 ? (
                <NoContactAlert />
              ) : (
                <Contact />
              )
            ) : (
              "First login to our app"
            )}
            {userAuthenticated && (
              <button
                className="add-btn bg-primary light"
                title={currentContact ? "Edit Contact" : "Add Contact"}
                onClick={openModal}
              >
                <i
                  className={`fa fa-${currentContact ? "pen" : "plus"} fa-2x`}
                ></i>
              </button>
            )}
          </div>
        </section> */}
        {showModal && <TransparentBG />}
        <ContactModal />
      </>
    );
  }
};

export default Home;
