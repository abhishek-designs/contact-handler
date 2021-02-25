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

    // if(contactError){
    //   setAlert(contactError)
    // }
  }, [message]);

  if (loading) {
    // Load the spinner
    return <Spinner />;
  } else {
    // Load the dashboard
    return (
      <>
        <Navbar history={props.history} />
        <NavbarMobo history={props.history} />
        <Alert />
        {contactLoading ? (
          <Spinner />
        ) : (
          <section id="home">
            <CircularGrid />
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
        {showModal && <TransparentBG />}
        <ContactModal />
      </>
    );
  }
};

export default Home;
